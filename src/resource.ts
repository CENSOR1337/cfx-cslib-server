import { Resource as sharedResource } from "@fivemjs/shared";
import { Event } from "./event";
import { CFXEventData } from "@fivemjs/shared";

export class Resource extends sharedResource {
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
