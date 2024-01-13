<script lang="ts">
  import { capitalizeFirstLetter } from "$lib/shared/utils";
  import { afterUpdate, onMount } from "svelte";

  export let data;
  export let form;
  let measurement_unit: string;
  measurement_unit = data.measurement_unit ? data.measurement_unit : "yards";
  let capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_unit);

  interface Team {
    color: string;
    points: number;
    distance: number;
    shots: number;
  }

  let point = 100;

  let teams: Team[] = [
    {
      color: "red",
      points: point,
      distance: null as unknown as number,
      shots: 0,
    },
  ];

  let lower_range: number = 10;
  let upper_range: number = 200;

  let range = upper_range - lower_range;

  let currentTeamIndex = 0;
  let currentTeam = teams[currentTeamIndex];

  let combinedRange: string = `${lower_range}-${upper_range}`;

  function handleRangeInput(
    event: Event & { currentTarget: HTMLInputElement }
  ): void {
    const inputRange = (event.target as HTMLInputElement).value;

    // Split the input into lower and upper values
    const [lowerStr, upperStr] = inputRange.split("-");

    // Convert the string values to numbers
    const lower = lowerStr ? parseInt(lowerStr, 10) : NaN;
    const upper = upperStr ? parseInt(upperStr, 10) : NaN;

    // Update the individual values if they are valid numbers
    if (!isNaN(lower)) {
      lower_range = lower;
    }

    if (!isNaN(upper)) {
      upper_range = upper;
    }
  }

  function generateRandomNumber(): number {
    let randomNumber: number;

    do {
      randomNumber = Math.random() * range + lower_range;
    } while (randomNumber >= upper_range);

    const roundedNumber: number = Math.ceil(randomNumber);
    console.log(roundedNumber);
    return roundedNumber;
  }

  let MetersToPlay: number = generateRandomNumber();

  function updatePointsDisplay() {
    const display = document.querySelector("#points_display");
    if (display) {
      display.innerHTML = teams
        .map((t) => `${t.color} team points: ${t.points}`)
        .join("<br>");
    }
  }

  function updateNumberofClicks() {
    const display = document.querySelector("#number_clicks");
    if (display) {
      display.innerHTML = teams
        .map((t) => `Number of shots played ${t.shots} shots`)
        .join("<br>");
    }
  }

  function deductPoints() {
    const difference: number = MetersToPlay - currentTeam.distance;
    const pointsToDeduct = Math.abs(difference);
    currentTeam.points -= pointsToDeduct;
    calculateShots();
    MetersToPlay = generateRandomNumber();
    if (currentTeam.points <= 0) {
      let totalShots = currentTeam.shots;
      sendTotalShotsToDatabase(totalShots);
      // alert(`You have played ${currentTeam.shots}`);
      // resetGame();
    }
  }

  function sendTotalShotsToDatabase(totalShots: number) {
    const form_input = document.getElementById("shots") as HTMLInputElement;

    if (form_input) {
      form_input.value = JSON.stringify(totalShots);
    }

    const form = document.getElementById("highscore_form") as HTMLFormElement;
    form.submit();
  }

  function calculateShots() {
    teams.forEach((team) => {
      team.shots = team.shots += 1;
      teams = teams;
    });
  }

  function resetGame() {
    for (let team of teams) {
      team.points = point;
      team.shots = 0;
    }

    range = 150;
    MetersToPlay = generateRandomNumber();
  }

  onMount(() => {
    updatePointsDisplay();
    updateNumberofClicks();
  });

  afterUpdate(() => {
    updatePointsDisplay();
    updateNumberofClicks();
  });
</script>

<svelte:head>
  <title>Precision - {teams.length} Player</title>
</svelte:head>

<h1>{teams.length} Player</h1>

{#if form?.error}
  <p class="error">
    {form.error}
  </p>
{/if}

<div id="points_display" />

{#each teams as team}
  <p id="number_clicks">Number of shots played: {team.shots}</p>
{/each}

<button on:click={resetGame}>Reset Game</button>

<p>Choose range:</p>
<input
  type="text"
  name="combined_range"
  bind:value={combinedRange}
  on:input={handleRangeInput}
  placeholder="Input the Range you want to play split by an '-'."
/>
<button
  on:click={() => {
    MetersToPlay = generateRandomNumber();
  }}>Generate Number when range change</button
>

<p>{capitalizedMeasurementUnit} to play:</p>
<ol>
  <li class="success">{MetersToPlay}</li>
</ol>

<ol>
  {#each teams as t}
    {#if t === currentTeam}
      <p>Distance Played by {t.color}:</p>
      <input
        placeholder="Please enter the distance you have played as a number"
        type="number"
        bind:value={t.distance}
      />
      <button on:click={deductPoints}>Enter</button>
    {/if}
  {/each}
</ol>

<form action="?/get_add_highscore" method="POST" id="highscore_form">
  <input type="number" name="shots" id="shots" />
</form>

<style lang="scss">
  ol {
    list-style: none;
  }

  input {
    border: none;
    background-color: var(--border-color);
    color: var(--font-color);
    font-size: var(--medium-font);
    margin: 15px 0;
  }

  button {
    margin: 15px 0;
  }

  #highscore_form {
    display: none;
  }
</style>
