import { BlueprintRequest } from './interface';
import { createPlayerCell } from './player-cell';

interface UnprocessedBlueprint {
	status: 'unprocessed';
	blueprintRequest: BlueprintRequest;
}

interface ProcessingBlueprint {
	status: 'processing';
	blueprintRequest: BlueprintRequest;
	ghosts: GhostEntity[];
}

type QueuedBlueprint = UnprocessedBlueprint | ProcessingBlueprint;

export type Queue = QueuedBlueprint[];

export function processQueue(queue: Queue) {
	const nextQueued = queue[0];
	if (!nextQueued) return;

	queue[0] = nextQueued;
	const cell = createPlayerCell(global.cells, nextQueued.blueprintRequest);
	global.cells[cell.index] = cell;
}
