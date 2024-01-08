<script lang="ts">
  import FourWinningTable from "$lib/components/FourWinning_table.svelte";
  import { onMount } from "svelte";

  export let data;

  let user_games = data.games;

  let hasRedirected = false;

  onMount(() => {
    const correctCasedUrl = `/${data.user_username}`;

    if (data.user_username == undefined) return;
    if (!hasRedirected && window.location.pathname !== correctCasedUrl) {
      window.location.href = correctCasedUrl;
      hasRedirected = true;
    }
  });
</script>

<svelte:head>
  <title>{data.user_username} ({data.user_username})</title>
</svelte:head>

<div class="vcard-names">
  <span class="vcard-fullname">{data.user_username}</span>
  <br />
  <span class="vcard-nickname">{data.user_name}</span>
</div>

{#if data.user_registration_date}
  <p>
    {data.user_username} joined RealGolf.Games on the {data.user_registration_date.toLocaleDateString()}
    and his / her last login was on the {data.user_last_login_date?.toLocaleDateString()}
  </p>
{/if}

<p>
  {user_games?.length === 1
    ? "He/She has 1 saved game."
    : `He/She has ${user_games?.length} saved games.`}
</p>

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
  .vcard-names {
    margin: 3rem;
    line-height: 1;

    .vcard-fullname {
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.25;
    }

    .vcard-nickname {
      line-height: 24px;
      color: grey !important;
    }
  }

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
