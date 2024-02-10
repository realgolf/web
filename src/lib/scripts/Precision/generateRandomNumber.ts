export function generateRandomNumber(
	range: number,
	lower_range: number,
	upper_range: number
): number {
	let randomNumber: number;

	do {
		randomNumber = Math.random() * range + lower_range;
	} while (randomNumber >= upper_range);

	const roundedNumber: number = Math.ceil(randomNumber);
	return roundedNumber;
}
