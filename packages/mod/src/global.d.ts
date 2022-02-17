import { Cells } from './base-cell';
import { Players } from './player';
import { BlueprintQueue, GhostQueue } from './queue';

declare global {
	const global: {
		cells: Cells;
		blueprintQueue: BlueprintQueue;
		ghostQueue: GhostQueue;
		players: Players;
		baseCellBlueprintStack: BlueprintItemStack;
	};
}
