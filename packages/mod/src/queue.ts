import { buildGhosts as reviveGhosts } from './build';
import { PlayerBlueprint } from './player-blueprint';
import { createPlayerCell } from './player-cell';
import { ServerBlueprint } from './server-blueprint';

// TODO - move this somewhere that makes more sense
export type Blueprint = PlayerBlueprint | ServerBlueprint;

export type BlueprintQueue = Blueprint[];
export type GhostQueue = [GhostEntity[], GhostEntity[]];

const GHOSTS_PER_TICK = 10;

// TODO explore using a queue object as passing around - the previous issue was that `createPlayerCell` needed to return the cell and the ghosts
// I like the idea of just having cell objects in different states and that way ghosts can be stored in the cell itself

interface Queue {
	current: QueueItem;
	queue: QueueItem[];
}
interface QueueItem {
	blueprint: PlayerBlueprint;
	ghosts: QueuedGhost[];
}
interface QueuedGhost {
	ghost: GhostEntity;
	attempts: number;
}

export function processQueue() {
	if (global.ghostQueue[0].length === 0 && global.ghostQueue[1].length === 0) {
		createNextQueued();
	}

	const firstQueue = global.ghostQueue[0];
	const secondQueue = global.ghostQueue[1];

	if (firstQueue.length > 0) {
		const ghostsPick = firstQueue.splice(0, GHOSTS_PER_TICK);
		const outstanding = reviveGhosts(ghostsPick);
		secondQueue.push(...outstanding);
	} else if (secondQueue.length > 0) {
		const ghostsPick = secondQueue.splice(0, GHOSTS_PER_TICK);
		reviveGhosts(ghostsPick);
	}
}

function createNextQueued() {
	if (global.blueprintQueue.length === 0) return;

	const [nextQueued] = global.blueprintQueue.splice(0, 1);
	if (!nextQueued) return;
	// TODO delete inventory

	switch (nextQueued.type) {
		case 'player': {
			createPlayerCell(nextQueued);
			break;
		}
	}
}
