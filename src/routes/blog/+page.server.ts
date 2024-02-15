export const prerender = true;

import type { posts } from '$lib/scripts/Blog/types';
import { get_frontmatter } from '$lib/server/blog';

export const load = async () => {
	const unsorted_posts = get_frontmatter<posts>(
		import.meta.glob('/src/lib/posts/**/*.md', {
			as: 'raw',
			eager: true
		})
	);

	const posts = [...unsorted_posts].sort((p, q) => q.published.getTime() - p.published.getTime());

	const meta = {
		title: 'RealGolf.Games - Blog',
		description: 'A lot abour RealGolf.Games and the games we make.'
	};

	return { meta, posts };
};
