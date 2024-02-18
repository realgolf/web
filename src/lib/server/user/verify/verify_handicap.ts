export function verify_handicap(handicap: number): string {
	const advice = " If you don't have a handicap, please enter 54.";

	if (!handicap) {
		return 'Handicap is required.' + advice;
	}

	if (isNaN(handicap)) {
		return 'Invalid handicap value. Please enter a valid number.' + advice;
	}

	if (handicap > 54) {
		return 'Handicap must be smaller or equal to 54.' + advice;
	}

	if (handicap < -54) {
		return 'Handicap is too low.' + advice;
	}

	return '';
}
