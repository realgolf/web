import { get_url } from '$lib/server/url-shortner/read';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const shortcut = event.params.shortcut;
	const url = await get_url(shortcut);
	if (url) throw redirect(301, url);
	throw redirect(301, '/');
};
