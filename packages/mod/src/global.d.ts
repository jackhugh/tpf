import { Cells } from './base-cell';
import { BlueprintQueue, GhostQueue } from './queue';

interface Player {
	totalBlueprints: number;
	lastBlueprint: number;
	username: string;
}

type Players = Record<Player['username'], Player>;

declare global {
	const global: {
		cells: Cells;
		blueprintQueue: BlueprintQueue;
		ghostQueue: GhostQueue;
		players: Players;
	};
}
