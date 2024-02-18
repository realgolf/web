export function verify_name(name: string): string {
	if (!name) {
		return 'Name is required.';
	}

	if (name.length <= 1) {
		return 'Name has to be at least 2 characters.';
	}

	return '';
}
