import * as userExample from './config/user-example.json';
import { createPlayerCell } from './player-cell';
import { processQueue } from './queue';

script.on_init(() => {
	global.cells = [];
	global.queue = [];
	global.players = {};
});

script.on_event(defines.events.on_tick, () => {
	processQueue(global.queue);
});

commands.add_command('add', '', () => {
	const cell = createPlayerCell(global.cells, { blueprintString: userExample, username: 'dementedpeanut' });
	global.cells[cell.index] = cell;
});

commands.add_command('rl', '', () => {
	game.reload_mods();
});

if (script.active_mods['gvv']) {
	require('__gvv__.gvv')();
}
