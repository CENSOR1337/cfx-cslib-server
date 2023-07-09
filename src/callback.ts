import { Player } from "./objects/Player";
import { randomUUID } from "./uuid";
import { Event } from "./event";
import { CFXEventData } from "@fivemjs/shared";

function triggerClientCallback(eventName: string, src: number | string, ...args: any[]): Promise<any> {
	const cbId = randomUUID();
	const cbEventName = `cslib:clcb:${cbId}`;
	const promise = new Promise<any>((resolve, reject) => {
		Event.onceClient(cbEventName, (...cbArgs: any[]) => {
			resolve(cbArgs);
		});
	});
	Event.emitClient(eventName, cbId, src, ...args);
	return promise;
}

function registerServerCallback(eventName: string, handler: (player: Player, ...args: any[]) => void) {
	const cbEventName = `cslib:svcb:${eventName}`;
	return Event.onClient(cbEventName, (player: Player, cbId: string, ...args: any[]) => {
		const src = source;
		Event.emitClient(`${cbEventName}${cbId}`, src, handler(player, ...args));
	});
}

export class Callback {
	public static trigger(eventName: string, src: number | string, ...args: any[]): Promise<any[]> {
		return triggerClientCallback(eventName, src, ...args);
	}

	public static register(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return registerServerCallback(eventName, handler);
	}
}
