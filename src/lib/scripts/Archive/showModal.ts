export function showModal(
	message: string,
	yesCallback: () => void,
	saveCallback: () => void,
	noCallback: () => void
) {
	const modal = document.getElementById('confirmationModal');
	const textElement = document.getElementById('confirmationText');
	const yesBtn = document.getElementById('yesBtn');
	const saveBtn = document.getElementById('saveBtn');
	const noBtn = document.getElementById('noBtn');

	if (modal && textElement && yesBtn && saveBtn && noBtn) {
		textElement.innerHTML = message;

		modal.style.display = 'block';

		yesBtn.onclick = () => {
			modal.style.display = 'none';
			yesCallback();
		};

		saveBtn.onclick = () => {
			modal.style.display = 'none';
			saveCallback();
		};

		noBtn.onclick = () => {
			modal.style.display = 'none';
			noCallback();
		};
	}
}
