import { Resource as sharedResource } from "@fivemjs/shared";
import { emitClient, emitAllClients } from "./event";

export class Resource extends sharedResource {
	public static emitAllClients(eventName: string, ...args: any[]): void {
		return emitAllClients(this.getEventName(eventName), ...args);
	}

	public static emitClient(eventName: string, target: number, ...args: any[]): void {
		return emitClient(this.getEventName(eventName), target, ...args);
	}
}
