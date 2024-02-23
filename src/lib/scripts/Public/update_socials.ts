import { User_Model } from '$lib/server/user/models';

export async function updateSocials(email: string, socials_input_cleaned: string | undefined) {
	const user = await User_Model?.findOne({ 'user.email': email });
	if (user?.user && socials_input_cleaned) {
		const socials_array = socials_input_cleaned.split('\n').filter((social) => social.length > 0);

		user.user.socials = socials_array;
		await user.save();
	}
}
