<script lang="ts">
	import type { User } from '$lib/server/user/types';
	import { faHouse, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Dropdownmenu from './Dropdownmenu.svelte';
	import Path from './Path.svelte';
	import Search from './Search.svelte';

	export let auth: string | undefined;
	export let username: string | undefined;
	export let all_users: User[];

	type link = {
		path: string;
		icon: IconDefinition;
		title: string;
	};

	let links: link[] = [
		{
			path: '/',
			icon: faHouse,
			title: 'Home'
		}
	];
</script>

<nav>
	<ul>
		{#each links as { path, icon, title }}
			<li>
				<a href={path} aria-label={title}>
					<Fa {icon} />
				</a>
				<Path />
			</li>
		{/each}
		<li>
			<div class="search">
				<Search {all_users} />
			</div>
			<div class="dropdown-menu">
				<Dropdownmenu {auth} {username} />
			</div>
		</li>
	</ul>
</nav>

<style lang="scss">
	@import '$lib/scss/Nav/Nav.scss';
</style>
