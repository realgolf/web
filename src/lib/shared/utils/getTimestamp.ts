/**
 * Get the current timestamp in the format HH:MM:SS
 * @returns {string} The current timestamp
 */
export function get_timestamp() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
