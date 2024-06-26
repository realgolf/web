<script lang="ts">
	import {
		faBars,
		faBook,
		faBookBookmark,
		faBookOpenReader,
		faChartLine,
		faDownload,
		faGamepad,
		faGavel,
		faGear,
		faHouse,
		faInfoCircle,
		faMessage,
		faQuestionCircle,
		faSave,
		faSignInAlt,
		faSignOutAlt,
		faTh,
		faUser,
		faUserPlus,
		faUsers,
		faWrench
	} from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

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
			window.removeEventListener('click', closeDropdown);
		});
	});
</script>

<div class="dropdown">
	<button class="dropdown-button" on:click|stopPropagation={toggleDropdown}>
		<Fa icon={faBars} />
	</button>
</div>
{#if isOpen}
	<div class="blurry-background" />
	<div class="dropdown-content">
		<button class="close-button" on:click={closeDropdown}>x</button>
		<div class="home row border-bottom">
			<a href="/"><span><Fa icon={faHouse} /></span>{$_('home')}</a>
			<a href="/download"><span><Fa icon={faDownload} /></span>{$_('download')}</a>
		</div>
		{#if !auth}
			<div class="logged-out row border-bottom">
				<h3>{$_('sign_in')}</h3>
				<a href="/register"><span><Fa icon={faUserPlus} /></span>{$_('register')}</a>
				<a href="/login"><span><Fa icon={faSignInAlt} /></span>{$_('login')}</a>
			</div>
		{/if}
		{#if auth}
			<div class="logged-in row border-bottom">
				<h3>{$_('account')}</h3>
				<a href="/{username}"><span><Fa icon={faUser} /></span>{username}</a>
				<a href="/dashboard"><span><Fa icon={faTh} /></span>{$_('dashboard')}</a>
				<a href="/dashboard/settings"><span><Fa icon={faGear} /></span>{$_('settings')}</a>
				<a href="/dashboard/chat"><span><Fa icon={faMessage} /></span>{$_('chat')}</a>
			</div>
			<div class="internal-links row border-bottom">
				<h3>{$_('internal_links')}</h3>
				<a href="/dashboard/games"><span><Fa icon={faGamepad} /></span>{$_('games')}</a>
				<a href="/dashboard/archive"><span><Fa icon={faSave} /></span>{$_('archive')}</a>
				<a href="/dashboard/info"><span><Fa icon={faInfoCircle} /></span>{$_('info')}</a>
				<a href="/dashboard/levels"><span><Fa icon={faChartLine} /></span>{$_('levels')}</a>
				<a href="/dashboard/rules"><span><Fa icon={faBook} /></span>{$_('rules')}</a>
				<a href="/dashboard/tools"><span><Fa icon={faWrench} /></span>{$_('tools')}</a>
			</div>
		{/if}
		<div class="external-links row border-bottom">
			<h3>{$_('external_sites')}</h3>
			<a href="https://blog.realgolf.games"
				><span><Fa icon={faBookOpenReader} /></span>{$_('blog')}</a
			>
			<a href="/faq"><span><Fa icon={faQuestionCircle} /></span>{$_('faq')}</a>
			<a href="https://docs.realgolf.games"
				><span><Fa icon={faBook} /></span>{$_('documentation')}</a
			>
			<a href="https://rules.realgolf.games"
				><span><Fa icon={faBookBookmark} /></span>{$_('golfrules')}</a
			>
		</div>
		<div class="copyright row border-bottom">
			<p><a href="/support"><Fa icon={faUsers} /> {$_('support')}</a></p>
			<p><a href="/imprint"><Fa icon={faGavel} /> {$_('imprint_heading')}</a></p>
			<p>© 2024 RealGolf.Games</p>
			<p>{$_('all_rights_reserved')}</p>
			<p>
				<a class="underline" target="_blank" href="https://github.com/realgolf">{$_('github')}</a>
			</p>
		</div>
		{#if auth}
			<div class="border-bottom logout row">
				<form action="/logout" method="POST" class="logout-form">
					<button class="link"
						><span><Fa class="Fa" icon={faSignOutAlt} /></span>{$_('sign_out')}</button
					>
				</form>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/Dropdownmenu.scss';
</style>
