import type { User } from '$lib/server/user/types';

export function search_by_term(all_users: User[], search_term: string) {
	// Filter all_users based on search_term
	return all_users.filter((user) => {
		return user.user.username.includes(search_term);
	});
}
