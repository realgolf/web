/**
 * Renders the given markdown string into HTML.
 * @param str - The markdown string to render.
 * @returns The rendered HTML.
 */
import markdownit from 'markdown-it';

const md = new markdownit();

export function render_markdown(str: string) {
	return md.render(str);
}
