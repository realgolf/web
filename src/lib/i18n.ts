import { init, register } from 'svelte-i18n';

console.log('register');

register('en', () => import('../locales/en.json'));
register('fr', () => import('../locales/fr.json'));

console.log('init');

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});
