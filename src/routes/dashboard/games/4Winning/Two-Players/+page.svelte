<script lang="ts">
  import { enhance } from "$app/forms";
  import FourWinning from "$lib/components/FourWinning.svelte";

  export let data: any;
  let measurement_unit = data.measurement_unit;
  let team = "4winning_2_teams";
  interface Team {
    color: string;
    data: string[];
  }

  let teams: Team[] = [
    { color: "red", data: [] },
    { color: "blue", data: [] },
  ];

  function saveToDatabaseAndSubmitForm(event: any) {
    event.preventDefault();
    let localStorageData = localStorage.getItem("4winning_2_teams");

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);

      if (Array.isArray(parsedData)) {
        const redTeam = parsedData.find((team) => team.color === "red");
        const blueTeam = parsedData.find((team) => team.color === "blue");

        if (redTeam) {
          const existingRedTeam = teams.find((t) => t.color === "red");
          if (existingRedTeam) {
            existingRedTeam.data = redTeam.data;
          }
        }

        if (blueTeam) {
          const existingBlueTeam = teams.find((t) => t.color === "blue");
          if (existingBlueTeam) {
            existingBlueTeam.data = blueTeam.data;
          }
        }

        let new_teams = [redTeam, blueTeam];

        // Hier aktualisiere den Wert von teams, wenn du das möchtest
        teams = new_teams;

        // Daten in das Eingabefeld setzen
        const team_data = document.getElementById(
          "team_data"
        ) as HTMLInputElement;
        if (team_data) {
          team_data.value = JSON.stringify(new_teams);
        }

        // Das Formular absenden
        const form = document.querySelector("form") as HTMLFormElement;
        form.submit();
      }
    } else {
      let error = "There is no game data!";
      alert(error);
    }
  }
</script>

<FourWinning {teams} {team} {measurement_unit} />

<br />
<div class="database">
  <form method="POST" autocomplete="off" use:enhance>
    <input
      type="text"
      name="team_data"
      id="team_data"
      value={JSON.stringify(teams)}
    />
    <button on:click={saveToDatabaseAndSubmitForm}>Save to Database</button>
  </form>
</div>
