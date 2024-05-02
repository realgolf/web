import { register_user } from '$lib/server/user/register';
import { cookie_options } from '$lib/server/user/utils';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = (data.get('email') as string)?.toLowerCase()?.trim();
		const password = data.get('password') as string;
		const verified_password = data.get('password_verify') as string;
		const name = (data.get('name') as string)?.trim();
		const username = (data.get('username') as string).trim();
		const handicap = data.get('handicap') as unknown as number;
		const handicap_updated = new Date();
		const registration_date = new Date();

		const user = { email, name, username };

		const { error } = await register_user(
			email,
			password,
			verified_password,
			name,
			username,
			handicap,
			handicap_updated,
			registration_date
		);

		if (error) {
			return fail(400, { error, user });
		} else {
			event.cookies.set('email', email, cookie_options);
		}
	}
};
