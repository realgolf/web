/**
 * Connects to the MongoDB database using the provided connection URI.
 * @returns A Promise that resolves to a Mongoose Connection object.
 */
import { SECRET_MONGODB_USERDB_CONNECTION } from '$env/static/private';
import mongoose from 'mongoose';

const database_URI = SECRET_MONGODB_USERDB_CONNECTION;

const connection_options = {
	maxIdleTimeMS: 60000,
	maxPoolSize: 300
};

export async function connect_to_db() {
	try {
		return mongoose.connect(database_URI, connection_options);
	} catch (err) {
		console.log(err);
	}
}

export async function disconnect_from_db() {
	try {
		console.log('Disconnecting from the database...');
		return mongoose.disconnect();
	} catch (err) {
		console.log(err);
	}
}
