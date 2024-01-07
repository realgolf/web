<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
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
</main>

<style lang="scss">
  .modi {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90vw;
  }

  .modis {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: left;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
