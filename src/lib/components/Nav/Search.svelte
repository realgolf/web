<script lang="ts">
	import type { User } from '$lib/server/user/types';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let all_users: User[];
	let show_all = true;
	console.log(all_users);
</script>

<div class="search">
	<button>
		<Fa icon={faMagnifyingGlass} />
	</button>
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
	@import '$lib/scss/Search.scss';
</style>
