<script lang="ts">
	import { isoLangs } from '$lib/i18n/ISO_639-1';
	import { capitalizeFirstLetter } from '$lib/shared/utils/capitalizeFirstLetter';
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

	// Function to handle changing the locale
	function changeLocale(newLocale: string) {
		locale.set(newLocale);
	}

    // Function to get the Native name of the language
    function getNativeLang(lang: string) {
        return capitalizeFirstLetter((isoLangs as Record<string, { name: string; nativeName: string }>)[lang].nativeName.split(',')[0].trim().replace(/\s/g, ''));
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
		{#each $locales as lang}
			<button id={`language-button-${lang}`} class="language-selector-btn" on:click={() => changeLocale(lang)}>{getNativeLang(lang)}</button>
		{/each}
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/Nav/LanguageSwitcher.scss';

    .language-selector-btn {
        background-color: transparent;
        border: 1px solid var(--border-color) !important;
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        margin: 0.5rem;
        padding: 0.5rem;
    }
</style>
