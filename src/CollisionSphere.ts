import { Collision } from "./Collision";
import { Vector3 } from "@cfx/server";

export class CollisionSphere extends Collision {
	radius: number;
	constructor(pos: Vector3, radius: number) {
		super(pos);
		this.radius = radius;
	}

	protected isPositionInside(pos: Vector3) {
		return this.pos.distance(pos) <= this.radius;
	}

	protected isEntityInside(entity: number) {
		const position = Vector3.fromArray(GetEntityCoords(entity));
		return this.isPositionInside(position);
	}
}
