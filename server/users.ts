import { User_Model } from './models.js';

// Function to delete inactive users
export async function deleteInactiveUsers() {
	const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

	try {
		const result = await User_Model.deleteMany({
			'user.last_login_date': { $lt: one_year_ago }
		});

		if (result) {
			console.info(`Deleted ${result.deletedCount} old documents`);
		}
	} catch (err) {
		console.error('Could not purge old documents');
		console.error(err);
	}
}
