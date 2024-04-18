import { init, register } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('fr', () => import('../locales/fr.json'));
register('de', () => import('../locales/de.json'));
register('es', () => import('../locales/es.json'));
register('it', () => import('../locales/it.json'));
register('pt', () => import('../locales/pt.json'));

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});
