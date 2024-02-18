/**
 * Formats a date into a string representation.
 * @param date - The date to format.
 * @returns The formatted date string in the format "dd.mm.yyyy".
 */
export function formatDate(date: Date): string {
	const d = date.getDate().toString().padStart(2, '0');
	const m = (date.getMonth() + 1).toString().padStart(2, '0');
	const y = date.getFullYear().toString();
	return `${d}.${m}.${y}`;
}

/**
 * Composes an array of functions into a single function.
 * @param funs - An array of functions to compose.
 * @returns A function that applies each function in the array from left to right.
 */
export function compose<X>(funs: ((x: X) => X)[]): (x: X) => X {
	if (funs.length === 0) return (x) => x;
	const [first, ...rest] = funs;
	return (x) => compose(rest)(first(x));
}
