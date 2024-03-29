<script lang="ts">
	// Import all the functions and types from the FourWinning folder
	import { FourTimesWin } from '$lib/scripts/FourWinning/FourTimesWin';
	import { checkWin } from '$lib/scripts/FourWinning/checkWin';
	import { restartGame_Btn } from '$lib/scripts/FourWinning/restartGameBtn';
	import { rows } from '$lib/scripts/FourWinning/rows';
	import { showNumberofClicks } from '$lib/scripts/FourWinning/showNumberOfClicks';
	import type { Team } from '$lib/scripts/FourWinning/types';
	import { updateTeamTurn } from '$lib/scripts/FourWinning/updateTeamTurn';
	import { winCombinations } from '$lib/scripts/FourWinning/winCombinations';
// Import the capitalizeFirstLetter function from the shared folder
	// Import onMount from Svelte
	import { onMount } from 'svelte';
	// Import the Dialog component and the open_dialog function from the Global folder
	import { capitalizeFirstLetter } from '$lib/shared/utils/capitalizeFirstLetter';
	import Dialog, { open_dialog } from '../Global/Dialog.svelte';

	// Define Props
	export let teams: Team[];
	export let measurement_unit: string;
	export let team: string;

	// Define Variables
	const capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_unit);

	let currentTeamIndex = 0;
	let color = teams[currentTeamIndex].color;
	let currentTeam = teams[currentTeamIndex];

	let hitCounts: Record<string, number> = {};
	let numberOfClicks: string;

	// Define Functions
	function changeTeam(): void {
		currentTeamIndex = (currentTeamIndex + 1) % teams.length;
		currentTeam = teams[currentTeamIndex];
		color = currentTeam.color;
		updateTeamTurn(color);
	}

	// Handles clicks on the table cells
	function HandleEvent(outerIndex: number, innerIndex: number) {
		const cellId = `row${outerIndex + 1}-${innerIndex}`;
		const cell = document.getElementById(cellId);

		if (cell) {
			// Check if the background color is not equal to any team's color
			const isCellClaimed = teams.some((team) => cell.style.backgroundColor === team.color);

			if (!isCellClaimed) {
				cell.style.backgroundColor = color;
				const Id = `${outerIndex + 1}-${innerIndex}`;
				currentTeam.data.push(Id);

				// Update the corresponding team in the teams array
				teams[currentTeamIndex].data = [...currentTeam.data]; // Make sure to update the data array

				// Update teams in local storage
				localStorage.setItem(team, JSON.stringify(teams));

				// Check if the current team has won
				FieldClickedFourTimes(outerIndex, innerIndex);
				checkWin(
					winCombinations,
					currentTeam,
					teams,
					hitCounts,
					numberOfClicks,
					color,
					currentTeamIndex,
					changeTeam
				);
				// Change the team
				changeTeam();
			} else {
				// If the cell is already claimed by another team
				if (cell.style.backgroundColor != currentTeam.color) {
					FieldClickedFourTimes(outerIndex, innerIndex);
					changeTeam();
					open_dialog({
						text: '<b> Oops! </b> This Field is already claimed by another Team. You can still win by hitting it four times!',
						modal: false,
						cancel: null
					});
				} else {
					// If the cell is already claimed by the current team
					FieldClickedFourTimes(outerIndex, innerIndex);
					checkWin(
						winCombinations,
						currentTeam,
						teams,
						hitCounts,
						numberOfClicks,
						color,
						currentTeamIndex,
						changeTeam
					);
					changeTeam();
				}
			}
		}
	}

	// Handles the number of clicks on the table cells
	function FieldClickedFourTimes(outerIndex: number, innerIndex: number) {
		const cellId = `row${outerIndex + 1}-${innerIndex}`;
		const cell = document.getElementById(cellId);
		if (cell) {
			const teamColor = currentTeam.color;
			const cellKey = `${teamColor}_${cellId}`;

			// Check if the cell has been clicked before
			if (!hitCounts[cellKey]) {
				hitCounts[cellKey] = 1;
				showNumberofClicks(hitCounts, numberOfClicks);
			} else {
				hitCounts[cellKey] += 1;
				showNumberofClicks(hitCounts, numberOfClicks);
			}

			// Check if the cell has been clicked four times
			if (hitCounts[cellKey] === 4) {
				FourTimesWin(
					cellId,
					teamColor,
					hitCounts,
					teams,
					numberOfClicks,
					currentTeamIndex,
					currentTeam,
					color,
					changeTeam
				);
			}
		}
	}

	// Handles the input from the user in the input field
	function handleInput() {
		const input = document.getElementById('distance') as HTMLInputElement;

		if (input) {
			const distanceStr = input.value.trim();

			if (distanceStr !== '') {
				const distance = parseFloat(distanceStr);

				// Check if the input is a number and is between 10 and 163
				if (!isNaN(distance) && distance >= 10 && distance <= 163) {
					const rowIndex = Math.floor((distance - 10) / 3);
					const rowId = Math.floor((distance - 10) / 13) + 1;

					const cell = document.getElementById(`row${rowId}-${rowIndex}`);
					const Id = `${rowId}-${rowIndex}`;

					if (cell) {
						// Check if the background color is not transparent
						console.log(cell.style.backgroundColor);
						if (cell.style.backgroundColor === '' || cell.style.backgroundColor === 'transparent') {
							cell.style.backgroundColor = currentTeam.color;
							currentTeam.data.push(Id);
							localStorage.setItem(`4winning_${teams.length}_teams`, JSON.stringify(teams));

							checkWin(
								winCombinations,
								currentTeam,
								teams,
								hitCounts,
								numberOfClicks,
								color,
								currentTeamIndex,
								changeTeam
							);
							changeTeam();
						} else {
							// If the cell is already claimed by another team
							open_dialog({
								text: 'This field is already claimed by another team.',
								modal: false,
								cancel: null
							});
						}
					}
				} else {
					// If the input is not a number or is not between 10 and 163
					open_dialog({
						text: 'Invalid input. Please enter a valid number between 10 and 163.',
						modal: false,
						cancel: null
					});
				}
			} else {
				// If the input is empty or not a number
				open_dialog({ text: 'You need to enter a number.', modal: false, cancel: null });
			}
		}
	}

	let isMounted = false;

	// Run the code inside the onMount function only once when the component is mounted
	onMount(() => {
		if (!isMounted) {
			const storedTeams = localStorage.getItem(`4winning_${teams.length}_teams`);

			if (!storedTeams) {
				// Speichere die teams-Variable im Local Storage
				localStorage.setItem(`4winning_${teams.length}_teams`, JSON.stringify(teams));

				// Weise die initialisierte teams-Variable zu
				teams = teams;
			} else {
				// Lade die teams-Variable aus dem Local Storage
				teams = JSON.parse(storedTeams);

				// Wiederherstellen der Farben der Felder basierend auf den gespeicherten Daten
				teams.forEach((team) => {
					team.data.forEach((id) => {
						const cell = document.getElementById(`row${id}`);
						if (cell) {
							cell.style.backgroundColor = team.color;
						}
					});
				});
			}

			isMounted = true; // Markiere, dass der Hook ausgeführt wurde

			// Aktualisiere das aktuelle Team und den Anzeigetext
			currentTeamIndex = 0;
			updateTeamTurn(color);
		}
	});

	// Ask the user for confirmation before restarting the game
	function request_confirmation() {
		open_dialog({
			text: 'Are you sure you want to restart the game?',
			modal: true,
			confirm: {
				text: "Yes, I'm sure",
				action: () => {
					restartGame_Btn(teams, hitCounts, numberOfClicks, currentTeamIndex, currentTeam, color);
				}
			},
			cancel: {
				text: 'No, I want to continue playing',
				action: () => {}
			}
		});
	}
