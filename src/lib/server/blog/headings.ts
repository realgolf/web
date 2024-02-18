/**
 * Generates an ID from the given text by removing leading/trailing spaces and replacing spaces with hyphens.
 * @param text - The text to generate the ID from.
 * @returns The generated ID.
 */
function generate_id(text: string): string {
	return text.trim().toLowerCase().replace(/\s+/g, '-');
}

/**
 * Adds IDs to the headings in the HTML content.
 * @param html_content - The HTML content to modify.
 * @returns The modified HTML content with added IDs to the headings.
 */
export function add_ids_to_headings(html_content: string): string {
	const modifiedHtmlCode = html_content
		.replace(/<h2>(.*?)<\/h2>/gi, (_, heading) => {
			const id = generate_id(heading);
			return `<h2 id="${id}">${heading}</h2>`;
		})
		.replace(/<h3>(.*?)<\/h3>/gi, (_, heading) => {
			const id = generate_id(heading);
			return `<h3 id="${id}">${heading}</h3>`;
		});

	return modifiedHtmlCode;
}

/**
 * Retrieves the table of contents from the HTML content.
 * @param html_content - The HTML content to extract the table of contents from.
 * @returns An array of objects containing the text and ID of each heading in the table of contents.
 */
export function get_table_of_contents(html_content: string): { text: string; id: string }[] {
	const matches = html_content.match(/<h2>(.*?)<\/h2>/gi);
	if (!matches) return [];
	return matches.map((match) => {
		const text = match.replace(/<\/?h2>/g, '');
		const id = text.trim().toLowerCase().replace(/\s+/g, '-');
		return { text, id };
	});
}
