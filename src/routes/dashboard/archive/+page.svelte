<script lang="ts">
	import { enhance } from '$app/forms';
	import FourWinningTable from '$lib/components/FourWinning_table.svelte';
	import { applyFilters } from '$lib/scripts/Archive/applyFilters';
	import { fillLocalStorageAndRedirectUser } from '$lib/scripts/Archive/fillLocalStorageAndRedirectUser';
	import { saveLocalStorageGameInDB } from '$lib/scripts/Archive/saveLocalStorageGameInDB';
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
	let copyStatus: string | null = null;

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

	/**
	 * RECIEVE THE GAME FROM THE DATABASE AND OPEN IT IN THE CORRECT GAME
	 * @params {string} gameData - The data of the game.
	 * @params {string} teams - The team of the game.
	 */
	function openGame(gameData: string, teams: string) {
		let local_storage_game = localStorage.getItem(teams);

		if (local_storage_game == null) {
			fillLocalStorageAndRedirectUser(teams, gameData);
		} else {
			showModal(
				'<b>Oops!</b> Looks like your Storage is full. <br> Do you want to delete it?',
				() => {
					// Yes button callback
					localStorage.removeItem(teams);
					fillLocalStorageAndRedirectUser(teams, gameData);
				},
				() => {
					// Save the Game in the Database button callback
					saveLocalStorageGameInDB(teams);
					setTimeout(() => {
						fillLocalStorageAndRedirectUser(teams, gameData);
					}, 100);
				},
				() => {
					// No button callback
					// No further action
				}
			);
		}
	}

	/**
	 * DISPLAY A CONFIRMATION MODAL
	 * @param message
	 * @param yesCallback
	 * @param saveCallback
	 * @param noCallback
	 */
	function showModal(
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

	/**
	 * HIDE THE CONFIRMATION MODAL WHEN CLICKING OUTSIDE
	 */
	onMount(() => {
		window.onclick = (event) => {
			const modal = document.getElementById('confirmationModal');
			if (modal && event.target === modal) {
				modal.style.display = 'none';
			}
		};
	});

	let showMessage = true;

	/**
	 * AUTOMATICALLY HIDE THE MESSAGE AFTER 20 SECONDS
	 */
	setTimeout(() => {
		showMessage = false;
	}, 20000);

	function togglePreview() {
		const tablePreviews = document.getElementsByClassName('table_previews');

		for (const tablePreview of tablePreviews) {
			if (tablePreview instanceof HTMLElement) {
				tablePreview.style.display = tablePreview.style.display === 'none' ? 'block' : 'none';
			}
		}
	}
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

<div id="confirmationModal" class="modal">
	<div class="modal-content">
		<p class="success" id="confirmationText" />
		<button id="yesBtn">Yes</button>
		<button id="saveBtn">Save the Game in the Database</button>
		<button id="noBtn">No</button>
	</div>
</div>

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
	{#if copyStatus === 'success'}
		<p class="success">Copy successful</p>
	{:else if copyStatus === 'error'}
		<p class="error">Copy failed</p>
	{/if}
	{#each filteredGames as { name, teams, data, id, date }}
		<div class="game">
			<form action="?/rename" method="POST">
				<input
					type="text"
					name="name"
					id="name"
					class="headline"
					bind:value={name}
					aria-label="Name of the Game"
				/>
				<input class="hidden" type="text" name="id" value={id} />
				<button>Update Name</button>
			</form>
			<p>Created at the {new Date(date).toLocaleDateString()}</p>
			{#if teams.includes('4winning')}
				<div class="table_previews" style="display: none;">
					<FourWinningTable {measurement_units} {data} />
				</div>
				<p>{data}</p>
			{:else}
				<p>{data}</p>
			{/if}
			<button on:click={() => openGame(data, teams)}>Open Game</button>
			<form action="?/delete_game" method="POST" autocomplete="off">
				<input class="hidden" type="text" name="id" value={id} />
				<button>Delete Game</button>
			</form>
		</div>
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
	@import '$lib/scss/archive.scss';
</style>