</script>

<svelte:head>
	<title>4 Winning - {teams.length} Players</title>
</svelte:head>

<h1>{teams.length} Players</h1>

<p id="team_turn_display">Current Team Turn: {currentTeam.color}</p>

<button on:click={changeTeam}>Switch Team</button>
<button
	on:click={() => {
		request_confirmation();
	}}>Restart Game</button
>

<p>You can also enter the distance you have played here:</p>
<input
	type="number"
	name="distance"
	id="distance"
	aria-label=" You can also enter the Distance here"
/>
<button on:click={handleInput}>Submit</button>

<table>
	<thead style="display: none;" aria-hidden="false">
		<tr>
			<th>Lateral Deviation</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Distance</th>
			<th>Lateral Deviation</th>
		</tr>
	</thead>
	{#each rows as { side, data }, outerIndex}
		<tbody id={`row${outerIndex + 1}`}>
			<tr>
				<td class="points">{side} {capitalizedMeasurementUnit}</td>
				{#each data as value, innerIndex}
					<td
						class="meters"
						id={`row${outerIndex + 1}-${innerIndex}`}
						on:click={() => HandleEvent(outerIndex, innerIndex)}
					>
						{value}
					</td>
				{/each}
				<td class="points">{side} {capitalizedMeasurementUnit}</td>
			</tr>
		</tbody>
	{/each}
</table>

<details>
	<summary>Number Clicks for each Field</summary>
	{#if numberOfClicks == undefined}
		<p>You first need to hit a field at leats one time</p>
	{:else}
		{numberOfClicks}
	{/if}
</details>

<Dialog />

<style lang="scss">
	@import '$lib/scss/FourWinning.scss';
</style>
