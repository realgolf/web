import { SECRET_MONGODB_COURSEDB_CONNECTION } from '$env/static/private';
import mongoose from 'mongoose';

const database_URI = SECRET_MONGODB_COURSEDB_CONNECTION;

export async function connect_to_db() {
	try {
		return mongoose.createConnection(database_URI);
	} catch (err) {
		console.log(err);
	}
}