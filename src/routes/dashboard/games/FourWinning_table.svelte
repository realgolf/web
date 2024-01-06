<script lang="ts">
  import { capitalizeFirstLetter } from "$lib/shared/utils";
  import { onMount } from "svelte";

  export let measurement_units;
  export let data;

  let capitalizedMeasurementUnit = capitalizeFirstLetter(measurement_units);
  console.log(data);
  let game_data =
    '[{"color":"red","data":["1-0","2-1","3-0","4-0","5-0","6-0"]},{"color":"blue","data":["1-1","2-0","3-1","4-1","5-1"]}]';

  interface Row {
    side: string;
    data: { id: string; value: string; color: string }[];
  }

  let rows: Row[] = [
    {
      side: `1 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "1-0", value: "10-11", color: "transparent" },
        { id: "1-1", value: "12-13", color: "transparent" },
        { id: "1-2", value: "14-15", color: "transparent" },
        { id: "1-3", value: "16-17", color: "transparent" },
        { id: "1-4", value: "18-19", color: "transparent" },
        { id: "1-5", value: "20-21", color: "transparent" },
        { id: "1-6", value: "22-23", color: "transparent" },
      ],
    },
    {
      side: `1 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "2-0", value: "24-25", color: "transparent" },
        { id: "2-1", value: "26-27", color: "transparent" },
        { id: "2-2", value: "28-29", color: "transparent" },
        { id: "2-3", value: "30-31", color: "transparent" },
        { id: "2-4", value: "32-33", color: "transparent" },
        { id: "2-5", value: "34-35", color: "transparent" },
        { id: "2-6", value: "36-37", color: "transparent" },
      ],
    },
    {
      side: `2 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "3-0", value: "38-40", color: "transparent" },
        { id: "3-1", value: "41-43", color: "transparent" },
        { id: "3-2", value: "44-46", color: "transparent" },
        { id: "3-3", value: "47-49", color: "transparent" },
        { id: "3-4", value: "50-52", color: "transparent" },
        { id: "3-5", value: "53-55", color: "transparent" },
        { id: "3-6", value: "56-58", color: "transparent" },
      ],
    },
    {
      side: `2 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "4-0", value: "59-61", color: "transparent" },
        { id: "4-1", value: "62-64", color: "transparent" },
        { id: "4-2", value: "65-67", color: "transparent" },
        { id: "4-3", value: "68-70", color: "transparent" },
        { id: "4-4", value: "71-73", color: "transparent" },
        { id: "4-5", value: "74-76", color: "transparent" },
        { id: "4-6", value: "77-79", color: "transparent" },
      ],
    },
    {
      side: `3 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "5-0", value: "80-82", color: "transparent" },
        { id: "5-1", value: "83-85", color: "transparent" },
        { id: "5-2", value: "86-88", color: "transparent" },
        { id: "5-3", value: "89-91", color: "transparent" },
        { id: "5-4", value: "92-94", color: "transparent" },
        { id: "5-5", value: "95-97", color: "transparent" },
        { id: "5-6", value: "98-100", color: "transparent" },
      ],
    },
    {
      side: `3 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "6-0", value: "101-103", color: "transparent" },
        { id: "6-1", value: "104-106", color: "transparent" },
        { id: "6-2", value: "107-109", color: "transparent" },
        { id: "6-3", value: "110-112", color: "transparent" },
        { id: "6-4", value: "113-115", color: "transparent" },
        { id: "6-5", value: "116-118", color: "transparent" },
        { id: "6-6", value: "119-121", color: "transparent" },
      ],
    },
    {
      side: `4 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "7-0", value: "122-124", color: "transparent" },
        { id: "7-1", value: "125-127", color: "transparent" },
        { id: "7-2", value: "128-130", color: "transparent" },
        { id: "7-3", value: "131-133", color: "transparent" },
        { id: "7-4", value: "134-136", color: "transparent" },
        { id: "7-5", value: "137-139", color: "transparent" },
        { id: "7-6", value: "140-142", color: "transparent" },
      ],
    },
    {
      side: `4 ${capitalizedMeasurementUnit}`,
      data: [
        { id: "8-0", value: "143-145", color: "transparent" },
        { id: "8-1", value: "146-148", color: "transparent" },
        { id: "8-2", value: "149-151", color: "transparent" },
        { id: "8-3", value: "152-154", color: "transparent" },
        { id: "8-4", value: "155-157", color: "transparent" },
        { id: "8-5", value: "158-160", color: "transparent" },
        { id: "8-6", value: "161-163", color: "transparent" },
      ],
    },
  ];

  interface GameData {
    color: string;
    data: string[];
  }

  function colorFields() {
    let gameData: GameData[] = JSON.parse(game_data);

    gameData.forEach(({ color, data: colorData }) => {
      rows.forEach((row) => {
        row.data.forEach((field) => {
          if (colorData.includes(field.id)) {
            field.color = color;
          }
          console.log(field.id, field.color);
        });
      });
    });
    console.log(rows);
    rows = rows;
  }

  // setInterval(() => {
  //   colorFields();
  // }, 1000);

  onMount(() => {
    colorFields();
  });
</script>

<table>
  {#each rows as { side, data }, outerIndex}
    <tbody id={`row${outerIndex + 1}`}>
      <tr>
        <td class="points">{side}</td>
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
</style>
