connectModuleCodeEl.innerText = `<script src="/js/GetOnlineStats.js"></script>`;

exampleCodeInitEl.innerText = /*html*/ `<script>
	const getOnlineStats = new GetOnlineStats();

	getOnlineStats.init({
		roomId: '', // past room id here
		secretKey: '', // past secret key here
		needSocketIoImport: true, // if true, the io socket will be installed automatically
		callback: (data) => {
			const count = data.count;
			console.log('Online now: ' + count);
		}, // you can set callback for update data in element
	});
</script>
`;

function selectText(node) {
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn('Could not select text in node: Unsupported browser.');
	}
}

[...document.querySelectorAll('pre')].forEach((code) => {
	code.onclick = () => {
		selectText(code);
		navigator.clipboard.writeText(code.innerText);
	};
});
