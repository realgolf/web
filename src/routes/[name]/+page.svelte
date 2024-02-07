<script lang="ts">
	import Achievements from '$lib/components/public_profile/Achievements.svelte';
	import Badges from '$lib/components/public_profile/Badges.svelte';
	import Bio from '$lib/components/public_profile/Bio-Socials.svelte';
	import ErrorPage from '$lib/components/public_profile/Error_Page.svelte';
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
		<div class="vcard-names">
			<span class="vcard-nickname">{data.user_username}</span>
			<br />
			<span class="vcard-fullname">{data.user_name}</span>
		</div>
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

		<div id="one_player_precision">
			<h2>One Player Precision Highscore</h2>
			{#if data.user_daily?.lastUpdated === null}
				<p>{data.user_username} has never played One Player Precision</p>
			{:else}
				<ul>
					<li>
						<b>Today's</b> highscore is: {data.user_daily?.value}, last updated on{' '}
						{data.user_daily?.lastUpdated &&
							new Date(data.user_daily.lastUpdated).toLocaleDateString()}.
					</li>
					<li>
						<b>This Week's</b> highscore is: {data.user_weekly?.value}, last updated on{' '}
						{data.user_weekly?.lastUpdated &&
							new Date(data.user_weekly.lastUpdated).toLocaleDateString()}.
					</li>
					<li>
						<b>This Month's</b> highscore is: {data.user_monthly?.value}, last updated on{' '}
						{data.user_monthly?.lastUpdated &&
							new Date(data.user_monthly.lastUpdated).toLocaleDateString()}.
					</li>
					<li>
						<b>This Year's</b> highscore is: {data.user_yearly?.value}, last updated on{' '}
						{data.user_yearly?.lastUpdated &&
							new Date(data.user_yearly.lastUpdated).toLocaleDateString()}.
					</li>
				</ul>
				<p>
					{data.user_username}'s all-time highscore is
					<b>{data.user_all_time?.value}</b>, last exceeded on{' '}
					{data.user_all_time?.lastUpdated &&
						new Date(data.user_all_time.lastUpdated).toLocaleDateString()}.
				</p>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.info {
		margin: 3rem;
		.vcard-names {
			line-height: 1;

			.vcard-fullname {
				line-height: 24px;
				color: grey !important;
			}

			.vcard-nickname {
				font-size: 2rem;
				font-weight: 400;
				line-height: 1.25;
			}
		}

		#one_player_precision {
			background-color: var(--nav-color);
			margin-left: 20px;
			border: 1px solid var(--border-color);
			border-radius: 5px;

			& > * {
				padding: 20px;
			}

			ul {
				margin-left: 20px;
				list-style-type: square;
			}
		}
	}
</style>
