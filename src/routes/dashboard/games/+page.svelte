<script lang="ts">
  import { enhance } from "$app/forms";
  import { faEye } from "@fortawesome/free-regular-svg-icons";
  import { afterUpdate, onMount } from "svelte";
  import Fa from "svelte-fa";
  import type { ActionData } from "./$types.js";
  import { teams } from "./teams";
  export let data;
  export let form: ActionData;

  let selectedTeam = "";
  let searchTerm = "";
  let filteredGames: string | any[] = [];

  onMount(() => {
    filteredGames = data.games;
  });

  // Funktion zum Filtern von Spielen basierend auf Suchbegriff und ausgewähltem Team
  function applyFilters(searchTerm: string) {
    if (searchTerm !== "") {
      filteredGames = data.games.filter(
        (game: { name: string | any[]; date: string | any[] }) => {
          return (
            game.name.includes(searchTerm) ||
            new Date(game.date as string)
              .toLocaleDateString()
              .includes(searchTerm)
          );
        }
      );
    } else if (selectedTeam !== "") {
      filteredGames = data.games.filter(
        (game: { teams: string }) => game.teams === selectedTeam
      );
    } else {
      filteredGames = data.games; // Keine Filter, zeige alle Spiele
    }
  }

  // Ereignishandler für die Änderung des ausgewählten Teams
  function handleTeamChange() {
    applyFilters(searchTerm); // Filter zurücksetzen
  }

  // Nach dem Update, die Filter anwenden
  afterUpdate(() => {
    applyFilters(searchTerm);
  });

  let copyStatus: string | null = null;

  function redirect(path: string) {
    window.location.href = path;
  }

  function openGame(gameData: string, teams: string) {
    let local_storage_game = localStorage.getItem(teams);

    if (local_storage_game == null) {
      fillLocalStorageAndRedirectUser(teams, gameData);
    } else {
      const decision = confirm(
        "Do you want to delete your current localStorage?"
      );

      if (decision == true) {
        localStorage.removeItem(teams);
        fillLocalStorageAndRedirectUser(teams, gameData);
      } else {
        const decision2 = confirm(
          "Do you want to proceed without saving the game?"
        );

        if (decision2 == true) {
          saveLocalStorageGameInDB(teams);
          fillLocalStorageAndRedirectUser(teams, gameData);
        } else {
        }
      }
    }
  }

  function fillLocalStorageAndRedirectUser(teams: string, gameData: string) {
    localStorage.setItem(teams, gameData);
    if (teams == "4winning_2_teams") {
      redirect("/dashboard/modi/4Winning/Two-Players");
    } else if (teams == "4winning_3_teams") {
      redirect("/dashboard/modi/4Winning/Three-Players");
    } else if (teams == "4winning_4_teams") {
      redirect("/dashboard/modi/4Winning/Four-Players");
    } else if (teams == "exact_2_teams") {
      redirect("/dashboard/modi/Exact/Two-Players");
    } else if ((teams = "exact_3_teams")) {
      redirect("/dashboard/modi/Exact/Three-Players");
    } else if ((teams = "exact_4_teams")) {
      redirect("/dashboard/modi/Exact/Four-Players");
    }
  }

  function asignNameToTeam(teams: string) {
    let name: string;

    if (teams === "4winning_2_teams") {
      name = "4 Winning 2 Teams";
    } else if (teams === "4winning_3_teams") {
      name = "4 Winning 3 Teams";
    } else if (teams === "4winning_4_teams") {
      name = "4 Winning 4 Teams";
    } else if (teams === "exact_2_teams") {
      name = "Exact 2 Teams";
    } else if (teams === "exact_3_teams") {
      name = "Exact 3 Teams";
    } else if (teams === "exact_4_teams") {
      name = "Exact 4 Teams";
    } else {
      name = "Undefined";
    }

    return name;
  }

  function saveLocalStorageGameInDB(teams: string) {
    const name = document.getElementById("name_LStoDB") as HTMLInputElement;
    const team = document.getElementById("team_LStoDB") as HTMLInputElement;
    const localStorageData = document.getElementById(
      "localStorageData_LStoDB"
    ) as HTMLInputElement;

    if (name && team && localStorageData) {
      name.value = asignNameToTeam(teams);
      team.value = teams;
      localStorageData.value = localStorage.getItem(teams) as string;

      console.log(name.value);
      console.log(team.value);
      console.log(localStorageData.value);
    }

    const form = document.getElementById(
      "saveLocalStorageToDB"
    ) as HTMLFormElement;
    form.submit();
  }

  let showMessage = true;

  setTimeout(() => {
    showMessage = false;
  }, 20000);

  function hideData() {
    const dataDisplays = document.getElementsByClassName("game_data_string");

    for (const dataDisplay of dataDisplays) {
      if (dataDisplay instanceof HTMLElement) {
        dataDisplay.style.display =
          dataDisplay.style.display === "none" ? "block" : "none";
      }
    }
  }
