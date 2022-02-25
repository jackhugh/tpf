import jwt from 'jsonwebtoken';

export function getUsername(userId: string) {}

export function verifyUser(token: string) {
	try {
		const secret = Buffer.from(process.env.EXTENSION_SECRET, 'base64');
		const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
		if (typeof decodedToken === 'object') {
			return decodedToken.userId as string;
		}
		throw Error();
	} catch {
		return undefined;
	}
}
