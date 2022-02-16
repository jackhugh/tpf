import { buildGhosts as reviveGhosts } from './build';
import { createPlayerCell } from './player-cell';

export interface PlayerBlueprint {
	type: 'player';
	username: string;
	blueprintString: string;
}

export type Blueprint = PlayerBlueprint;

export type BlueprintQueue = Blueprint[];
export type GhostQueue = [GhostEntity[], GhostEntity[]];

const GHOSTS_PER_TICK = 1;

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

	switch (nextQueued.type) {
		case 'player': {
			createPlayerCell(nextQueued);
			break;
		}
	}
}
