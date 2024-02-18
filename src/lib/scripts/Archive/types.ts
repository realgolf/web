/**
 * Represents an array of filtered games.
 * It can contain either an array of `games` objects or an array of any other type.
 */
// eslint-disable-next-line
export type filteredGames = games[] | any[];

/**
 * Represents the data object.
 * It contains properties such as authentication token, email, an array of `games` objects,
 * measurement units, name, and theme.
 */

export type Data = {
	auth: string;
	email: string;
	games: games[];
	measurement_units: string;
	name: string;
	theme: string;
};
