const saved_animation_time = localStorage.getItem('animation-time');

if (saved_animation_time) {
	document.body.setAttribute('data-animation-time', saved_animation_time);
} else {
	const animation_time = '0.5';
	document.body.setAttribute('data-animation-time', animation_time);
	localStorage.setItem('animation-time', animation_time);
}
