<script lang="ts">
	import type { PageData } from '../../../routes/[name]/$types';

	export let data: PageData;

	let user_games = data.games;
</script>

<div class="games">
	<p>
		{user_games?.length === 1
			? `They have 1 saved game.`
			: `They have ${user_games?.length} saved games.`}

		You can find all of their games
		<a href={`/${data.user_username}/games`}>here</a>.
	</p>
</div>
