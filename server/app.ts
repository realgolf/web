import dotenv from 'dotenv';
import { connect_to_db, disconnect_from_db } from './db.js';
import { generate_server } from './server.js';
import { handle_sockets } from './sockets.js';
import { deleteInactiveUsers } from './users.js';

async function init() {
	dotenv.config();
	const server = generate_server();
	handle_sockets(server);
	await connect_to_db();
	await deleteInactiveUsers();
	await disconnect_from_db();
}

init();
