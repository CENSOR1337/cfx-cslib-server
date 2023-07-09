import { Player } from "./objects/Player";
import { randomUUID } from "./uuid";
import { Event } from "./event";
import { CFXEventData } from "@fivemjs/shared";

function triggerClientCallback<T>(eventName: string, src: number | string, ...args: any[]): Promise<T> {
	const cbId = randomUUID();
	const cbEventName = `cslib:clcb:${cbId}`;
	const promise = new Promise<T>((resolve, reject) => {
		Event.onceClient(cbEventName, (player: Player, data: any) => {
			resolve(data as T);
		});
	});
	Event.emitClient(eventName, src, cbId, ...args);
	return promise;
}

function registerServerCallback(eventName: string, handler: (player: Player, ...args: any[]) => void) {
	return Event.onClient(eventName, (player: Player, cbId: string, ...args: any[]) => {
		const cbEventName = `cslib:svcb:${cbId}`;
		player.emit(cbEventName, handler(player, ...args));
	});
}

export class Callback {
	public static emit = triggerClientCallback;
	public static register = registerServerCallback;
}
