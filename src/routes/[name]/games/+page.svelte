<script>
  import FourWinningTable from "$lib/components/FourWinning_table.svelte";
  export let data;

  let user_games = data.games;
</script>

<div class="user_games">
  <h2>Games played by {data.user_username}:</h2>
  {#if user_games}
    {#if user_games.length > 0}
      {#each user_games as { name, teams, data, id, date }}
        <div class="games">
          <p>{name}</p>
          <p>{teams}</p>
          <p>
            This game got created at the {new Date(date).toLocaleDateString()}
          </p>
          {#if teams.includes("4winning_")}
            <FourWinningTable measurement_units="yards" {data} />
          {/if}
        </div>
      {/each}
    {:else}
      <p class="error">No games found for this user.</p>
    {/if}
  {/if}
</div>

<style lang="scss">
  .games {
    background-color: var(--nav-color);
    width: 90%;
    padding: 50px 50px;
    border-radius: 5px;
    border: 3px solid var(--border-color);
    margin-right: auto;
    margin-bottom: 20px;
  }
</style>
