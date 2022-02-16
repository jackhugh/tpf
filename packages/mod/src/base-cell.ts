import { createGhosts, generateChunks } from './build';
import * as baseCell from './config/cell-base.json';
import * as config from './config/config.json';
import { squareRadius } from './util';

export type Cells = Array<CellBase | undefined>;

export interface CellBase {
	index: number;
	mapPosition: PositionTable;
	gridPosition: PositionTable;
	renderIdRef: number;
}

export function createBaseCell(): CellBase {
	const cell = getNextCell();

	generateChunks(cell.mapPosition, math.ceil(squareRadius(config.size)));

	createGhosts(cell.mapPosition, baseCell);

	const mapId = printCellId(cell.index, {
		x: cell.mapPosition.x,
		y: cell.mapPosition.y + (config.size - config.overlap) / 2 - 4,
	});

	return {
		...cell,
		renderIdRef: mapId,
	};
}

function printCellId(id: number, position: PositionTable) {
	return rendering.draw_text({
		color: [0, 0, 0, 0.8],
		surface: game.surfaces[1]!,
		target: position,
		text: id + 1,
		scale: 6,
		alignment: 'center',
	});
}

export function getNextCell() {
	const index = nextCellIndex();
	const gridPosition = calcCellPosition(index);
	const mapPosition = calcMapPosition(gridPosition);

	return {
		index,
		mapPosition,
		gridPosition,
	};
}

function calcCellPosition(index: number) {
	return {
		x: index % config.columns,
		y: math.floor(index / config.columns),
	};
}
function calcMapPosition(cellPosition: PositionTable) {
	const netSize = config.size - config.overlap;
	const firstPosition = {
		x: config.startPosition.x - (config.columns / 2) * netSize + netSize / 2,
		y: config.startPosition.y,
	};
	return {
		x: firstPosition.x + cellPosition.x * netSize,
		y: firstPosition.y - cellPosition.y * netSize,
	};
}

function nextCellIndex() {
	const availableIndex = global.cells.findIndex((elem) => elem === undefined);
	if (availableIndex >= 0) return availableIndex;
	return global.cells.length;
}
