/**
 * Transforms external links in the given HTML content by adding the 'target="_blank"' attribute.
 *
 * @param html_content - The HTML content to transform.
 * @returns The transformed HTML content with external links modified.
 */
const regex = /<a([^>]*)href=["'](https?:\/\/[^"']+)["']([^>]*)>/gi;

export function transform_external_links(html_content: string) {
	return html_content.replace(regex, '<a$1href="$2"$3 target="_blank">');
}
