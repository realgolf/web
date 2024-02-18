import type { Cookies } from '@sveltejs/kit';
import { authenticate } from '../authenticate';
import { User_Model } from '../models';

export async function change_theme(cookies: Cookies, theme: string) {
	const auth = authenticate(cookies);

	if (!auth) {
		return { error: 'You are not authenticated' };
	}

	const { id } = auth;

	const user = await User_Model?.findOne({ _id: id });

	if (!user) {
		return { error: 'User could not be found' };
	}

	if (user && user.user) {
		user.user.theme = theme;
	}

	try {
		await user.save();
		return { theme };
	} catch (err) {
		return { error: err as string };
	}
}
