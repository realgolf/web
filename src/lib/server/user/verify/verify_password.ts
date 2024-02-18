export function verify_password(password: string, verified_password: string): string {
	if (!password) {
		return 'Pasword is required.';
	}

	if (password !== verified_password) {
		return 'The passwords must be identical.';
	}

	if (password.length < 8) {
		return 'Password must be at least 8 characters.';
	}

	return '';
}
