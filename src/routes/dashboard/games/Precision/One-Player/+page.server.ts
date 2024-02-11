import { User_Model } from '$lib/server/models';
import { getTimeThreshold } from '$lib/shared/utils';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async (event) => {
	const email = event.cookies.get('email');

	const user = await User_Model.findOne({ 'user.email': email });

	if (!user) {
		return { status: 400, error: new Error('User could not be found') };
	} else {
		const measurement_unit = user.user?.measurement_units;
		return { measurement_unit };
	}
};

const findUserByEmail = async (email: string | undefined) => {
	return await User_Model.findOne({ 'user.email': email });
};

const updateHighscore = (
	highscoreData: { value: number; lastUpdated: Date },
	periodKey: string,
	highscore: number,
	currentTime: Date
) => {
	const timeElapsed = currentTime.getTime() - new Date(highscoreData?.lastUpdated ?? 0).getTime();
	const timeThreshold = getTimeThreshold(periodKey);

	if ((highscoreData?.value ?? 0) < highscore || timeElapsed > timeThreshold) {
		highscoreData.value = highscore;
		highscoreData.lastUpdated = currentTime;
	}
};

const updateAllTimeHighscore = (
	allTime: { value: number; lastUpdated: Date },
	highscore: number,
	currentTime: Date
) => {
	console.log('Function running');
	console.log('Updating existing all-time high score');
	if ((allTime.value ?? 0) < highscore) {
		allTime.value = highscore;
		allTime.lastUpdated = currentTime;
		console.log('updated', allTime);
	}

	console.log(allTime);
};

export const actions: Actions = {
	get_add_highscore: async (event) => {
		const email = event.cookies.get('email');
		const data = await event.request.formData();
		const highscore = data.get('shots') as unknown as number;

		try {
			const user = await findUserByEmail(email);

			if (!user) {
				return {
					status: 404,
					error: 'User not found'
				};
			}

			const periods = ['daily', 'weekly', 'monthly', 'yearly'];
			const currentTime = new Date();

			if (user.one_player_precision_highscore) {
				for (const period of periods) {
					const periodKey = period as keyof typeof user.one_player_precision_highscore;
					const highscoreDataByPeriod = user.one_player_precision_highscore[periodKey];

					if (!highscoreDataByPeriod?.lastUpdated) {
						user.one_player_precision_highscore[periodKey] = {
							value: highscore,
							lastUpdated: currentTime
						};
					} else {
						updateHighscore(highscoreDataByPeriod, periodKey, highscore, currentTime);
					}
				}

				if (user.one_player_precision_highscore.all_time) {
					console.log('All Time Highscore defined');
					updateAllTimeHighscore(
						user.one_player_precision_highscore.all_time,
						highscore,
						currentTime
					);
				}

				await user.save();
			}

			return {
				status: 200,
				message: 'Highscore updated successfully'
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				error: error
			};
		}
	}
};
