import { BlueprintResponse } from 'mod/interface';
import { PlayerBlueprint } from 'mod/queue';
import { Rcon } from 'rcon-client';

const rconConfig = {
	host: '192.168.1.19',
	port: 27015,
	password: 'hello123',
};

export async function sendBlueprint(blueprint: PlayerBlueprint) {
	const response: BlueprintResponse = await rconSend('blueprintRequest', blueprint);
	return response;
}

async function rconSend(functionName: string, data: object) {
	const message = `/silent-command rcon.print(remote.call('tpf', '${functionName}', '${JSON.stringify(data)}'))`;
	const rcon = await Rcon.connect(rconConfig);
	const response = await rcon.send(message);
	rcon.end();
	return JSON.parse(response);
}
