/**
 * Connects to the MongoDB database using the provided connection URI.
 * @returns A Promise that resolves to a Mongoose Connection object.
 */
import { SECRET_MONGODB_USERDB_CONNECTION } from '$env/static/private';
import mongoose from 'mongoose';

const database_URI = SECRET_MONGODB_USERDB_CONNECTION;

export async function connect_to_db() {
	try {
		return mongoose.createConnection(database_URI);
	} catch (err) {
		console.log(err);
	}
}
