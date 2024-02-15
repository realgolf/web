import { User_Model } from '$lib/server/user/models';

import type { Types } from 'mongoose';
import type { PageServerLoad } from '../$types';

function removeIdFromGame(
	game: Types.Subdocument<Types.ObjectId> & {
		name?: string | null | undefined;
		id?: string | null | undefined;
		date?: string | null | undefined;
		teams?: string | null | undefined;
		data?: string | null | undefined;
	}
) {
	const gameCopy = JSON.parse(JSON.stringify(game));
	delete gameCopy._id; // Remove the _id field
	return gameCopy;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load: PageServerLoad = async (event: any) => {
	const param_name: string = event.params.name;
	const param_id: string = event.params.id;
	console.log(param_name);
	console.log(param_id);

	const user = await User_Model.findOne({
		'user.username': { $regex: new RegExp(param_name, 'i') }
	});

	if (!user) {
		return { status: 404, error: 'User could not be found' };
	}

	const user_games = user.games;

	// Check if any game has the same id as param_id
	const gameWithId = user_games.find((game) => game.id === param_id);

	console.log(gameWithId);

	if (!gameWithId) {
		return { status: 404, error: 'Game with specified ID not found' };
	}

	const game = removeIdFromGame(gameWithId);

	return { param_name, param_id, game };
};
