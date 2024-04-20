<script lang="ts">
	import { faGlobe } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { locale, locales } from 'svelte-i18n';

	let isLanguageSwitcherOpen = false;

	function toggleLanguageSelector() {
		console.log('toggleLanguageSelector');
		isLanguageSwitcherOpen = !isLanguageSwitcherOpen;
		console.log('toggle success');
	}

	function closeLanguageSelector() {
		isLanguageSwitcherOpen = false;
	}

	// onMount(() => {
	// 	window.addEventListener('keypress', (e) => {
	// 		if (e.key === 'l' && e.ctrlKey) {
	// 			toggleLanguageSelector();
	// 		}
	// 	});

	// 	function closeLanguageSelectorOnClick(event: MouseEvent | TouchEvent): void {
	// 		if (
	// 			event.target instanceof Element &&
	// 			!event.target.closest('.language-switcher') &&
	// 			!event.target.closest('.language-switcher-button') &&
	// 			!event.target.closest('.language-switcher-content')
	// 		) {
	// 			closeLanguageSelector();
	// 		}
	// 	}

	// 	window.addEventListener('click', closeLanguageSelectorOnClick);
	// 	window.addEventListener('touchend', closeLanguageSelectorOnClick);

	// 	onDestroy(() => {
	// 		window.removeEventListener('click', closeLanguageSelector);
	// 	});
	// });
</script>

<div class="language-switcher">
	<button class="language-switcher-button" on:click|stopPropagation={toggleLanguageSelector}>
		<Fa icon={faGlobe} />
	</button>
</div>
{#if isLanguageSwitcherOpen}
	<div class="blurry-background" />
	<div class="language-switcher-content">
		<button class="close-button" on:click={closeLanguageSelector}>x</button>
		{$locale}
		<select bind:value={$locale}>
			{#each $locales as locale}
				<option value={locale}>{locale}</option>
			{/each}
		</select>
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/LanguageSwitcher.scss';
</style>
