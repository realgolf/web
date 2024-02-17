import { Course_Model } from '$lib/server/courses/models';
import { User_Model } from '$lib/server/user/models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const courses = await Course_Model?.find({});
	const users = await User_Model?.find({});
	console.log(courses);
	console.log(users);
};
