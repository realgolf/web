import type { Cookies } from '@sveltejs/kit';
import { authenticate } from '../authenticate';
import { User_Model } from '../models';
import { verify_email } from '../register';

export async function change_email(
	cookies: Cookies,
	email: string
): Promise<{ error: string } | { email: string }> {
	const auth = authenticate(cookies);

	if (!auth) {
		return { error: 'You are not authenticated' };
	}

	const { id } = auth;

	const email_error = await verify_email(email);

	if (email_error) {
		return { error: email_error };
	}

	const user = await User_Model?.findOne({ _id: id });

	if (!user) {
		return { error: 'User could not found' };
	}

	if (user && user.user) {
		user.user.email = email;
	}

	try {
		await user.save();
		return { email };
	} catch (err) {
		return { error: err as string };
	}
}
