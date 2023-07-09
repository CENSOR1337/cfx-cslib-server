import { Vector3 } from "@fivemjs/shared";
import { Event } from "../event";

export class Player {
	public readonly type = "player";
	public static readonly type = "player";
	public readonly source: number;

	private constructor(src: number | string) {
		this.source = Number(src);
	}

    public static fromSource(src: number | string): Player {
        return new Player(src);
    }

	private get sourceStr(): string {
		return String(this.source);
	}

	public get src(): number {
		return this.source;
	}

	public get ped(): number {
		return GetPlayerPed(this.sourceStr);
	}

	public get identifiers(): string[] {
		return getPlayerIdentifiers(this.source);
	}

	public get endPoint(): string {
		return GetPlayerEndpoint(this.sourceStr);
	}

	public get name(): string {
		return GetPlayerName(this.sourceStr);
	}

	public get ping(): number {
		return GetPlayerPing(this.sourceStr);
	}

	public get pos(): Vector3 {
		return Vector3.fromArray(GetEntityCoords(this.ped));
	}

	public get rot(): Vector3 {
		return Vector3.fromArray(GetEntityRotation(this.ped));
	}

	public get isMuted(): boolean {
		return MumbleIsPlayerMuted(this.source);
	}

	public set isMuted(isMuted: boolean) {
		MumbleSetPlayerMuted(this.source, isMuted);
	}

	public isAceAllowed(object: string): boolean {
		return IsPlayerAceAllowed(this.sourceStr, object);
	}

	public drop(reason: string): void {
		DropPlayer(this.sourceStr, reason);
	}

	public emit(eventName: string, ...args: any[]): void {
		Event.emitClient(eventName, this.source, ...args);
	}
}
