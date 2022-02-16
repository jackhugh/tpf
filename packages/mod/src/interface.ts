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

function blueprintRequest(req: PlayerBlueprint): BlueprintResponse {
	// validate here

	if (!canPlayerBuild(req.username)) {
		return { success: false, message: `Blueprint timeout` };
	}
	global.blueprintQueue.push(req);
	return { success: true };
}

export default {
	blueprintRequest,
};
