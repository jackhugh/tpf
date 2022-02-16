// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PlayerBlueprint } from 'mod/queue';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendBlueprint } from '../../rcon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(404).json('not found');
		return;
	}
	const blueprintString = req.body.blueprint as string;
	const blueprint: PlayerBlueprint = {
		type: 'player',
		username: 'testing',
		blueprintString,
	};
	const response = await sendBlueprint(blueprint);
	res.status(response.success ? 201 : 400).json(response);
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1MB',
		},
	},
};
