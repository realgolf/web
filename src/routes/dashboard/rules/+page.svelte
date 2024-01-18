<script lang="ts">
  import { removeLastSymbol } from "$lib/shared/utils.js";

  export let data;
  let measurement_unit = data.measurement_unit as string;
</script>

<svelte:head>
  <title>Real Golf - Rules</title>
</svelte:head>

<h1>Rules</h1>

<main>
  <p class="success">This are all rules for all three games.</p>
  <p class="success">Please read them carefully.</p>

  <details>
    <summary>Table of Contains</summary>
    <ul class="no-bullets">
      <li><a href="#4-winning">4 Winning</a></li>
      <li><a href="#exact">Exact</a></li>
      <li><a href="#precision">Precision</a></li>
    </ul>
  </details>

  <h2 id="4-winning">4 Winning</h2>

  <p>
    The rules of the game are quite simple—it's essentially a variation of
    four-in-a-row. You click on the button corresponding to the field you want
    from a distance. After the first team's turn, the second team takes its turn
    and clicks on a field, regardless of whether it has been chosen by another
    team before. The current team is indicated at the top of the game interface.
    The game proceeds with each team taking turns until one team successfully
    forms four squares in a row or column. If you click on the same field four
    times in a row, a message will appear notifying you of this. When a team
    wins, the values of the fields reset, and a new round begins automatically,
    with the teams alternating. These rules apply universally to all games.
  </p>

  <h2 id="exact">Exact</h2>

  <ul class="no-bullets">
    <li>It is played alternately</li>
    <li>Click the Field you hit.</li>
    <li>Respect the levels</li>
    <li>Only the intger number applies</li>
  </ul>

  <h2 id="precision">Precision</h2>

  <p>
    The aim of this golf game "Precision" is to retain as many points as
    possible out of the initial 100 points by executing precise shots. For each
    shot, the deviation of the ball from the target distance is measured.
    <br />
    <br />
    Precision is measured by the deviation in {measurement_unit} from the target
    distance. The closer the ball is to the specified distance, the fewer points
    will be deducted. It follows a deduction of 1 point per {removeLastSymbol(
      measurement_unit
    )} deviation from the target.
    <br />
    <br />
    At the end of the game, the player who has retained the highest score out of
    the initial 100 points is declared the winner. This means that the individual
    with the highest score due to deductions emerges as the victor! Fairness and
    respect towards other players are paramount. Be sure to adhere to the rules and
    etiquette of the game, as well as the guidelines of the club.
    <br />
    <br />
    You can make the game more interesting by introducing additional challenges,
    such as playing in different weather conditions or on various terrains. Whether
    you are a novice or an experienced golfer, "Precision" offers an exciting opportunity
    to demonstrate your skills and precision. Enjoy the game and the company of your
    fellow players!
    <br />
    <br />
    Are you ready to perfect your golf swings and retain as many points as possible?
    Let's play "Precision" and find out who achieves the highest score at the end!
  </p>
</main>
