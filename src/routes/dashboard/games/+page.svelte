<script lang="ts">
  import { enhance } from "$app/forms";
  import { faEye } from "@fortawesome/free-regular-svg-icons";
  import { afterUpdate, onMount } from "svelte";
  import Fa from "svelte-fa";
  import type { ActionData } from "./$types.js";
  import FourWinningTable from "./FourWinning_table.svelte";
  import { teams } from "./teams";

  /**
   * REACTIVE DATA
   */
  export let data;
  export let form: ActionData;

  let measurement_units: string = data.measurement_units;

  /**
   * STATE
   */
  let selectedTeam = "";
  let searchTerm = "";
  let filteredGames: string | any[] = [];

  // ON COMPONENT MOUNT
  onMount(() => {
    filteredGames = data.games;
  });

  /**
   * APPLY FILTERS TO GAMES
   * @param searchTerm
   */
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
      filteredGames = data.games;
    }
  }

  /**
   * HANDLE TEAM CHANGE
   */
  function handleTeamChange() {
    applyFilters(searchTerm);
  }

  /**
   * APPLY FILTERS ON EVERY UPDATE
   */
  afterUpdate(() => {
    applyFilters(searchTerm);
  });

  /**
   * COPY STATUS
   */
  let copyStatus: string | null = null;

  /**
   * REDIRECT FUNCTION
   * @param path
   */
  function redirect(path: string) {
    window.location.href = path;
  }

  /**
   * REDIRECT USER BASED ON TEAMS SELECTED
   * @param teams
   * @param gameData
   */
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

  /**
   * ASIGNS THE CORRECT NAME FOR EACH TEAME
   * @param teams
   */
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

  /**
   * SAVE'S A GAME FROM THE LOCAL STORGAE IN THE DATABASE
   * @param teams
   */
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

  /**
   * RECIEVE THE GAME FROM THE DATABASE AND OPEN IT IN THE CORRECT GAME
   * @params {string} gameData - The data of the game.
   * @params {string} teams - The team of the game.
   */
  function openGame(gameData: string, teams: string) {
    let local_storage_game = localStorage.getItem(teams);

    if (local_storage_game == null) {
      fillLocalStorageAndRedirectUser(teams, gameData);
    } else {
      showModal(
        "<b>Oops!</b> Looks like your Storage is full. <br> Do you want to delete it?",
        () => {
          // Yes button callback
          localStorage.removeItem(teams);
          fillLocalStorageAndRedirectUser(teams, gameData);
        },
        () => {
          // Save the Game in the Database button callback
          saveLocalStorageGameInDB(teams);
          setTimeout(() => {
            fillLocalStorageAndRedirectUser(teams, gameData);
          }, 100);
        },
        () => {
          // No button callback
          // No further action
        }
      );
    }
  }

  /**
   * DISPLAY A CONFIRMATION MODAL
   * @param message
   * @param yesCallback
   * @param saveCallback
   * @param noCallback
   */
  function showModal(
    message: string,
    yesCallback: () => void,
    saveCallback: () => void,
    noCallback: () => void
  ) {
    const modal = document.getElementById("confirmationModal");
    const textElement = document.getElementById("confirmationText");
    const yesBtn = document.getElementById("yesBtn");
    const saveBtn = document.getElementById("saveBtn");
    const noBtn = document.getElementById("noBtn");

    if (modal && textElement && yesBtn && saveBtn && noBtn) {
      textElement.innerHTML = message;

      modal.style.display = "block";

      yesBtn.onclick = () => {
        modal.style.display = "none";
        yesCallback();
      };

      saveBtn.onclick = () => {
        modal.style.display = "none";
        saveCallback();
      };

      noBtn.onclick = () => {
        modal.style.display = "none";
        noCallback();
      };
    }
  }

  /**
   * HIDE THE CONFIRMATION MODAL WHEN CLICKING OUTSIDE
   */
  onMount(() => {
    window.onclick = (event) => {
      const modal = document.getElementById("confirmationModal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };
  });

  let showMessage = true;

  /**
   * AUTOMATICALLY HIDE THE MESSAGE AFTER 20 SECONDS
   */
  setTimeout(() => {
    showMessage = false;
  }, 20000);

  /**
   * TOGGLE THE VISIBILITY OF THE GAME DATA
   */
  function hideData() {
    const dataDisplays = document.getElementsByClassName("game_data_string");

    for (const dataDisplay of dataDisplays) {
      if (dataDisplay instanceof HTMLElement) {
        dataDisplay.style.display =
          dataDisplay.style.display === "none" ? "block" : "none";
      }
    }
  }

  function togglePreview() {
    const tablePreviews = document.getElementsByClassName("table_previews");

    for (const tablePreview of tablePreviews) {
      if (tablePreview instanceof HTMLElement) {
        tablePreview.style.display =
          tablePreview.style.display === "none" ? "block" : "none";
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
<button title="Toggle Game Preview" on:click={togglePreview}><Fa icon={faEye} /></button
>

<div id="confirmationModal" class="modal">
  <div class="modal-content">
    <p class="success" id="confirmationText" />
    <button id="yesBtn">Yes</button>
    <button id="saveBtn">Save the Game in the Database</button>
    <button id="noBtn">No</button>
  </div>
</div>

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
    <div class="game">
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
      {#if game.teams.includes("4winning")}
         <div class="table_previews" style="display: none;">
           <FourWinningTable {measurement_units} />
         </div>
        {:else}
         <p>{game.data}</p>
      {/if}
      <button on:click={() => openGame(game.data, game.teams)}>Open Game</button
      >
      <p class="error">Please only paste the data in {game.teams}!</p>
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
  .game {
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

  .modal {
    display: none;
    margin: 15px 0;

    .modal-content {
      background-color: var(--nav-color);
      border: 1px solid var(--border-color);
      border-radius: 5px;
    }
  }
</style>
