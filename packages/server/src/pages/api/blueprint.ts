import { PlayerBlueprintSubmission } from 'mod/player-blueprint';
import type { NextApiRequest, NextApiResponse } from 'next';
import { rconSend } from '../../rcon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(404).json('not found');
		return;
	}
	const blueprintString = req.body.blueprint as string;
	const blueprint: PlayerBlueprintSubmission = {
		username: 'testing',
		blueprintString,
	};
	const response = await rconSend('blueprintSubmission', blueprint);
	res.status(response.success ? 201 : 400).json(response);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1MB',
		},
	},
};
