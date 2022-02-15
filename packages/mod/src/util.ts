export function squareRadius(size: number) {
	let x = math.pow(size, 2);
	x = x * 2;
	x = math.pow(x, 0.5);
	x = x / 2;
	return x;
}
