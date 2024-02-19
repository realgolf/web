<script lang="ts">
	import type { User } from '$lib/server/user/types';

	export let all_users: User[];
	let show_all = true;
	console.log(all_users);
</script>

<div class="search">
	<input type="text" placeholder="Search..." />
</div>
{#if show_all}
	<div class="search-results">
		{#if all_users}
			{#each all_users as user}
				<div class="search-result">
					<a href="/{user.user.username}}">
						<span>{user.user.username}</span>
					</a>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style lang="scss">
	.search {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 1rem;
	}

	.search input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.search-results {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.search-result {
		padding: 0.5rem;
		border-bottom: 1px solid #ccc;
	}

	.search-result a {
		text-decoration: none;
		color: #000;
	}

	.search-result a:hover {
		background-color: #f0f0f0;
	}
</style>
