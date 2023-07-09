import { randomUUID } from "../uuid";
import { Vector3 } from "@fivemjs/shared";
import { Collision as CollisionBase } from "@fivemjs/shared";
import { Player } from "../objects";

export class Collision extends CollisionBase {
	readonly id = randomUUID();

	constructor(pos: Vector3) {
		super(pos);
	}

	protected isEntityValid(entity: number) {
		if (!super.isEntityValid(entity)) return false;
		if (GetEntityRoutingBucket(entity) != this.dimension) return false;
		return true;
	}
	protected getRevelantEntities(): Array<number> {
		const entities = new Array<number>();
		const players = Player.all;

		for (const player of players) {
			const ped = player.ped;
			entities.push(ped);
		}

		if (!this.playersOnly) {
			const peds = GetAllPeds();
			for (const handle of peds) {
				if (IsPedAPlayer(handle)) continue;
				entities.push(handle);
			}

			const vehicles = GetAllVehicles();
			const props = GetAllObjects();

			entities.push(...vehicles);
			entities.push(...props);
		}

		return entities;
	}
}
