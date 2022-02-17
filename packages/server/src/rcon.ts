import interfaces from 'mod/interface';
import { Rcon } from 'rcon-client';

const rconConfig = {
	host: '192.168.1.19',
	port: 27015,
	password: 'hello123',
};

export async function rconSend<T extends keyof typeof interfaces>(
	functionName: T,
	data: Parameters<typeof interfaces[typeof functionName]>[0]
) {
	// TODO escape lua string
	const encoded = JSON.stringify(data).replace("'", "'");
	const message = `/silent-command rcon.print(remote.call('tpf', '${functionName}', '${encoded}'))`;
	const rcon = await Rcon.connect(rconConfig);
	const response = await rcon.send(message);
	rcon.end();
	return JSON.parse(response) as ReturnType<typeof interfaces[typeof functionName]>;
}
