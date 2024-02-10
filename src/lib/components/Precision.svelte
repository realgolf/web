<script lang="ts">
	import { generateRandomNumber } from '$lib/scripts/Precision/generateRandomNumber';
	import type { Team } from '$lib/scripts/Precision/types';
	import { updatePointsDisplay } from '$lib/scripts/Precision/updatePointsDisplay';
	import { capitalizeFirstLetter } from '$lib/shared/utils';
	import { afterUpdate, onMount } from 'svelte';

	export let teams: Team[];
	export let point: number;
	export let measurement_unit: string;
	let capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_unit);

	let currentTeamIndex = 0;
	// eslint-disable-next-line
	let color = teams[currentTeamIndex].color;
	let currentTeam = teams[currentTeamIndex];

	let lower_range: number = 10;
	let upper_range: number = 200;

	let range = upper_range - lower_range;

	let combinedRange: string = `${lower_range}-${upper_range}`;

	function handleRangeInput(event: Event & { currentTarget: HTMLInputElement }): void {
		const inputRange = (event.target as HTMLInputElement).value;

		// Split the input into lower and upper values
		const [lowerStr, upperStr] = inputRange.split('-');

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

	let MetersToPlay: number = generateRandomNumber(range, lower_range, upper_range);

	function changeTeam() {
		MetersToPlay = generateRandomNumber(range, lower_range, upper_range);
		for (let team of teams) {
			team.distance = null as unknown as number;
		}
		currentTeamIndex = (currentTeamIndex + 1) % teams.length;
		currentTeam = teams[currentTeamIndex];
		color = currentTeam.color;
	}

	function deductPoints() {
		const difference: number = MetersToPlay - currentTeam.distance;
		const pointsToDeduct = Math.abs(difference);
		currentTeam.points -= pointsToDeduct;
		changeTeam();
		checkWinner();
	}

	function checkWinner() {
		const teamsWithPoints = teams.filter((t) => t.points > 0);
		if (teamsWithPoints.length === 1) {
			const winner = teamsWithPoints[0].color;
			const confirmed = confirm(`The winner is Team ${winner}!`);

			if (confirmed) {
				resetGame();
			}
		}
	}

	function resetGame() {
		for (let team of teams) {
			team.points = point;
		}

		range = 150;
		currentTeamIndex = 0;
		color = teams[currentTeamIndex].color;
		currentTeam = teams[currentTeamIndex];
		MetersToPlay = generateRandomNumber(range, lower_range, upper_range);
	}

	onMount(() => {
		updatePointsDisplay(teams);
	});

	afterUpdate(() => {
		updatePointsDisplay(teams);
	});
</script>

<svelte:head>
	<title>Precision - {teams.length} Players</title>
</svelte:head>

<h1>{teams.length} Players</h1>

<div id="points_display" />

<button on:click={resetGame}>Reset Game</button>

<p>Choose range:</p>
<input
	type="text"
	name="combined_range"
	bind:value={combinedRange}
	on:input={handleRangeInput}
	placeholder="Input the Range you want to play split by an '-''."
/>
<button
	on:click={() => {
		MetersToPlay = generateRandomNumber(range, lower_range, upper_range);
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
</style>
