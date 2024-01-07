<script lang="ts">
  export let data: any;
</script>

<svelte:head>
  <title>Real Golf - Dashboard</title>
</svelte:head>

<main>
  <h2>Dashboard</h2>

  <p>
    <b>
      Welcome to "Real Golf" {data.name} - your ultimate destination for golf challenges!
      Discover "4 Winning", "Exact", and "Precision" - captivating golf experiences
      tested with trainers.
    </b>
  </p>

  <p class="success">The navigation can be found in the dropdown menu.</p>

  <h3>But most important enjoy the games and have fun!</h3>

  <div class="card">
    <h2>One Player Precision Highscore</h2>
    {#if data.daily.lastUpdated == null}
      <p>
        Please first play a round of <a
          href="/dashboard/games/Precision/One-Player">One Player Precision</a
        > to get a Highscore before it can be displayed here.
      </p>
    {:else}
      <ul>
        <li>
          <b>Today's</b> highscore is: {data.daily.value}, last updated on{" "}
          {new Date(data.daily.lastUpdated).toLocaleDateString()}.
        </li>
        <li>
          <b>This Week's</b> highscore is: {data.weekly.value}, last updated on{" "}
          {new Date(data.weekly.lastUpdated).toLocaleDateString()}.
        </li>
        <li>
          <b>This Month's</b> highscore is: {data.monthly.value}, last updated
          on{" "}
          {new Date(data.monthly.lastUpdated).toLocaleDateString()}.
        </li>
        <li>
          <b>This Year's</b> highscore is: {data.yearly.value}, last updated on{" "}
          {new Date(data.yearly.lastUpdated).toLocaleDateString()}.
        </li>
      </ul>
      <p>
        Your all-time highscore is <b>{data.all_time.value}</b>, last exceeded
        on{" "}
        {new Date(data.all_time.lastUpdated).toLocaleDateString()}.
      </p>
    {/if}
  </div>
</main>

<style lang="scss">
  .card {
    border: 2px solid var(--border-color);
    margin: 10px 20px;
    padding: 15px;
    box-shadow: 2px 2px 4px var(--shadow-color);

    ul {
      margin-left: 1rem;
    }
  }
</style>
