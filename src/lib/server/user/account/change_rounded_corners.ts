import type { Cookies } from '@sveltejs/kit';
import { authenticate } from '../authenticate';
import { User_Model } from '../models';

export async function change_rounded_corners(cookies: Cookies, rounded_corners: boolean) {
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
		user.user.rounded_corners = rounded_corners;
	}

	try {
		await user.save();
		return { rounded_corners };
	} catch (err) {
		return { error: err as string };
	}
}
