export function generateChunks(position: PositionTable, radius: number) {
	game.surfaces[1]!.request_to_generate_chunks(position, radius);
	game.surfaces[1]!.force_generate_chunk_requests();
}

export function createGhosts(position: PositionTable, blueprintString: string) {
	const inventory = game.create_inventory(1);
	const [blueprint] = inventory.find_empty_stack();

	blueprint?.import_stack(blueprintString);
	const ghosts = blueprint?.build_blueprint({
		force: game.forces[1]!,
		position: position,
		surface: game.surfaces[1]!,
	});
	if (ghosts) {
		global.ghostQueue[0]!.push(...ghosts);
	}

	inventory.destroy();
}

export function buildGhosts(ghosts: GhostEntity[]) {
	const outstanding: GhostEntity[] = [];
	ghosts.forEach((ghost) => {
		if (ghost.valid) {
			const [success] = ghost.revive();
			if (!success) outstanding.push(ghost);
		}
	});
	return outstanding;
}
