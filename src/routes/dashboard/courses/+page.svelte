<script lang="ts">
		import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Score Tracker</title>
</svelte:head>

<h1>Score Tracker</h1>

<!-- <main>
	<div class="heading">
		<p>
			Welcome to our Real Golf Score Tracker {data.name}. <br /> Your current Handicap is:
			<b>{data.handicap}</b>
		</p>

		<a href="/dashboard/courses/play">Play</a>
	</div>
</main> -->

<main>
	<h4>Welcome to the Real Golf Games Score Tracker {data.name}</h4>
	<p class="error">This site is currently under development please come back later. 🏗️🚧</p>
	<a href="/dashboard"><b>Back to your Dashboard</b></a>
</main>