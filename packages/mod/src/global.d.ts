import { Cells } from './base-cell';
import { Queue } from './queue';

interface Player {
	totalBlueprints: number;
	lastBlueprint: number;
	username: string;
}

type Players = Record<Player['username'], Player>;

declare global {
	const global: {
		cells: Cells;
		queue: Queue;
		players: Players;
	};
}
