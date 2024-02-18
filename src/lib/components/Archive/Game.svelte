<script lang="ts">
	// Importing the openGame function from the specified file
	import { openGame } from '$lib/scripts/Archive/openGame';
	// Importing the Dialog component from the specified file
	import Dialog from '../Global/Dialog.svelte';
	// Importing the FourWinningTable component from the specified file
	import FourWinningTable from './FourWinning_table.svelte';

	// Exporting the following variables as props
	export let name: string;
	export let date: string;
	export let id: string;
	export let teams: string;
	export let measurement_units: string;
	export let data: string;
</script>

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

<Dialog />

<style lang="sass">
    @import "$lib/scss/Archive/game.scss"
</style>
