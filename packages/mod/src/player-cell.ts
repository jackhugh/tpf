import { Cell, Cells, createBaseCell } from './base-cell';
import { buildBlueprint } from './build';
import * as config from './config/config.json';
import { BlueprintRequest } from './interface';
import { playerHasBuilt } from './player';

export interface PlayerCell extends Cell {
	username: string;
	mapUsername: number;
}

export function createPlayerCell(cells: Cells, blueprintRequest: BlueprintRequest): PlayerCell {
	const baseCell = createBaseCell(cells, config);

	buildBlueprint(baseCell.mapPosition, blueprintRequest.blueprintString);

	const mapUsername = printPlayerUsername(blueprintRequest.username, baseCell.mapPosition);

	playerHasBuilt(blueprintRequest.username);

	return {
		...baseCell,
		username: blueprintRequest.username,
		mapUsername,
	};
}

function printPlayerUsername(username: string, position: PositionTable) {
	return rendering.draw_text({
		color: [math.random(), math.random(), math.random()],
		surface: game.surfaces[1]!,
		target: { x: position.x, y: position.y - 3 },
		text: username,
		only_in_alt_mode: true,
		scale: 10,
		alignment: 'center',
	});
}
