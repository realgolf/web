import express from 'express';
import { handler } from './build/handler.js';
import { attach_sockets } from './sockets.js';

const PORT = 3000;
const app = express();

const server = app.listen(PORT, () => {
	console.log('server is listening on port', PORT);
});

app.use(handler);

console.log('attaching sockets');
attach_sockets(server);
console.log('sockets attached');
