import { BlueprintSubmission } from 'mod/player-blueprint';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsername, verifyUser } from 'server/src/twitch';
import { rconSend } from '../../rcon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(404).json('not found');
	}

	const blueprintString = req.body.blueprint;
	if (typeof blueprintString !== 'string') {
		return res.status(400).json('No blueprint provided');
	}

	// TODO - pass this as header
	const token = req.body.token;
	if (typeof token !== 'string') {
		return res.status(401).json('Not authenticated');
	}

	const userId = verifyUser(token);
	if (!userId) {
		return res.status(403).json('Unauthorized');
	}

	const twitchName = getUsername(userId);

	const blueprint: BlueprintSubmission = {
		username: 'testing',
		blueprintString,
	};
	const response = await rconSend('blueprintSubmission', blueprint);
	return res.status(response.success ? 201 : 400).json(response);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1MB',
		},
	},
};
