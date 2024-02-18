/**
 * Retrieves the frontmatter attributes from a collection of markdown files.
 *
 * @template T - The type of the frontmatter attributes object.
 * @param glob - A record containing the paths and contents of the markdown files.
 * @returns An array of objects containing the frontmatter attributes and the corresponding file ID.
 */
import fm from 'front-matter';

export function get_frontmatter<T extends { id: string }>(glob: Record<string, string>): T[] {
	return Object.entries(glob).map(([path, markdown]) => {
		const id = path.split('/').at(-1)?.replace('.md', '');
		const { attributes } = fm<T>(markdown);
		return { ...attributes, id };
	});
}
