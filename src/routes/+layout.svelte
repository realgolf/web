<script lang="ts">
	import LoadProgress from '$lib/components/LoadProgress.svelte';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import ScrollUp from '$lib/components/ScrollUp.svelte';
	import '$lib/scss/app.scss';
	import { onMount } from 'svelte';
	export let data;

	onMount(() => {
		let theme = data.theme as string;
		if (theme === undefined) {
			theme = 'system';
		}
		localStorage.setItem('theme', theme);

		let rounded_corners = data.rounded_corners as boolean;
		if (rounded_corners === undefined) {
			rounded_corners = true;
		}
		localStorage.setItem('rounded_corners', JSON.stringify(rounded_corners));

		const body = document.querySelector('body') as HTMLBodyElement;
		if (rounded_corners === undefined) {
			body.setAttribute('data-rounded-corners', 'true');
		} else {
			body.setAttribute('data-rounded-corners', JSON.stringify(rounded_corners));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo.PNG" />
</svelte:head>

<LoadProgress />
<ScrollUp />

<Nav auth={data.auth} username={data.username} />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 40rem;
		/* margin-inline: auto; */
		padding-inline: 1rem;

		@media screen and (max-width: 767px) {
			margin-bottom: 20px;
		}
	}
</style>
