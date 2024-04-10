import { User_Model } from './user_model.js';

/**
 * Deletes all users older than one year.
 * @returns {Promise<void>}
 */
export async function purge_old_users() {
	const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
	try {
		const result = await User_Model?.deleteMany({
			'user.last_login_date': { $lt: one_year_ago }
		});
		console.info(`Deleted ${result?.deletedCount} old users`);
	} catch (err) {
		console.error('Could not purge old users');
		console.error(err);
	}
}
