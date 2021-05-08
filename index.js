const express = require('express');
const randomstring = require('randomstring');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const rooms = [{ id: 'dJ2indsaoi', users: [], secret: 'SNiowqhnuwi' }];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, resp) => {
	resp.render('index');
});

app.get('/example', (req, resp) => {
	resp.render('example');
});

io.sockets.on('connection', (socket) => {
	let globalRoomId, globalUserId;

	socket.on('join', (data) => {
		const { id, secret } = data;
		const room = rooms.find((r) => r.id == id && r.secret == secret);
		if (!room) return socket.emit('join error', `Room not found`);

		const userId = randomstring.generate(7);
		globalUserId = userId;

		room.users.push({
			id: userId,
			socket,
		});

		socket.join(id);
		globalRoomId = id;

		io.to(id).emit('update online counter', {
			count: room.users.length,
		});
	});

	socket.on('disconnect', () => {
		if (globalRoomId) {
			const room = rooms.find((r) => r.id == globalRoomId);
			if (!room) return;

			const idx = room.users.findIndex((user) => user.id == globalUserId);
			if (idx >= 0) room.users.splice(idx, 1);

			socket.leave(globalRoomId);
			io.to(globalRoomId).emit('update online counter', {
				count: room.users.length,
			});
		}
	});
});

server.listen(port);
