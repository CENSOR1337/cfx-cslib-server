import { Player } from "./Player";
import { CFXEventData, Citizen } from "@fivemjs/shared";
import { Event as EventShared } from "@fivemjs/shared";
import { listenerType } from "@fivemjs/shared";

export type clientListener = (player: Player, ...args: any[]) => void;

class ServerEvent extends EventShared {
	public static onPlayerDropped(listener: (player: Player, reason: string) => void): CFXEventData {
		return Events.on("playerDropped", (reason: string) => {
			const player = Player.fromSource(source);
			listener(player, reason);
		});
	}
}
export class Events extends EventShared {
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
		Citizen.triggerClientEvent(eventName, target, ...args);
	}

	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Events.emitClient(eventName, -1, ...args);
	}

	public static onClient(eventName: string, listener: clientListener): CFXEventData {
		const handler = (...args: any[]) => {
			const src = source;
			const player = Player.fromSource(src);
			listener(player, ...args);
		};
		Citizen.addNetEventListener(eventName, handler);
		const eventData = { eventName, listener: handler };
		return eventData;
	}

	public static onceClient(eventName: string, listener: clientListener): CFXEventData {
		const eventData = Events.onClient(eventName, (player: Player, ...args: any[]) => {
			listener(player, ...args);
			Events.off(eventData);
		});
		return eventData;
	}

	public static on(eventName: string, listener: listenerType): CFXEventData {
		const handler = (...args: any[]) => {
			listener(...Events.getClassFromArguments(...args));
		};
		return super.on(eventName, handler);
	}

	public static once(eventName: string, listener: listenerType): CFXEventData {
		const handler = (...args: any[]) => {
			listener(...Events.getClassFromArguments(...args));
		};
		return super.once(eventName, handler);
	}

	public static ServerEvent = ServerEvent;
}

export const on = Events.on;
export const once = Events.once;
export const emitClient = Events.emitClient;
export const emitAllClients = Events.emitAllClients;
export const onClient = Events.onClient;
export const onceClient = Events.onceClient;
