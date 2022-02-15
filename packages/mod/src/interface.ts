import { playerCanBuild } from './player';

export interface BlueprintRequest {
	blueprintString: string;
	username: string;
}

export interface SuccessBlueprintResponse {
	success: true;
}
export interface ErrorBlueprintResponse {
	success: false;
	message: string;
}
export type BlueprintResponse = SuccessBlueprintResponse | ErrorBlueprintResponse;

function blueprintRequest(req: BlueprintRequest): BlueprintResponse {
	// validate here

	if (!playerCanBuild(req.username)) {
		return { success: false, message: 'Blueprint timeout' };
	}
	global.queue.push({ status: 'unprocessed', blueprintRequest: req });
	return { success: true };
}

export default {
	blueprintRequest,
};
