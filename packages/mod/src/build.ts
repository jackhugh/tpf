export function generateChunks(position: PositionTable, radius: number) {
	game.surfaces[1]!.request_to_generate_chunks(position, radius);
	game.surfaces[1]!.force_generate_chunk_requests();
}

export function createGhosts(position: PositionTable, blueprintStack: BlueprintItemStack) {
	const ghosts = blueprintStack.build_blueprint({
		force: game.forces[1]!,
		position: position,
		surface: game.surfaces[1]!,
	});
	global.ghostQueue[0]!.push(...ghosts);
}

export function reviveGhosts(ghosts: GhostEntity[]) {
	const outstanding: GhostEntity[] = [];
	ghosts.forEach((ghost) => {
		if (ghost.valid) {
			const [success] = ghost.revive();
			if (!success) outstanding.push(ghost);
		}
	});
	return outstanding;
}
