import { Resource as sharedResource } from "@fivemjs/shared";
import { Events } from "./Events";
import { CFXEventData } from "@fivemjs/shared";
import { Callback } from "./Callback";
import { Player } from "./Player";

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
		return Events.on(this.getEventName(eventName), handler);
	}

	public static once(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Events.once(this.getEventName(eventName), handler);
	}

	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Events.emitAllClients(this.getEventName(eventName), ...args);
	}

	public static emitClient(eventName: string, target: number, ...args: any[]): void {
		return Events.emitClient(this.getEventName(eventName), target, ...args);
	}

	public static onClient(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Events.onClient(this.getEventName(eventName), handler);
	}

	public static onceClient(eventName: string, handler: (...args: any[]) => void): CFXEventData {
		return Events.onceClient(this.getEventName(eventName), handler);
	}
}
