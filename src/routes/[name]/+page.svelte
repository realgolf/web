<script lang="ts">

	import ErrorPage from '$lib/components/Public_Profile/Error_Page.svelte';
	import Info from '$lib/components/Public_Profile/Info.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let hasRedirected = false;

	let path: string;

	onMount(() => {
		path = location.pathname;
		const correctCasedUrl = `/${data.user_username}`;

		if (data.user_username == undefined) return;
		if (!hasRedirected && window.location.pathname !== correctCasedUrl) {
			window.location.href = correctCasedUrl;
			hasRedirected = true;
		}
	});
</script>

<svelte:head>
	{#if data.user_username == undefined}
		<title>404 - User/Page Not Found</title>
	{:else}
		<title>{data.user_username} ({data.user_name})</title>
	{/if}
</svelte:head>

{#if data.user_username == undefined}
	<ErrorPage bind:path />
{:else}
	<Info {data} />
{/if}
