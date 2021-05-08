const getOnlineStats = new GetOnlineStats(true);

getOnlineStats.init({
	roomId: 'dJ2indsaoi',
	secretKey: 'SNiowqhnuwi',
	needSocketIoImport: true,
	callback: ({ count }) => {
		onlineCountEl.innerText = count;
	},
});
