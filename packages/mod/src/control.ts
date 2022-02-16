import * as playerBlueprint from './config/user-example.json';
import { default as rconInterface } from './interface';
import { PlayerBlueprint, processQueue } from './queue';

script.on_init(() => {
	global.cells = [];
	global.blueprintQueue = [];
	global.ghostQueue = [[], []];
	global.players = {};

	if (remote.interfaces['freeplay']) {
		remote.call('freeplay', 'set_disable_crashsite', true);
		remote.call('freeplay', 'set_skip_intro', true);
	}
});

script.on_event(defines.events.on_tick, () => {
	processQueue();
});

commands.add_command('rl', '', () => {
	game.reload_mods();
});

commands.add_command('add', '', () => {
	const response = rconInterface.blueprintRequest({
		type: 'player',
		blueprintString: playerBlueprint,
		username: 'testing',
	});
	game.print(serpent.block(response));
});

remote.add_interface('tpf', {
	blueprintRequest: (request: string) =>
		game.table_to_json(rconInterface.blueprintRequest(game.json_to_table(request) as PlayerBlueprint)),
});

if (script.active_mods['gvv']) {
	require('__gvv__.gvv')();
}
