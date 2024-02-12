import { cookie_options } from '$lib/server/utils';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	event.cookies.delete('auth-token', cookie_options);
	event.cookies.delete('email', cookie_options);
	event.cookies.delete('name', cookie_options);
	event.cookies.delete('username', cookie_options);
	throw redirect(301, '/');
};

export const actions: Actions = {
	default: async (event) => {
		event.cookies.delete('auth-token', cookie_options);
		event.cookies.delete('email', cookie_options);
		event.cookies.delete('name', cookie_options);
		event.cookies.delete('username', cookie_options);
		throw redirect(301, '/');
	}
};
