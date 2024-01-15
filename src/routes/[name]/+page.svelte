<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let user_games = data.games;

  let hasRedirected = false;
  let editing = false;

  onMount(() => {
    const correctCasedUrl = `/${data.user_username}`;

    if (data.user_username == undefined) return;
    if (!hasRedirected && window.location.pathname !== correctCasedUrl) {
      window.location.href = correctCasedUrl;
      hasRedirected = true;
    }
  });

  function handleCancel(event: { preventDefault: () => void }) {
    event.preventDefault();
    editing = false;
  }
</script>

<svelte:head>
  <title>{data.user_username} ({data.user_name})</title>
</svelte:head>

<div class="vcard-names">
  <span class="vcard-nickname">{data.user_username}</span>
  <br />
  <span class="vcard-fullname">{data.user_name}</span>

  <div class="bio">
    {#if editing}
      <form action="?/edit_profile" method="POST">
        <label for="bio">Bio</label>
        <textarea bind:value={data.user_bio} name="bio" id="bio" rows="3" />
        <br />
        <button type="submit">Save</button>
        <button type="button" on:click={handleCancel}>Cancel</button>
      </form>
    {:else if data.sameUser}
      <p>{data.user_bio}</p>
      <br />
      <button on:click={() => (editing = true)}>Edit profile</button>
    {:else}
      <p>{data.user_bio}</p>
    {/if}
  </div>
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

<div id="one_player_precision">
  <h2>One Player Precision Highscore</h2>
  {#if data.user_daily?.lastUpdated === null}
    <p>{data.user_username} has never played One Player Precision</p>
  {:else}
    <ul>
      <li>
        <b>Today's</b> highscore is: {data.user_daily?.value}, last updated on{" "}
        {data.user_daily?.lastUpdated &&
          new Date(data.user_daily.lastUpdated).toLocaleDateString()}.
      </li>
      <li>
        <b>This Week's</b> highscore is: {data.user_weekly?.value}, last updated
        on{" "}
        {data.user_weekly?.lastUpdated &&
          new Date(data.user_weekly.lastUpdated).toLocaleDateString()}.
      </li>
      <li>
        <b>This Month's</b> highscore is: {data.user_monthly?.value}, last
        updated on{" "}
        {data.user_monthly?.lastUpdated &&
          new Date(data.user_monthly.lastUpdated).toLocaleDateString()}.
      </li>
      <li>
        <b>This Year's</b> highscore is: {data.user_yearly?.value}, last updated
        on{" "}
        {data.user_yearly?.lastUpdated &&
          new Date(data.user_yearly.lastUpdated).toLocaleDateString()}.
      </li>
    </ul>
    <p>
      {data.user_username}'s' all-time highscore is
      <b>{data.user_all_time?.value}</b>, last exceeded on{" "}
      {data.user_all_time?.lastUpdated &&
        new Date(data.user_all_time.lastUpdated).toLocaleDateString()}.
    </p>
  {/if}
</div>

<style lang="scss">
  .vcard-names {
    margin: 3rem;
    line-height: 1;

    .vcard-fullname {
      line-height: 24px;
      color: grey !important;
    }

    .vcard-nickname {
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.25;
    }

    .bio {
      padding: 0.5rem 0;
      max-width: 296px;
    }
  }

  #one_player_precision {
    background-color: var(--nav-color);
    margin-left: 20px;
    border: 1px solid var(--border-color);
    border-radius: 5px;

    & > * {
      padding: 20px;
    }

    ul {
      margin-left: 20px;
      list-style-type: square;
    }
  }

  textarea {
    background-color: var(--background-color);
    color: var(--font-color);
    font-size: var(--medium-font);
    width: 100%;
  }
</style>