</script>

<svelte:head>
  <title>Real Golf - Games</title>
</svelte:head>

<h1>Games</h1>

<h2>You have saved: {data.games.length} games in the database.</h2>

<form action="?/delete_all" method="POST" autocomplete="off">
  <button>Delete All</button>
</form>
<button title="Toggle Game Data" on:click={hideData}><Fa icon={faEye} /></button
>

{#if showMessage == true && form?.message}
  <p class="success">{form?.message}</p>
{/if}

{#if showMessage == true && form?.error}
  <p class="error">{form?.error}</p>
{/if}

<label for="search">Search a game by name or date:</label>
<input type="search" id="search" bind:value={searchTerm} />
<p class="error">
  You can search by dates by the following terms: DD/MM/YYYY or just by Year,
  Month or Day, to get all values with this parameters
</p>

<label for="teamSelect">Select a Team:</label>
<select id="teamSelect" bind:value={selectedTeam} on:change={handleTeamChange}>
  <option value="">All Teams</option>
  {#each teams as team}
    <option value={team.teams}>{team.name}</option>
  {/each}
</select>

{#if filteredGames.length > 0}
  {#if copyStatus === "success"}
    <p class="success">Copy successful</p>
  {:else if copyStatus === "error"}
    <p class="error">Copy failed</p>
  {/if}
  {#each filteredGames as game (game.id)}
    <div>
      <form action="?/rename" method="POST">
        <input
          type="text"
          name="name"
          id="name"
          class="headline"
          bind:value={game.name}
        />
        <input class="hidden" type="text" name="id" value={game.id} />
        <button>Update Name</button>
      </form>
      <p>Created at the {new Date(game.date).toLocaleDateString()}</p>
      <p class="game_data_string" style="display: none;">{game.data}</p>
      <p class="error">Please only paste the data in {game.teams}!</p>
      <button on:click={() => openGame(game.data, game.teams)}>Copy Data</button
      >
      <form action="?/delete_game" method="POST" autocomplete="off">
        <input class="hidden" type="text" name="id" value={game.id} />
        <button>Delete Game</button>
      </form>
    </div>
  {/each}
{:else}
  <p class="error">No games found for this search.</p>
{/if}

<form
  use:enhance
  action="?/saveLocalStorageGameInDB"
  method="POST"
  id="saveLocalStorageToDB"
  style="display: none;"
>
  <input type="text" name="team" id="team_LStoDB" />
  <input type="text" name="name" id="name_LStoDB" />
  <input type="text" name="localStorageData" id="localStorageData_LStoDB" />
</form>

<style lang="scss">
  div {
    background-color: var(--nav-color);
    width: 90vw;
    padding: 50px 50px;
    border-radius: 5px;
    border: 3px solid var(--border-color);
    margin-right: auto;
    margin-bottom: 20px;

    button {
      margin: 10px 0px;
    }

    p {
      border: 3px solid var(--border-color);
      max-width: max-content;
      overflow-wrap: break-word; /* Erzwingt Wortumbrüche */
    }

    .headline {
      margin-block: 0.5rem;
      line-height: 1.2;
      color: var(--h2-color);
    }

    .hidden {
      display: none;
    }
  }

  label {
    font-size: var(--medium-font);
  }

  select {
    color: var(--font-color);
    border: none;
    font-family: inherit;
    font-size: inherit;
    border-radius: 0.25rem;
    background: none;
    margin-bottom: 1.5rem;
    text-align: center;

    padding: 0.4rem 0.8rem;
    background-color: var(--accent-color);
    cursor: pointer;

    &:focus {
      outline: 0.1rem solid var(--font-color);
      outline-offset: 0.2rem;
    }
  }
</style>
