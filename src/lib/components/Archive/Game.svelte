<script lang="ts">
	// Importing the openGame function from the specified file
	import { openGame } from '$lib/scripts/Archive/openGame';
	// Importing the Dialog component from the specified file
	import { _ } from "svelte-i18n";
	import Dialog from '../Global/Dialog.svelte';
	
	// Exporting the following variables as props
	export let name: string;
	export let date: string;
	export let id: string;
	export let teams: string;
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
		<button>{$_("update_name")}</button>
	</form>
	<p>{$_("created_at", {values: {date: new Date(date).toLocaleDateString()}})}</p>
	{#if teams.includes('4winning')}
		<p>{data}</p>
	{:else}
		<p>{data}</p>
	{/if}
	<button on:click={() => openGame(data, teams)}>{$_("open_game")}</button>
	<form action="?/delete_game" method="POST" autocomplete="off">
		<input class="hidden" type="text" name="id" value={id} />
		<button>{$_("delete_game")}</button>
	</form>
</div>

<Dialog />

<style lang="sass">
    @import "$lib/scss/Archive/game.scss"
</style>
