<script lang="ts">
	import Achievements from '$lib/components/public_profile/Achievements.svelte';
	import Badges from '$lib/components/public_profile/Badges.svelte';
	import Bio from '$lib/components/public_profile/Bio-Socials.svelte';
	import ErrorPage from '$lib/components/public_profile/Error_Page.svelte';
	import Names from '$lib/components/public_profile/Names.svelte';
	import OnePlayerPrecisionHighscore from '$lib/components/public_profile/One_Player__Precision_Highscore.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let user_games = data.games;

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
	<div class="info">
		<Names {data} />
		<Bio {data} />
		{#if data.badges && data.badges.length > 0}
			<Badges {data} />
		{/if}
		{#if data.achievements && data.achievements.length > 0}
			<Achievements {data} />
		{/if}

		{#if data.user_registration_date}
			<div class="registration_date">
				<p>
					{data.user_username} joined RealGolf.Games on {data.user_registration_date.toLocaleDateString()}.
				</p>
			</div>
		{/if}

		<div class="games">
			<p>
				{user_games?.length === 1
					? `They have 1 saved game.`
					: `They have ${user_games?.length} saved games.`}

				You can find all of their games
				<a href={`/${data.user_username}/games`}>here</a>.
			</p>
		</div>

		<OnePlayerPrecisionHighscore {data} />
	</div>
{/if}

<style lang="scss">
	.info {
		margin: 3rem;
	}
</style>
