<script lang="ts">
	import type { User } from '$lib/server/user/types';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let all_users: User[];
	let show_all = false;
	console.log(all_users);

	function toggleSearch() {
		show_all = !show_all;
	}

	function closeSearch() {
		show_all = false;
	}
</script>

<div class="search">
	<button class="search-button" on:click={toggleSearch}>
		<Fa icon={faMagnifyingGlass} />
		<span class="description">Search</span>
	</button>
</div>
{#if show_all}
	<div class="blurry-background" />
	<div class="search-content">
		<button class="close-search" on:click={closeSearch}>x</button>
		<div class="search">
			<input type="text" placeholder="Search for Users" aria-label="Search for Users" />
		</div>
		{#if all_users}
			<h3>All Users</h3>
			{#each all_users as user}
				<div class="search-result">
					<a href="/{user.user.username}">
						<span>{user.user.username}</span>
					</a>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/Search.scss';
</style>
