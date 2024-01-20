<script lang="ts">
  import FourWinningTable from "$lib/components/FourWinning_table.svelte";
  
  export let data;
</script>

<svelte:head>
  <title>{data.game.name} from {data.param_name}</title>
</svelte:head>

<h1>
  {data.game.name} saved on the {new Date(data.game.date).toLocaleDateString()}
</h1>

<p class="data">{data.game.data}</p>

{#if data.game.teams.includes("4winning_")}
     <FourWinningTable measurement_units="yards" data={data.game.data}></FourWinningTable>
{/if}