const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, resp) => {
	resp.render('index');
});

io.sockets.on('connection', (socket) => {
	console.log(`New connection: ${socket}`);

	socket.on('disconnect', () => {
		console.log(`Leave connection: ${socket}`);
	});
});

server.listen(port);
