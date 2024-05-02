import { User_Model } from '$lib/server/user/models';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const email = event.cookies.get('email');
		const data = await event.request.formData();
		const verification_code = (data.get('verification_code') as string)?.trim();

		try {
			const user = await User_Model?.findOne({ 'user.email': email });

			if (!user) {
				throw new Error('User not found');
			}

			const user_verification_code = user.user?.verification_code?.trim();

			if (verification_code !== user_verification_code) {
				await User_Model?.deleteOne({ 'user.email': email });
			} else {
				await User_Model?.updateOne(
					{ 'user.email': email },
					{ $set: { 'user.verified': true }, $unset: { 'user.verification_code': '' } }
				);
			}

			redirect(301, '/login');
		} catch (error) {
			// Handle errors
			console.error('Error verifying user:', error);
			return { status: 500, body: 'Error verifying user' };
		}
	}
};
