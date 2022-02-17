import { ticksUntilPlayerCanBuild } from './player';
import { createBlueprintStack } from './util';

export interface PlayerBlueprint {
	type: 'player';
	username: string;
	blueprintStack: BlueprintItemStack;
}

export function validate(blueprint: PlayerBlueprint): true | string {
	return true;
}

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
	if (!stack) {
		return { success: false, message: 'Invalid blueprint' };
	}

	const blueprint: PlayerBlueprint = {
		type: 'player',
		blueprintStack: stack,
		username: submission.username,
	};

	const ticksRemaining = ticksUntilPlayerCanBuild(blueprint.username);
	if (ticksRemaining !== 0) {
		const minutes = math.ceil(ticksRemaining / 60 / 60);
		return {
			success: false,
			message: `Timeout - next blueprint can be built in ${minutes} minutes`,
		};
	}

	const validatedStatus = validate(blueprint);
	if (validatedStatus !== true) {
		return { success: false, message: validatedStatus };
	}
	global.blueprintQueue.push(blueprint);

	return { success: true };
}
