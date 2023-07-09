import { Player } from "./objects/Player";
import { CFXEventData, Cfx } from "@fivemjs/shared";
import { Event as EventShared } from "@fivemjs/shared";

export class Event extends EventShared {
	public static emitClient(eventName: string, target: number | string | Player, ...args: any[]): void {
		if (target instanceof Player) {
			target = target.src;
		}
		Cfx.triggerClientEvent(eventName, target, ...args);
	}

	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Event.emitClient(eventName, -1, ...args);
	}

	public static onClient(eventName: string, listener: (player: Player, ...args: any[]) => void): CFXEventData {
		const handler = (...args: any[]) => {
			const src = source;
			const player = Player.fromSource(src);
			listener(player, ...args);
		};
		Cfx.addNetEventListener(eventName, handler);
		return {
			eventName,
			listener: handler,
		} as CFXEventData;
	}

	public static onceClient(eventName: string, listener: (player: Player, ...args: any[]) => void): CFXEventData {
		const eventData = onClient(eventName, (player: Player, ...args: any[]) => {
			listener(player, ...args);
			this.off(eventData);
		});
		return eventData;
	}
}

export const emitClient = Event.emitClient;
export const emitAllClients = Event.emitAllClients;
export const onClient = Event.onClient;
export const onceClient = Event.onceClient;
