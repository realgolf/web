<script>
  import FourWinningTable from "$lib/components/FourWinning_table.svelte";
  export let data;

  let user_games = data.games;
</script>

<h2>Games played by {data.user_username}:</h2>

<div class="user_games">
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
