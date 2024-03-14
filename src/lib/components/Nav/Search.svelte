<script lang="ts">
	import { search_by_term } from '$lib/scripts/Nav/search_by_term';
	import type { User } from '$lib/server/user/types';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
	import { afterUpdate, onDestroy, onMount, tick } from 'svelte';
	import Fa from 'svelte-fa';

	export let all_users: User[];

	let show_all = false;
	let search_term = '';

	let filtered_users: User[] = all_users || [];

	$: if (all_users) {
		filtered_users = search_by_term(all_users, search_term);
	}

	afterUpdate(async () => {
		await tick(); // wait for next microtask
		filtered_users = search_by_term(all_users, search_term);
	});

	function toggleSearch() {
		show_all = !show_all;
	}

	function closeSearch() {
		show_all = false;
	}

	onMount(() => {
		window.addEventListener('keypress', (e) => {
			if (e.key === 's' && e.ctrlKey) {
				toggleSearch();
			}
		});

		function closeSearchOnClick(event: MouseEvent | TouchEvent): void {
			if (
				event.target instanceof Element &&
				!event.target.closest('.search') &&
				!event.target.closest('.search-button') &&
				!event.target.closest('.search-content')
			) {
				closeSearch();
			}
		}

		window.addEventListener('click', closeSearchOnClick);
		window.addEventListener('touchend', closeSearchOnClick);

		onDestroy(() => {
			window.removeEventListener('click', closeSearch);
			window.removeEventListener('touchend', closeSearch);
		});
	});
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
			<input
				type="text"
				placeholder="Search for Users"
				aria-label="Search for Users"
				bind:value={search_term}
			/>
		</div>
		<h3>All Users</h3>
		{#if filtered_users && filtered_users.length > 0}
			{#each filtered_users as user, index}
				{#if index < 30}
					<div class="search-result">
						<a href="/{user.user.username}">
							<span>{user.user.username}</span>
						</a>
					</div>
				{/if}
			{/each}
		{:else}
			<p>No users found.</p>
			<p class="success">You must be loged in to search for other users.</p>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/Search.scss';
</style>
