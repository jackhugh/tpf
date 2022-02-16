import { canPlayerBuild } from './player';
import { PlayerBlueprint } from './queue';

export interface SuccessBlueprintResponse {
	success: true;
}
export interface ErrorBlueprintResponse {
	success: false;
	message: string;
}
export type BlueprintResponse = SuccessBlueprintResponse | ErrorBlueprintResponse;

function blueprintRequest(blueprint: PlayerBlueprint): BlueprintResponse {
	// validate here

	if (!canPlayerBuild(blueprint.username)) {
		return { success: false, message: `Blueprint timeout` };
	}
	global.blueprintQueue.push(blueprint);
	return { success: true };
}

export default {
	blueprintRequest,
};
