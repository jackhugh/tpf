import { Blueprint } from './blueprint';

export type Grid = Array<GridSquare | undefined>;

/**
 * Zero-indexed grid position
 */
export interface GridPosition {
	x: number;
	y: number;
}

export interface GridSquare {
	mapPosition: MapPosition;
	gridPosition: GridPosition;
	blueprint: Blueprint;
}

export function createGrid(blueprint: Blueprint) {
	const nextIndex = nextGridIndex();
	// global.grid[nextIndex] = {
	// 	blueprint,
	// 	mapPosition: calcMapPosition(nextIndex, 10),
	// 	gridPosition: calcGridPosition(nextIndex, 10),
	// };
}

const DESIGN_SIZE = 94;
const DESIGN_OVERLAP = 30;
const GRID_COLUMNS = 10;
const BOTTOM_MIDDLE = { x: 0, y: 0 };

const tiledSize = DESIGN_SIZE - DESIGN_OVERLAP;
const firstGridPosition = {
	x: BOTTOM_MIDDLE.x - (GRID_COLUMNS / 2) * tiledSize + tiledSize / 2,
	y: BOTTOM_MIDDLE.y - tiledSize / 2,
};

function calcGridPosition(index: number, columns: number) {}
function calcMapPosition(index: number, columns: number) {}

function nextGridIndex() {
	const undefinedIndex = global.grid.findIndex((elem) => elem === undefined);
	if (undefinedIndex >= 0) return undefinedIndex;
	return global.grid.length;
}
