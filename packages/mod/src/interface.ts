export interface BlueprintRequest {
	blueprintString: string;
	username?: string;
}

function blueprintRequest(req: BlueprintRequest) {}

export default {
	blueprintRequest,
};
