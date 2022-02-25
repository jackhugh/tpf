import { CellBase, createBaseCell } from './base-cell';
import { createGhosts } from './build';
import { playerHasBuilt } from './player';
import { PlayerBlueprint } from './player-blueprint';

export interface PlayerCell extends CellBase {
	type: 'player';
	username: string;
	renderUsernameRef: number;
}

export function createPlayerCell(blueprint: PlayerBlueprint) {
	const baseCell = createBaseCell();

	createGhosts(baseCell.mapPosition, blueprint.blueprintStack);

	const mapUsername = renderPlayerUsername(blueprint.username, baseCell.mapPosition);

	playerHasBuilt(blueprint.username);

	const cell: PlayerCell = {
		...baseCell,
		type: 'player',
		username: blueprint.username,
		renderUsernameRef: mapUsername,
	};
	global.cells[cell.index] = cell;
}

function renderPlayerUsername(username: string, position: PositionTable) {
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
