// const SUMBISSION_TIMEOUT = 60 * 60 * 5;
const SUMBISSION_TIMEOUT = 0;

export interface Player {
	totalBlueprints: number;
	lastBlueprint: number;
	username: string;
}

export type Players = Record<Player['username'], Player>;

export function ticksUntilPlayerCanBuild(username: string) {
	const player = global.players[username];
	if (!player) return 0;

	const nextBuild = player.lastBlueprint + SUMBISSION_TIMEOUT;
	const ticksRemaining = nextBuild - game.tick;

	return math.max(ticksRemaining, 0);
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
