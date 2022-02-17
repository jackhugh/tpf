export function squareRadius(size: number) {
	let x = math.pow(size, 2);
	x = x * 2;
	x = math.pow(x, 0.5);
	x = x / 2;
	return x;
}

export function createBlueprintStack(blueprintString: string) {
	const inventory = game.create_inventory(1);
	const stack = inventory.find_empty_stack()[0]!;
	stack.import_stack(blueprintString);
	return stack;
}
