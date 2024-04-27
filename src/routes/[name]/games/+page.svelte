<script lang="ts">
	import { onMount } from 'svelte';
	import { _, isLoading } from 'svelte-i18n';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	export let data: PageData;

	// eslint-disable-next-line
	let user_games: games[] | any[] = [];

	onMount(() => {
		if (data.games) {
			user_games = data.games.reverse();
			console.log(user_games);
		}
	});

	console.log(user_games);
	let show_confirmation = false;

	function extractDomain(url: string): string | null {
		try {
			const parsedUrl = new URL(url);
			// Check if the port is specified, and include it in the domain
			const domainWithPort = parsedUrl.port
				? `${parsedUrl.hostname}:${parsedUrl.port}`
				: parsedUrl.hostname;
			return domainWithPort;
		} catch (error) {
			// URL parsing failed
			return null;
		}
	}

	async function shareGame(id: string) {
		const user = data.user_username;
		const domain = extractDomain(window.location.href);

		const url = `${domain}/${user}/games/${id}`;

		console.log(url);

		await window.navigator.clipboard.writeText(url);
		show_confirmation = true;
		setTimeout(() => {
			show_confirmation = false;
		}, 1500);
	}

	function openGame(id: string) {
		const user = data.user_username;

		const url = `/${user}/games/${id}`;
		window.location.href = url;
	}
</script>

<svelte:head>
	<title>{data.user_username} - {$_('games')}</title>
</svelte:head>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<h2>
		{$_('public_profile_games_by', {
			values: {
				username: data.user_username
			}
		})}:
	</h2>

	{#if show_confirmation}
		<div class="success" transition:slide={{ duration: 150 }}>{$_("copy_successful")}</div>
	{/if}

	<div class="user_games">
		{#if user_games}
			{#if user_games.length > 0}
				{#each user_games as { name, teams, data, date, id }}
					<div class="games">
						<p>{name}</p>
						<p>{teams}</p>
						<p>
							{$_("date_of_play")}: {new Date(date).toLocaleDateString()}
						</p>
						<p>{data}</p>
						<button on:click={() => shareGame(id)}>{$_("share_game")}</button>
						<button on:click={() => openGame(id)}>{$_("open_game")}</button>
					</div>
				{/each}
			{:else}
				<p class="error">{$_("no_games_found_for_user")}</p>
			{/if}
		{/if}
	</div>
{/if}

<style lang="scss">
	.user_games {
		width: 80vw;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.games {
		margin: 10px;
		padding: 10px;
		border: 1px solid #ccc;
	}
</style>
