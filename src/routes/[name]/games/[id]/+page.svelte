<script lang="ts">
	import FourWinningTable from '$lib/components/Archive/FourWinning_table.svelte';

	export let data;
</script>

<svelte:head>
	{#if data.game}
		<title>{data.game.name} from {data.param_name}</title>
	{:else}
		<title>404- Game not found</title>
	{/if}
</svelte:head>

<h1>
	{#if data.game}
		{data.game.name} saved on the {new Date(data.game.date).toLocaleDateString()}
	{:else}
		404 - Game not found for this User.
	{/if}
</h1>

{#if data.game}
	<p class="data">{data.game.data}</p>

	{#if data.game.teams.includes('4winning_')}
		<FourWinningTable measurement_units="yards" data={data.game.data} />
	{/if}
{/if}
