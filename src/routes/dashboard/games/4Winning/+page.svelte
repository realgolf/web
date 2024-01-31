<script lang="ts">
  import { enhance } from "$app/forms";
  import FourWinning from "$lib/components/FourWinning.svelte";

  // eslint-disable-next-line
  export let data: any;
  let measurement_unit = data.measurement_unit;

  interface Team {
    color: string;
    data: string[];
  }

  let teams: Team[] = [
    { color: "red", data: [] },
    { color: "blue", data: [] },
    { color: "green", data: [] },
    { color: "orange", data: [] },
  ];

  let teamSize = 4; // Default team size
  let team = `4winning_${teamSize}_teams`;

  function saveToDatabaseAndSubmitForm(event: { preventDefault: () => void }) {
    event.preventDefault();

    // Your existing logic for saving to the database...

    // Update the team size dynamically
    teamSize = teams.length;
    team = `4winning_${teamSize}_teams`;

    // Continue with the existing logic...

    // The Form submission logic...
  }
</script>

<FourWinning {teams} {team} {measurement_unit} />

<br />
<div class="database">
  <form method="POST" autocomplete="off" use:enhance>
    <label for="teamSize">Select Team Size:</label>
    <select bind:value={teamSize} id="teamSize">
      {#each [2, 3, 4, 5] as size}
        <option value={size}>{size} Teams</option>
      {/each}
    </select>

    <input
      type="text"
      name="team_data"
      id="team_data"
      value={JSON.stringify(teams)}
    />
    <button on:click={saveToDatabaseAndSubmitForm}>Save to Database</button>
  </form>
</div>
