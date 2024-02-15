import type { posts } from '$lib/scripts/Blog/types';
import {
	add_ids_to_headings,
	get_table_of_contents,
	highlight_code,
	render_formulas,
	render_markdown,
	transform_external_links
} from '$lib/server/blog';
import { compose } from '$lib/shared/blog_util';
import { error } from '@sveltejs/kit';
import fm from 'front-matter';

const posts_record = import.meta.glob('/src/lib/posts/*.md', {
	as: 'raw',
	eager: true
});

export const load = async (event) => {
	const id = event.params.id;
	const path = `/src/lib/posts/${id}.md`;

	if (!(path in posts_record)) {
		throw error(404, 'There is no post with this ID');
	}

	const markdown = posts_record[path];
	const { attributes: _attributes, body } = fm<Omit<posts, 'id'>>(markdown);
	const attributes: posts = { ..._attributes, id };

	const html_raw = render_markdown(body);

	const html_code = compose([
		render_formulas,
		transform_external_links,
		add_ids_to_headings,
		highlight_code
	])(html_raw);

	const toc = get_table_of_contents(html_raw);

	const { title, description } = attributes;
	const meta = { title, description };

	return { meta, attributes, html_code, toc };
};
