let roomsData;
if (localStorage.myRooms) {
	roomsData = JSON.parse(localStorage.myRooms);
	render();
} else roomsData = [];

function save() {
	localStorage.myRooms = JSON.stringify(roomsData);
}

function render() {
	myRoomsList.innerHTML = '';
	roomsData.reverse().forEach((proj) => {
		myRoomsList.innerHTML += /*html*/ `
			<details>
				<summary>${proj.projectName}</summary>
				<p>
					Room ID: ${proj.id}<br>
					Secret key: ${proj.secret}
				</p>
			</details>
		`;
	});
}

createBtn.onclick = () => {
	const projectName = prompt('Type project name:');
	if (!projectName) return;

	fetch('/api/generate-new-room', {
		method: 'POST',
		body: JSON.stringify({ projectName }),
	})
		.then((resp) => resp.json())
		.then((data) => {
			const { id, secret } = data;

			roomsData.push({
				projectName,
				id,
				secret,
			});

			save();
			render();
		});
};
