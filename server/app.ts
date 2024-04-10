import dotenv from 'dotenv';
import { connect_to_db } from './mongodb.js';
import { generate_server } from './server.js';
import { attach_sockets } from './sockets.js';
import { purge_old_users } from './user.js';

async function init() {
	dotenv.config();
	const server = generate_server();
	attach_sockets(server);
	await connect_to_db();
	await purge_old_users();
}

init();
