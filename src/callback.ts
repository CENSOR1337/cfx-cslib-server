import { Player } from "./objects/Player";
import { randomUUID } from "./uuid";
import { Event } from "./event";
import { CFXEventData } from "@fivemjs/shared";

function triggerClientCallback<T>(eventName: string, player: Player, ...args: any[]): Promise<T> {
	const cbId = randomUUID();
	const promise = new Promise<T>((resolve, reject) => {
		Event.onceClient(cbId, (player: Player, data: any) => {
			resolve(data as T);
		});
	});
    player.emit(`cslib:clcb:${eventName}`, cbId, ...args);
	return promise;
}

function registerServerCallback(eventName: string, handler: (player: Player, ...args: any[]) => void) {
	return Event.onClient(`cslib:svcb:${eventName}`, (player: Player, cbId: string, ...args: any[]) => {
		player.emit(cbId, handler(player, ...args));
	});
}

export class Callback {
	public static emit = triggerClientCallback;
	public static register = registerServerCallback;
}
