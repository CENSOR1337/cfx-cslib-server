import { Player } from "./objects/Player";
import { CFXEventData, Cfx } from "@fivemjs/shared";
import { Event as EventShared } from "@fivemjs/shared";
import { listenerType } from "@fivemjs/shared";

export type clientListener = (player: Player, ...args: any[]) => void;

export class Event extends EventShared {
	protected static getObjectClass(obj: any): any {
		const objType = obj.type;
		if (!objType) return obj;

		switch (objType) {
			case Player.type: {
				return Player.fromSource(obj.source);
			}
		}

		return super.getObjectClass(obj);
	}

	public static emitClient(eventName: string, target: number | string | Player, ...args: any[]): void {
		if (target instanceof Player) {
			target = target.src;
		}
		Cfx.triggerClientEvent(eventName, target, ...args);
	}

	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Event.emitClient(eventName, -1, ...args);
	}

	public static onClient(eventName: string, listener: clientListener): CFXEventData {
		const handler = (...args: any[]) => {
			const src = source;
			const player = Player.fromSource(src);
			listener(player, ...args);
		};
		Cfx.addNetEventListener(eventName, handler);
		const eventData = { eventName, listener: handler };
		return eventData;
	}

	public static onceClient(eventName: string, listener: clientListener): CFXEventData {
		const eventData = Event.onClient(eventName, (player: Player, ...args: any[]) => {
			listener(player, ...args);
			Event.off(eventData);
		});
		return eventData;
	}

	public static on(eventName: string, listener: listenerType): CFXEventData {
		const handler = (...args: any[]) => {
			listener(...Event.getClassFromArguments(...args));
		};
		return super.on(eventName, handler);
	}

	public static once(eventName: string, listener: listenerType): CFXEventData {
		const handler = (...args: any[]) => {
			listener(...Event.getClassFromArguments(...args));
		};
        return super.once(eventName, handler);
	}
}

export const on = Event.on;
export const once = Event.once;
export const emitClient = Event.emitClient;
export const emitAllClients = Event.emitAllClients;
export const onClient = Event.onClient;
export const onceClient = Event.onceClient;
