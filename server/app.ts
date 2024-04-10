import dotenv from 'dotenv';
import { generate_server } from './server.js';
import { attach_sockets } from './sockets.js';

function init() {
	dotenv.config();
	const server = generate_server();
	attach_sockets(server);
}

init();
