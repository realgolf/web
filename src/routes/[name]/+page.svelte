<script lang="ts">
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
    {data.user_username} joined RealGolf.Games on {data.user_registration_date.toLocaleDateString()}.
  </p>
{/if}

<p>
  {user_games?.length === 1
    ? `They have 1 saved game.`
    : `They have ${user_games?.length} saved games.`}

  You can find all of their games
  <a href={`/${data.user_username}/games`}>here</a>.
</p>

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
</style>
