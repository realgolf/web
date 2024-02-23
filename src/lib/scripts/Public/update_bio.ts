import { User_Model } from '$lib/server/user/models';

export async function updateBio(email: string, bio: string | undefined) {
	const user = await User_Model?.findOne({ 'user.email': email });
	if (user?.user) {
		if (user.user.bio !== bio) {
			user.user.bio = bio;
		} else {
			return {
				status: 500,
				error: "The Bio didn't get modified!"
			};
		}
		await user.save();
	}
}
