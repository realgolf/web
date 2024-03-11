<script lang="ts">
	import {
		faBars,
		faBook,
		faBookBookmark,
		faBookOpenReader,
		faChartLine,
		faGamepad,
		faGavel,
		faGear,
		faHouse,
		faInfoCircle,
		faQuestionCircle,
		faSave,
		faSignInAlt,
		faSignOutAlt,
		faTh,
		faUser,
		faUserPlus,
		faWrench
	} from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';

	export let auth: string | undefined;
	export let username: string | undefined;

	let isOpen = false;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	onMount(() => {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'm' && e.ctrlKey) {
				toggleDropdown();
			}
		});

		function closeDropdownOnClick(event: MouseEvent | TouchEvent): void {
			if (
				event.target instanceof Element &&
				!event.target.closest('.dropdown') &&
				!event.target.closest('.dropdown-button') &&
				!event.target.closest('.dropdown-content')
			) {
				closeDropdown();
			}
		}

		window.addEventListener('click', closeDropdownOnClick);
		window.addEventListener('touchend', closeDropdownOnClick);

		onDestroy(() => {
			window.removeEventListener('click', closeDropdownOnClick);
			window.removeEventListener('touchend', closeDropdownOnClick);
		});
	});
</script>

<div class="dropdown">
	<button class="dropdown-button" on:click|stopPropagation={toggleDropdown}>
		<Fa icon={faBars} />
		<span class="description">Menu</span>
	</button>
</div>
{#if isOpen}
	<div class="blurry-background" />
	<div class="dropdown-content">
		<button class="close-button" on:click={closeDropdown}>x</button>
		<div class="home row border-bottom">
			<a href="/"><span><Fa icon={faHouse} /></span>Home</a>
		</div>
		{#if !auth}
			<div class="logged-out row border-bottom">
				<h3>Sign in</h3>
				<a href="/register"><span><Fa icon={faUserPlus} /></span>Register</a>
				<a href="/login"><span><Fa icon={faSignInAlt} /></span>Login</a>
			</div>
		{/if}
		{#if auth}
			<div class="logged-in row border-bottom">
				<h3>Account</h3>
				<a href="/{username}"><span><Fa icon={faUser} /></span>Your Profile</a>
				<a href="/dashboard"><span><Fa icon={faTh} /></span>Dashboard</a>
				<a href="/dashboard/settings"><span><Fa icon={faGear} /></span>Settings</a>
			</div>
			<div class="internal-links row border-bottom">
				<h3>Internal Links</h3>
				<a href="/dashboard/games"><span><Fa icon={faGamepad} /></span>Games</a>
				<a href="/dashboard/archive"><span><Fa icon={faSave} /></span>Archive</a>
				<a href="/dashboard/info"><span><Fa icon={faInfoCircle} /></span>Info</a>
				<a href="/dashboard/levels"><span><Fa icon={faChartLine} /></span>Levels</a>
				<a href="/dashboard/rules"><span><Fa icon={faBook} /></span>Rules</a>
				<a href="/dashboard/tools"><span><Fa icon={faWrench} /></span>Tools</a>
			</div>
		{/if}
		<div class="external-links row border-bottom">
			<h3>External Sites</h3>
			<a href="https://blog.realgolf.games"><span><Fa icon={faBookOpenReader} /></span>Blog</a>
			<a href="/faq"><span><Fa icon={faQuestionCircle} /></span>FAQ</a>
			<a href="https://docs.realgolf.games"><span><Fa icon={faBook} /></span>Documentation</a>
			<a href="https://rules.realgolf.games"
				><span><Fa icon={faBookBookmark} /></span>Official Golf Rules</a
			>
		</div>
		<div class="copyright row border-bottom">
			<h3>Legal</h3>
			<p><a href="/imprint"><Fa icon={faGavel} /> Imprint</a></p>
			<p>© 2024 RealGolf.Games</p>
			<p>All rights reserved</p>
			<p>
				<a class="underline" target="_blank" href="https://github.com/realgolf">GitHub</a>
			</p>
		</div>
		{#if auth}
			<div class="border-bottom logout row">
				<a href="/logout"><span><Fa icon={faSignOutAlt} /></span>Sign Out</a>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/Dropdownmenu.scss';
</style>
