import { User_Model } from '$lib/server/user/models';

export async function editStatus(email: string, status_text: string, busy: boolean) {
	const user = await User_Model?.findOne({ 'user.email': email });

	if (user?.user?.status) {
		user.user.status.text = status_text;
		user.user.status.busy = busy;
		await user.save();
	}
}
