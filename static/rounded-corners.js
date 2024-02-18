const saved_rounded_corners = localStorage.getItem('rounded-corners');
if (saved_rounded_corners) {
	document.body.setAttribute('data-rounded', saved_rounded_corners);
} else {
	const rounded = 'true';
	document.body.setAttribute('data-rounded', rounded);
	localStorage.setItem('rounded-corners', rounded);
}
