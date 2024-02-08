<script lang="ts">
	import { FourTimesWin } from '$lib/scripts/FourWinning/FourTimesWin';
	import { changeTeam } from '$lib/scripts/FourWinning/changeTeam';
	import { checkWin } from '$lib/scripts/FourWinning/checkWin';
	import { restartGame_Btn } from '$lib/scripts/FourWinning/restartGameBtn';
	import { rows } from '$lib/scripts/FourWinning/rows';
	import { showNumberofClicks } from '$lib/scripts/FourWinning/showNumberOfClicks';
	import type { Team } from '$lib/scripts/FourWinning/types';
	import { updateTeamTurn } from '$lib/scripts/FourWinning/updateTeamTurn';
	import { winCombinations } from '$lib/scripts/FourWinning/winCombinations';
	import { capitalizeFirstLetter } from '$lib/shared/utils';
	import { onMount } from 'svelte';

	/**
	 * Declared all variables
	 */

	export let teams: Team[];
	export let measurement_unit: string;
	export let team: string;
	const capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_unit);

	let currentTeamIndex = 0;
	let color = teams[currentTeamIndex].color;
	let currentTeam = teams[currentTeamIndex];

	let hitCounts: Record<string, number> = {};
	let numberOfClicks: string;

	/**
	 * This function handles the click event for each field
	 * @param outerIndex
	 * @param innerIndex
	 */

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

				FieldClickedFourTimes(outerIndex, innerIndex);
				checkWin(
					winCombinations,
					currentTeam,
					teams,
					hitCounts,
					numberOfClicks,
					color,
					currentTeamIndex
				);
				changeTeam(currentTeamIndex, teams, currentTeam, color);
			} else {
				const info_display = document.getElementById('info_display');

				if (info_display) {
					info_display.innerHTML =
						'<b> Oops! </b> This Field is already claimed by another Team. You can still win by hitting it four times!';
					info_display.scrollIntoView();
				}

				FieldClickedFourTimes(outerIndex, innerIndex);
				checkWin(
					winCombinations,
					currentTeam,
					teams,
					hitCounts,
					numberOfClicks,
					color,
					currentTeamIndex
				);
				changeTeam(currentTeamIndex, teams, currentTeam, color);

				// Hide the text after 10 seconds
				setTimeout(() => {
					if (info_display) {
						info_display.innerHTML = ''; // Empty the content to hide the text
					}
				}, 10000); // 10000 milliseconds (10 seconds)
			}
		}
	}

	/**
	 * This function checks if a field got hit four times
	 * @param outerIndex
	 * @param innerIndex
	 */

	function FieldClickedFourTimes(outerIndex: number, innerIndex: number) {
		const cellId = `row${outerIndex + 1}-${innerIndex}`;
		const cell = document.getElementById(cellId);
		if (cell) {
			const teamColor = currentTeam.color;
			const cellKey = `${teamColor}_${cellId}`;

			if (!hitCounts[cellKey]) {
				hitCounts[cellKey] = 1;
				showNumberofClicks(hitCounts, numberOfClicks);
			} else {
				hitCounts[cellKey] += 1;
				showNumberofClicks(hitCounts, numberOfClicks);
			}

			if (hitCounts[cellKey] === 4) {
				FourTimesWin(
					cellId,
					teamColor,
					hitCounts,
					teams,
					numberOfClicks,
					currentTeamIndex,
					currentTeam,
					color
				);
			}
		}
	}

	/**
	 * This function is for the input field, to input the distance.
	 */

	function handleInput() {
		const input = document.getElementById('distance') as HTMLInputElement;

		if (input) {
			const distanceStr = input.value.trim();

			if (distanceStr !== '') {
				const distance = parseFloat(distanceStr);

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
								currentTeamIndex
							);
							changeTeam(currentTeamIndex, teams, currentTeam, color);
						} else {
							alert('This field is already claimed by another team.');
						}
					}
				} else {
					alert('Invalid input. Please enter a valid number between 10 and 163.');
				}
			} else {
				alert('You need to enter a number.');
			}
		}
	}

	let isMounted = false;

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
</script>

<svelte:head>
	<title>4 Winning - {teams.length} Players</title>
</svelte:head>

<h1>{teams.length} Players</h1>

<p id="team_turn_display">Current Team Turn: {currentTeam.color}</p>
<p class="success" id="info_display" />

<button on:click={() => changeTeam(currentTeamIndex, teams, currentTeam, color)}>Switch Team</button
>
<button
	on:click={() =>
		restartGame_Btn(teams, hitCounts, numberOfClicks, currentTeamIndex, currentTeam, color)}
	>Restart Game</button
>

<p>You can also enter the distance you have played here:</p>
<input type="number" name="distance" id="distance" />
<button on:click={handleInput}>Submit</button>

<table>
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
				<td class="points">{side}</td>
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

<style>
	.meters,
	.points {
		flex: 0 0 25%;
		box-sizing: border-box;
		border: 5px solid var(--border-color);
		min-width: calc(90vw / 15);
		height: calc(50vh / 8);
		text-align: center;
		background-color: transparent;
	}

	.meters:hover {
		cursor: pointer;
	}

	button {
		cursor: pointer;
		border: 5px solid var(--border-color);
	}
</style>
