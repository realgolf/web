/**
 * Get the current timestamp in the format HH:MM:SS
 * @returns {string} The current timestamp
 */
export function get_timestamp() {
	const date = new Date();

	// Get hours, minutes, and seconds from the date object
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Add leading zeros if the value is less than 10
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	// Concatenate formatted time components with colons
	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
