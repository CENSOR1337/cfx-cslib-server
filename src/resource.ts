import { Resource as sharedResource } from "@fivemjs/shared";
import { Event } from "./event";

export class Resource extends sharedResource {
	public static emitAllClients(eventName: string, ...args: any[]): void {
		return Event.emitAllClients(this.getEventName(eventName), ...args);
	}

	public static emitClient(eventName: string, target: number, ...args: any[]): void {
		return Event.emitClient(this.getEventName(eventName), target, ...args);
	}
}
