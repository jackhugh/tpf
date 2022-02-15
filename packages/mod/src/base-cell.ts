import { buildBlueprint, generateChunks } from './build';
import { Config } from './config';
import * as baseCell from './config/cell-base.json';
import { squareRadius } from './util';

export type Cells = Array<Cell | undefined>;

export interface Cell {
	index: number;
	mapPosition: PositionTable;
	cellPosition: PositionTable;
	mapId: number;
}

export function createBaseCell(cells: Cells, config: Config): Cell {
	const cell = nextCell(cells, config);

	generateChunks(cell.mapPosition, math.ceil(squareRadius(config.size)));

	buildBlueprint(cell.mapPosition, baseCell);

	const mapId = printCellId(cell.index, {
		x: cell.mapPosition.x,
		y: cell.mapPosition.y + (config.size - config.overlap) / 2 - 4,
	});

	return {
		...cell,
		mapId,
	};
}

function printCellId(id: number, position: PositionTable) {
	return rendering.draw_text({
		color: [0, 0, 0, 0.8],
		surface: game.surfaces[1]!,
		target: position,
		text: id,
		scale: 6,
		alignment: 'center',
	});
}

export function nextCell(cells: Cells, config: Config) {
	const index = nextCellIndex(cells);
	const cellPosition = calcCellPosition(index, config);
	const mapPosition = calcMapPosition(cellPosition, config);

	return {
		index,
		mapPosition,
		cellPosition,
	};
}

function calcCellPosition(index: number, config: Config) {
	return {
		x: index % config.columns,
		y: math.floor(index / config.columns),
	};
}
function calcMapPosition(cellPosition: PositionTable, config: Config) {
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

function nextCellIndex(cells: Cells) {
	const availableIndex = cells.findIndex((elem) => elem === undefined);
	if (availableIndex >= 0) return availableIndex;
	return cells.length;
}
