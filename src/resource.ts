import { Resource as sharedResource } from "@fivemjs/shared";
import { Event } from "./event";
import { CFXEventData } from "@fivemjs/shared";
import { Callback } from "./callback";
import { Player } from "./objects/Player";

class ResourceCallback extends Callback {
	public static register(eventName: string, handler: (player: Player, ...args: any[]) => void): CFXEventData {
		return super.register(Resource.getEventName(eventName), handler);
	}

	public static emit<T>(eventName: string, player: Player, ...args: any[]): Promise<T> {
		return super.emit(Resource.getEventName(eventName), player, ...args);
	}
}

export class Resource extends sharedResource {
	public static readonly Callback = ResourceCallback;

	public static on(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Event.on(this.getEventName(eventName), handler);
	}

	public static once(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Event.once(this.getEventName(eventName), handler);
	}

	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Event.emitAllClients(this.getEventName(eventName), ...args);
	}

	public static emitClient(eventName: string, target: number, ...args: any[]): void {
		return Event.emitClient(this.getEventName(eventName), target, ...args);
	}

	public static onClient(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Event.onClient(this.getEventName(eventName), handler);
	}

	public static onceClient(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Event.onceClient(this.getEventName(eventName), handler);
	}
}
