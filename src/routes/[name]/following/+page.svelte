<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Who {data.username} is Followering</title>
</svelte:head>

<h1>Who {data.username} is Followering</h1>

<div class="followers">
	{#if data.followingDetails.length > 0}
		{#each data.followingDetails as following}
			<div class="follower">
				<a href={`/${following.username}`}>{following.name} <small>{following.username}</small></a>
				{#if following.bio}
					<br />
					<small class="bio">{following.bio}</small>
				{/if}
			</div>
		{/each}
	{:else}
		<p>{data.username} has no followers.</p>
	{/if}
</div>

<style lang="scss">
	.followers {
		max-width: 90vw !important;
		margin: 0 auto;
		margin-left: 2vw;

		.follower {
			border-bottom: 2px solid var(--border-color);

			a {
				text-decoration: none !important;
				margin-left: 3rem;

				small {
					color: grey !important;
					font-size: 0.9rem;
				}
			}

			.bio {
				color: grey !important;
				margin-left: 3rem;
				margin-bottom: 1rem;
			}
		}
	}
</style>
