<script lang="ts">
  import {
    bronze_color,
    gold_color,
    platinum_color,
    silver_color,
  } from "$lib/scripts/achievement_color_codes.js";
  import { onMount } from "svelte";

  export let data;

  let user_games = data.games;

  let hasRedirected = false;
  let editing = false;
  let path: string;

  onMount(() => {
    path = location.pathname;
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

  let activeBadgeIndex: number | null;

  function handleBadgeClick(index: number) {
    activeBadgeIndex = index === activeBadgeIndex ? null : index;
  }

  let activeAchievementIndex: number | null;

  function handleAchievementClick(index: number) {
    console.log(activeAchievementIndex);
    activeAchievementIndex = index === activeAchievementIndex ? null : index;
  }
</script>

<svelte:head>
  {#if data.user_username == undefined}
    <title>404 - User/Page Not Found</title>
  {:else}
    <title>{data.user_username} ({data.user_name})</title>
  {/if}
</svelte:head>

{#if data.user_username == undefined}
  <div class="error-container">
    <h1 class="error">404 - User/Page Not Found!</h1>
    <p>
      We couldn't find the user or page for the path: <strong>{path}</strong>
    </p>
    <p>
      Please check the path for any errors, ensure it is correctly spelled, and
      try again.
    </p>
    <p>Go back to <a href="/">home</a>.</p>
  </div>
{:else}
  <div class="info">
    <div class="vcard-names">
      <span class="vcard-nickname">{data.user_username}</span>
      <br />
      <span class="vcard-fullname">{data.user_name}</span>
    </div>
    {#if data.user_bio}
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
    {/if}
    {#if data.badges && data.badges.length > 0}
      <div class="highlights">
        <h3>Highlights</h3>
        <div class="badges">
          {#each data.badges as badge, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <p
              style="border: 1px solid {badge.color}; width: max-content; border-radius: 24px; padding: 3px 5px; color: {badge.color}; margin: 3px 5px; font-size: var(--tiny-font);"
              on:click={() => handleBadgeClick(index)}
            >
              {badge.title.toUpperCase()}
            </p>
            {#if activeBadgeIndex === index}
              <div class="description">
                <p>{badge.description}</p>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
    {#if data.achievements && data.achievements.length > 0}
      <div class="achievements">
        <h3>Achievements</h3>
        {#each data.achievements as achievement, index}
          <div class="achievement">
            <div
              tabindex="0"
              role="button"
              class="heading"
              on:click={() => handleAchievementClick(index)}
              on:keydown={(event) => {
                if (event.key === " ") {
                  handleAchievementClick(index);
                }
              }}
            >
              <h4>
                {achievement.title}
              </h4>
              {#if achievement.is_unlocked.bronze_unlocked == true}
                <p class="tiers" style="background-color: {bronze_color};">
                  1x
                </p>
              {:else if achievement.is_unlocked.silver_unlocked == true}
                <p class="tiers" style="background-color: {silver_color};">
                  2x
                </p>
              {:else if achievement.is_unlocked.gold_unlocked == true}
                <p class="tiers" style="background-color: {gold_color};">3x</p>
              {:else if achievement.is_unlocked.platinum_unlocked == true}
                <p class="tiers" style="background-color: {platinum_color};">
                  4x
                </p>
              {/if}
            </div>
            {#if activeAchievementIndex == index}
              <div class="description">
                <p>{achievement.description}</p>
              </div>
              <div class="history">
                <p>History</p>
                <ul>
                  <li>
                    {new Date(
                      achievement.history.first_unlocked_date
                    ).toLocaleDateString()}
                    -
                    <a
                      href="/{data.user_username}/games/{achievement.history
                        .first_unlocked_game}"
                      >{achievement.history.first_unlocked_game}</a
                    >
                  </li>
                </ul>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}

    {#if data.user_registration_date}
      <div class="rehistration_date">
        <p>
          {data.user_username} joined RealGolf.Games on {data.user_registration_date.toLocaleDateString()}.
        </p>
      </div>
    {/if}

    <div class="games">
      <p>
        {user_games?.length === 1
          ? `They have 1 saved game.`
          : `They have ${user_games?.length} saved games.`}

        You can find all of their games
        <a href={`/${data.user_username}/games`}>here</a>.
      </p>
    </div>

    <div id="one_player_precision">
      <h2>One Player Precision Highscore</h2>
      {#if data.user_daily?.lastUpdated === null}
        <p>{data.user_username} has never played One Player Precision</p>
      {:else}
        <ul>
          <li>
            <b>Today's</b> highscore is: {data.user_daily?.value}, last updated
            on{" "}
            {data.user_daily?.lastUpdated &&
              new Date(data.user_daily.lastUpdated).toLocaleDateString()}.
          </li>
          <li>
            <b>This Week's</b> highscore is: {data.user_weekly?.value}, last
            updated on{" "}
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
            <b>This Year's</b> highscore is: {data.user_yearly?.value}, last
            updated on{" "}
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
  </div>
{/if}

<style lang="scss">
  .info {
    margin: 3rem;
    .vcard-names {
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

    .highlights {
      margin-top: 20px;
      .badges {
        margin-top: 10px;
        display: flex;
        flex-direction: row;

        .description {
          position: absolute;
          margin-top: 30px;
          background-color: var(--nav-color);
          border: 1px solid var(--border-color);
          width: 260px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .achievements {
      margin-top: 20px;

      h3 {
        margin-bottom: 10px;
      }

      .achievement {
        max-width: 20rem;
        padding: 5px 5px;
        border: 1px solid var(--border-color);

        .heading {
          display: flex;
          flex-direction: row;

          &:focus {
            outline: none;
          }

          h4 {
            height: max-content;
          }

          h4,
          .tiers {
            display: flex;
            justify-content: center;
            align-items: center; /* Align items in the cross-axis */
          }

          .tiers {
            max-width: max-content;
            color: black;
            padding: 3px 10px;
            border-radius: 2em;
            width: 100%;
            margin-left: 4rem;
            margin-bottom: 0 !important;
          }
        }

        .history {
          padding: 0rem 1rem;

          ul {
            padding: 0rem 1rem;
          }
        }
      }
    }
  }
</style>
