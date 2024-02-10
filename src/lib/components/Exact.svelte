<script lang="ts">
	import { findWinner } from '$lib/scripts/Exact/findWinner';
	import { rows } from '$lib/scripts/Exact/rows';
	import type { Team } from '$lib/scripts/Exact/types';
	import { updatePoints } from '$lib/scripts/Exact/updatePoints';
	import { updatePointsDisplay } from '$lib/scripts/Exact/updatePointsDisplay';
	import { updateTeamTurn } from '$lib/scripts/Exact/updateTeamTurn';
	import { afterUpdate, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let teams: Team[];

	// eslint-disable-next-line
	let pointsByTeam: Record<string, any> = {};
	let shotsPlayed: number = 0;

	teams.forEach((team) => {
		pointsByTeam[team.color] = writable(team.points);
	});

	onMount(() => {
		const storedData = localStorage.getItem(`exact_${teams.length}_teams`);
		if (storedData !== null) {
			const parsedData = JSON.parse(storedData);
			teams.forEach((team) => {
				if (parsedData[team.color]) {
					pointsByTeam[team.color].set(parsedData[team.color].points);
				}
			});
			shotsPlayed = parsedData['red'].shots;
			clickedCellsCount = shotsPlayed; // Update clickedCellsCount as well
		}

		updatePointsDisplay(teams);
		updateTeamTurn(color);
	});

	let userInput: number = 20;
	let clickedCellsCount: number = 0; // Initialize clickedCellsCount
	let currentTeamIndex = 0;
	let currentTeam = teams[currentTeamIndex];
	let color = currentTeam.color;

	function changeTeam() {
		currentTeamIndex = (currentTeamIndex + 1) % teams.length;
		currentTeam = teams[currentTeamIndex];
		color = currentTeam.color;
		updateTeamTurn(color);
	}

	let lastRowNumbers: Record<string, number | null> = {};

	function handleClick(event: MouseEvent) {
		const targetId = (event.target as HTMLElement).id;
		const match = targetId.match(/row(\d+)-(\d+)/);

		if (match) {
			const rowNumber = parseInt(match[1]);
			let clickedCell: HTMLElement | null = document.getElementById(targetId);
			if (clickedCell) {
				clickedCell.style.backgroundColor = color;
				let team = teams.find((t) => t.color === color);
				if (team) {
					pointsByTeam[color].update((currentPoints: number) => {
						let newPoints = currentPoints;

						if (rowNumber >= 1 && rowNumber <= 6) {
							newPoints += 1;
						} else if (rowNumber === 7) {
							newPoints += 2;
						} else if (rowNumber === 8) {
							newPoints += 3;
						} else if (rowNumber === 9) {
							newPoints += 5;
						} else if (rowNumber === 10) {
							newPoints -= 1;
						}

						if (lastRowNumbers[color] === rowNumber) {
							if (rowNumber >= 1 && rowNumber <= 6) {
								newPoints += 1;
							} else if (rowNumber === 7) {
								newPoints += 2;
							} else if (rowNumber === 8) {
								newPoints += 3;
							} else if (rowNumber === 9) {
								newPoints += 5;
							} else if (rowNumber === 10) {
								newPoints -= 1;
							}
						}

						lastRowNumbers[color] = rowNumber; // Setze lastRowNumber nach der Verarbeitung

						const storedData = localStorage.getItem(`exact_${teams.length}_teams`);
						let parsedData = storedData ? JSON.parse(storedData) : {};

						parsedData[color] = { points: newPoints, shots: clickedCellsCount };
						localStorage.setItem(`exact_${teams.length}_teams`, JSON.stringify(parsedData)); // Im localStorage speichern
						return newPoints;
					});

					updatePoints(teams);
					updatePointsDisplay(teams);
					clickedCellsCount++;
				}
				changeTeam();
			}
		}

		if (clickedCellsCount === userInput * teams.length) {
			const winner = findWinner(teams);
			let confirmed;

			if (winner == 'Tie') {
				confirmed = confirm('The Game ended Tie!');
			} else {
				confirmed = confirm(`The winner is ${winner}! Do you want to play again?`);
			}

			if (confirmed) {
				resetGame();
			}
		}
	}

	function resetGame() {
		localStorage.removeItem(`exact_${teams.length}_teams`);
		for (let team of teams) {
			team.data = [];
			team.points = 0;
			pointsByTeam[team.color].set(0); // Setzen Sie die Punkte für jedes Team auf 0 im Store
		}

		userInput = 20;
		clickedCellsCount = 0;
		currentTeamIndex = 0;
		currentTeam = teams[currentTeamIndex];
		color = currentTeam.color;

		const cells = document.querySelectorAll('.meters');
		cells.forEach((cell) => {
			(cell as HTMLElement).style.backgroundColor = '';
		});

		updatePointsDisplay(teams);
		updateTeamTurn(color);
	}

	onMount(() => {
		updatePointsDisplay(teams);
		updateTeamTurn(color);
	});

	afterUpdate(() => {
		updateTeamTurn(color);
	});
</script>

<svelte:head>
	<title>Exact - {teams.length} Players</title>
</svelte:head>

<h1>{teams.length} Players</h1>

<p>
	Enter the amount of shots per team: <input
		bind:value={userInput}
		type="number"
		name="shots"
		id="shots"
	/>
</p>

<p>
	You have played {clickedCellsCount} of {userInput * teams.length} shots, so you have
	{userInput * teams.length - clickedCellsCount} shots left.
</p>

<p id="team_turn_display">Current Team Turn: {currentTeam.color}</p>
<button on:click={resetGame}>Restart</button>
<button on:click={changeTeam}>Switch Team</button>

<div id="points_display" />

<br />

<table id="field" style="display: flex; flex-direction: column;">
	{#each rows as { points, data }, outerIndex}
		<tbody id={`row${outerIndex + 1}`}>
			<tr>
				<td class="points">{points}</td>
				{#each data as value, innerIndex}
					<td
						class="meters"
						id={`row${outerIndex + 1}-${innerIndex}`}
						style="background-color: {teams[outerIndex]};"
						on:click={handleClick}
					>
						{value}
					</td>
				{/each}
			</tr>
		</tbody>
	{/each}
</table>

<style>
	table {
		margin-left: auto;
		margin-right: auto;
	}
	.meters,
	.points {
		flex: 0 0 25%;
		box-sizing: border-box;
		border: 5px solid var(--border-color);
		min-width: calc(80vw / 15);
		height: calc(30vh / 8);
		text-align: center;
	}

	.meters:hover {
		cursor: pointer;
	}

	button {
		cursor: pointer;
		border: 5px solid var(--border-color);
	}

	input {
		color: var(--font-color);
		background-color: var(--bg-color);
		border: 2px solid var(--border-color);
		box-shadow: none;
		font-size: var(--medium-font);
	}
</style>
