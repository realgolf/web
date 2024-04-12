import { Socket, Server as ioServer } from 'socket.io';
import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	user_chat
} from '../../src/lib/types/chat';

/**
 * Handles the event if a user disconnects.
 * @param socket
 */
export function handle_disconnection(
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	chat_users: user_chat[],
	io: ioServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
) {
	chat_users = chat_users.filter((user) => user.id != socket.id);
	io.emit('users', chat_users);
	io.emit('message', {
		author: '',
		text: `🏃‍♀️ ${socket.data.name} has left the chat`,
		bot: true
	});
}
