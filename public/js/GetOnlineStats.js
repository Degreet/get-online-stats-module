class GetOnlineStats {
	init(params) {
		const { roomId, secretKey, needSocketIoImport, callback } = params;
		if (!roomId || !secretKey) return console.error('Not enough data');

		if (needSocketIoImport) {
			const src = `https://cdn.socket.io/4.0.2/socket.io.min.js`;
			const integrity = `sha384-Bkt72xz1toXkj/oEiOgkQwWKbvNYxTNWMqdon3ejP6gwq53zSo48nW5xACmeDV0F`;

			const script = document.createElement('script');
			script.src = src;
			script.integrity = integrity;
			script.setAttribute('crossorigin', 'anonymous');
			script.onload = next;

			document.head.append(script);
		} else next();

		function next() {
			const url = 'https://get-online-stats-module.herokuapp.com/';
			const socket = io.connect(url);
			socket.emit('join', { id: roomId, secret: secretKey });

			socket.on('join error', (msg) => {
				console.error(msg);
			});

			socket.on('update online counter', (data) => {
				if (callback && typeof callback === 'function') {
					callback(data);
				} else {
					console.log(data);
				}
			});
		}
	}
}
