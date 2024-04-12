import type { IncomingMessage, Server, ServerResponse } from 'http';
import { Server as ioServer } from 'socket.io';
import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	user_chat
} from '../src/lib/types/chat';
import { handle_disconnection } from './chat/disconnection.js';
import { handle_message } from './chat/message.js';
import { handle_name } from './chat/name.js';

/**
 * Handles the sockets and events.
 * @param server
 */
export function handle_sockets(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
	const chat_users: user_chat[] = [];

	const io = new ioServer<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(server);

	/**
	 * Handles a socket.io connection.
	 */
	io.on('connection', (socket) => {
		socket.on('name', async (name) => {
			handle_name(socket, name, io, chat_users);
		});
		socket.on('message', (message) => {
			handle_message(message, io);
		});
		socket.on('disconnect', () => {
			handle_disconnection(socket, chat_users, io);
		});
	});
}
