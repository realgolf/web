<script lang="ts">
	import { enhance } from '$app/forms';
	import Game from '$lib/components/Archive/Game.svelte';
	import { applyFilters } from '$lib/scripts/Archive/applyFilters';
	import { togglePreview } from '$lib/scripts/Archive/togglePreview';
	import type { Data } from '$lib/scripts/Archive/types';
	import { faEye } from '@fortawesome/free-regular-svg-icons';
	import { afterUpdate, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { teams } from './teams';

	/**
	 * REACTIVE DATA
	 */
	export let data: Data;
	export let form;

	let measurement_units: string = data.measurement_units;

	/**
	 * STATE
	 */
	let selectedTeam = '';
	let searchTerm = '';
	// eslint-disable-next-line
	let filteredGames: games[] | any[] = [];

	// ON COMPONENT MOUNT
	onMount(() => {
		filteredGames = data.games;
	});

	/**
	 * APPLY FILTERS ON EVERY UPDATE
	 */
	afterUpdate(() => {
		filteredGames = applyFilters(searchTerm, filteredGames, data, selectedTeam);
	});

	/**
	 * HANDLE TEAM CHANGE
	 */
	function handleTeamChange() {
		filteredGames = applyFilters(searchTerm, filteredGames, data, selectedTeam);
	}

	let showMessage = true;

	/**
	 * AUTOMATICALLY HIDE THE MESSAGE AFTER 20 SECONDS
	 */
	setTimeout(() => {
		showMessage = false;
	}, 20000);
</script>

<svelte:head>
	<title>Real Golf - Archive</title>
</svelte:head>

<h1>Archive</h1>

<h2>You have saved: {data.games.length} games in the database.</h2>

<form action="?/delete_all" method="POST" autocomplete="off">
	<button>Delete All</button>
</form>
<button title="Toggle Game Preview" on:click={togglePreview}><Fa icon={faEye} /></button>

{#if showMessage == true && form?.message}
	<p class="success">{form?.message}</p>
{/if}

{#if showMessage == true && form?.error}
	<p class="error">{form?.error}</p>
{/if}

<label for="search">Search a game by name or date:</label>
<input type="search" id="search" bind:value={searchTerm} />
<p class="error">
	You can search by dates by the following terms: DD/MM/YYYY or just by Year, Month or Day, to get
	all values with this parameters
</p>

<label for="teamSelect">Select a Team:</label>
<select id="teamSelect" bind:value={selectedTeam} on:change={handleTeamChange}>
	<option value="">All Teams</option>
	{#each teams as team}
		<option value={team.teams}>{team.name}</option>
	{/each}
</select>

{#if filteredGames.length > 0}
	{#each filteredGames as { name, teams, data, id, date }}
		<Game {name} {teams} {data} {id} {date} {measurement_units} />
	{/each}
{:else}
	<p class="error">No games found for this search.</p>
{/if}

<form
	use:enhance
	action="?/saveLocalStorageGameInDB"
	method="POST"
	id="saveLocalStorageToDB"
	style="display: none;"
>
	<input type="text" name="team" id="team_LStoDB" />
	<input type="text" name="name" id="name_LStoDB" />
	<input type="text" name="localStorageData" id="localStorageData_LStoDB" />
</form>

<style lang="scss">
	@import '$lib/scss/Archive/main.scss';
</style>
