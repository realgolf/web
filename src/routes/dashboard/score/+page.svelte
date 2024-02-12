<script lang="ts">
	export let data: any;
</script>

<svelte:head>
	<title>Score Tracker</title>
</svelte:head>

<h1>Score Tracker</h1>

<main>
	<div class="heading">
		<p>
			Welcome to our Real Golf Score Tracker {data.name}. <br /> Your current Handicap is:
			<b>{data.handicap}</b>
		</p>

		<a href="/dashboard/score/play">Play</a>
	</div>
</main>
