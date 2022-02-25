import * as baseCellBlueprintString from './config/cell-base.json';
import * as playerBlueprintString from './config/player-example.json';
import interfaces from './interface';
import { BlueprintSubmission } from './player-blueprint';
import { processQueue } from './queue';
import { createBlueprintStack } from './util';

// TODO - better config system - seperate server + design configs?

script.on_init(() => {
	global.cells = [];
	global.blueprintQueue = [];
	global.ghostQueue = [[], []];
	global.players = {};
	global.baseCellBlueprintStack = createBlueprintStack(baseCellBlueprintString) as BlueprintItemStack;

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
	const response = interfaces.blueprintSubmission({
		username: 'testing',
		blueprintString: playerBlueprintString,
	});
	game.print(serpent.line(response));
});

remote.add_interface('tpf', {
	blueprintSubmission: (submission: string) =>
		game.table_to_json(interfaces.blueprintSubmission(game.json_to_table(submission) as BlueprintSubmission)),
});

if (script.active_mods['gvv']) {
	require('__gvv__.gvv')();
}
