import { Player } from "./Player";
import { randomUUID } from "./utils/uuid";
import { Events } from "./Events";
import { Callback as CallbackShared } from "@fivemjs/shared";
import { CFXEventData } from "@fivemjs/shared";

export class Callback extends CallbackShared {
	public static emit<T>(eventName: string, player: Player, ...args: any[]): Promise<T> {
		const cbId = randomUUID();
		const promise = new Promise<T>((resolve, reject) => {
			Events.onceClient(cbId, (player: Player, data: any) => {
				resolve(data as T);
			});
		});
		player.emit(`${this.clientNamespace}:${eventName}`, cbId, ...args);
		return promise;
	}

	public static register(eventName: string, handler: (player: Player, ...args: any[]) => void) : CFXEventData {
		return Events.onClient(`${this.serverNamespace}:${eventName}`, (player: Player, cbId: string, ...args: any[]) => {
			player.emit(cbId, handler(player, ...args));
		});
	}
}
