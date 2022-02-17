import { canPlayerBuild } from './player';
import { createBlueprintStack } from './util';

export interface PlayerBlueprint {
	type: 'player';
	username: string;
	blueprintStack: BlueprintItemStack;
}

export function validate(blueprint: PlayerBlueprint) {}

export interface PlayerBlueprintSubmission {
	username: string;
	blueprintString: string;
}

export interface SuccessBlueprintResponse {
	success: true;
}
export interface ErrorBlueprintResponse {
	success: false;
	message: string;
}
export type BlueprintResponse = SuccessBlueprintResponse | ErrorBlueprintResponse;

export function blueprintSubmission(submission: PlayerBlueprintSubmission): BlueprintResponse {
	const stack = createBlueprintStack(submission.blueprintString);

	const blueprint: PlayerBlueprint = {
		type: 'player',
		blueprintStack: stack,
		username: submission.username,
	};
	// validate here

	if (!canPlayerBuild(blueprint.username)) {
		return { success: false, message: `Blueprint timeout` };
	}
	global.blueprintQueue.push(blueprint);
	return { success: true };
}
