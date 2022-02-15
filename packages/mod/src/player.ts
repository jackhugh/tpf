const TIME_BETWEEN_BLUEPRINTS = 60 * 60 * 5;

export function playerCanBuild(username: string) {
	const player = global.players[username];
	if (!player) return true;

	return player.lastBlueprint + TIME_BETWEEN_BLUEPRINTS <= game.tick;
}

export function playerHasBuilt(username: string) {
	global.players[username] = global.players[username] ?? {
		lastBlueprint: 0,
		totalBlueprints: 0,
		username,
	};
	global.players[username]!.lastBlueprint = game.tick;
	global.players[username]!.totalBlueprints++;
}
