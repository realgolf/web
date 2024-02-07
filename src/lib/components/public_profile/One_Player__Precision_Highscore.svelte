<script lang="ts">
	import type { PageData } from '../../../routes/[name]/$types';

	export let data: PageData;
</script>

<div id="one_player_precision">
	<h2>One Player Precision Highscore</h2>
	{#if data.user_daily?.lastUpdated === null}
		<p>{data.user_username} has never played One Player Precision</p>
	{:else}
		<ul>
			<li>
				<b>Today's</b> highscore is: {data.user_daily?.value}, last updated on{' '}
				{data.user_daily?.lastUpdated &&
					new Date(data.user_daily.lastUpdated).toLocaleDateString()}.
			</li>
			<li>
				<b>This Week's</b> highscore is: {data.user_weekly?.value}, last updated on{' '}
				{data.user_weekly?.lastUpdated &&
					new Date(data.user_weekly.lastUpdated).toLocaleDateString()}.
			</li>
			<li>
				<b>This Month's</b> highscore is: {data.user_monthly?.value}, last updated on{' '}
				{data.user_monthly?.lastUpdated &&
					new Date(data.user_monthly.lastUpdated).toLocaleDateString()}.
			</li>
			<li>
				<b>This Year's</b> highscore is: {data.user_yearly?.value}, last updated on{' '}
				{data.user_yearly?.lastUpdated &&
					new Date(data.user_yearly.lastUpdated).toLocaleDateString()}.
			</li>
		</ul>
		<p>
			{data.user_username}'s all-time highscore is
			<b>{data.user_all_time?.value}</b>, last exceeded on{' '}
			{data.user_all_time?.lastUpdated &&
				new Date(data.user_all_time.lastUpdated).toLocaleDateString()}.
		</p>
	{/if}
</div>

<style lang="scss">
	#one_player_precision {
		background-color: var(--nav-color);
		margin-left: 20px;
		border: 1px solid var(--border-color);
		border-radius: 5px;

		& > * {
			padding: 20px;
		}

		ul {
			margin-left: 20px;
			list-style-type: square;
		}
	}
</style>
