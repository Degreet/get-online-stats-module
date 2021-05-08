const getOnlineStats = new GetOnlineStats();

getOnlineStats.init({
	roomId: 'dJ2indsaoi',
	secretKey: 'SNiowqhnuwi',
	needSocketIoImport: true,
	callback: ({ count }) => {
		onlineCountEl.innerText = count;
	},
});
