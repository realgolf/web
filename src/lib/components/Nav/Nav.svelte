<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '$lib/server/user/types';
	import { capitalizeFirstLetter } from '$lib/shared/utils/capitalizeFirstLetter';
	import { faHouse, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Dropdownmenu from './Dropdownmenu.svelte';
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

	$: currentPagePath = $page.url.pathname;

	function getPagePath() {
		const path = currentPagePath;

		if (path === '/') {
			return '<strong>Home</strong>';
		}

		const pathParts = path.split('/').filter((part) => part !== '');
		let breadcrumbPath = '';

		for (let i = 0; i < pathParts.length; i++) {
			const pathBefore = pathParts.slice(0, i + 1).join('/');
			const isLastSegment = i === pathParts.length - 1;
			const isFirstSegment = i === 0;

			if (isLastSegment) {
				breadcrumbPath += ` ${
					isFirstSegment ? '' : "<span style='color: darkgrey;'>/</span>"
				} <strong>${capitalizeFirstLetter(pathParts[i])}</strong>`;
			} else {
				breadcrumbPath += isFirstSegment
					? ` <a href="/${pathBefore}" style="text-decoration: none;">${capitalizeFirstLetter(
							pathParts[i]
					  )}</a>`
					: ` <span style="color: darkgrey;">/</span> <a href="/${pathBefore}" style="text-decoration: none;">${capitalizeFirstLetter(
							pathParts[i]
					  )}</a>`;
			}
		}

		return breadcrumbPath;
	}
</script>

<nav>
	<ul>
		{#each links as { path, icon, title }}
			<li>
				<a href={path} aria-label={title}>
					<Fa {icon} />
				</a>
				<!-- eslint-disable-next-line -->
				<span class="no-line">{@html getPagePath()}</span>
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
