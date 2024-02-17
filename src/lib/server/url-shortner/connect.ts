import { SECRET_MONGODB_SHORTURLDB_CONNECTION } from '$env/static/private';
import mongoose from 'mongoose';

export async function connect_to_db() {
	try {
		return mongoose.createConnection(SECRET_MONGODB_SHORTURLDB_CONNECTION);
	} catch (err) {
		console.log(err);
	}
}
