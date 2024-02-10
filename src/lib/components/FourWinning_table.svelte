<script lang="ts">
	import { rows, setToNewRows } from '$lib/scripts/FourWinning_table/rows';
	import type { GameData } from '$lib/scripts/FourWinning_table/types';
	import { capitalizeFirstLetter } from '$lib/shared/utils';
	import { onMount } from 'svelte';

	export let measurement_units;
	export let data;

	let capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_units);
	let game_data = data;
	let newRows = rows;

	function colorFields() {
		let gameData: GameData[] = JSON.parse(game_data);

		gameData.forEach(({ color, data: colorData }) => {
			newRows.forEach((row) => {
				row.data.forEach((field) => {
					if (colorData.includes(field.id)) {
						field.color = color;
					}
				});
			});
		});

		console.log('newRows after colorization:', newRows);

		newRows = newRows;

		setToNewRows(newRows);
	}

	onMount(() => {
		colorFields();
	});
</script>

<table>
	{#each newRows as { side, data }, outerIndex}
		<tbody id={`row${outerIndex + 1}`}>
			<tr>
				<td class="points">{side} {capitalizedMeasurementUnit}</td>
				{#each data as { value, color }, innerIndex}
					<td
						class="meters"
						id={`row${outerIndex + 1}-${innerIndex}`}
						style={`background-color: ${color}`}
					>
						{value}
					</td>
				{/each}
				<td class="points">{side}</td>
			</tr>
		</tbody>
	{/each}
</table>

<style>
	.meters,
	.points {
		flex: 0 0 25%;
		box-sizing: border-box;
		border: 5px solid var(--border-color);
		min-width: calc(30vw / 15);
		height: calc(16.7vh / 8);
		text-align: center;
	}

	@media only screen and (max-width: 600px) {
		table {
			display: none;
		}
	}
</style>
