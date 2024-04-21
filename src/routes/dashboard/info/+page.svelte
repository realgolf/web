<script lang="ts">
	import { _, isLoading } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Real Golf - {$_('info')}</title>
</svelte:head>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<h1>{$_('info')}</h1>

	<p>
		{@html $_('info_text')}
	</p>

	<p>
		{@html $_("link_to_tools")}
	</p>
{/if}
