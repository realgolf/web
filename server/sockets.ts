import type { IncomingMessage, Server, ServerResponse } from 'http';
import { Server as ioServer } from 'socket.io';
import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
	user_chat
} from '../src/lib/types/chat';

export function attach_sockets(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
	let chat_users: user_chat[] = [];

	const io = new ioServer<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(server);

	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('name', async (name) => {
			socket.data.name = name;

			io.emit('message', {
				author: '',
				text: `👋 ${name} has entered the chat`,
				bot: true
			});

			chat_users.push({ id: socket.id, name: name });
			io.emit('users', chat_users);
		});

		socket.on('message', (message) => {
			console.log('message:', message);
			io.emit('message', { ...message, bot: false });
		});

		socket.on('disconnect', () => {
			chat_users = chat_users.filter((user) => user.id != socket.id);
			io.emit('users', chat_users);
			io.emit('message', {
				author: '',
				text: `🏃‍♀️ ${socket.data.name} has left the chat`,
				bot: true
			});
		});
	});
}
