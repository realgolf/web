<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { PageData } from '../../../../../routes/[name]/$types';

	export let data: PageData;
</script>

<div class="status">
	<label for="status_input">{$_("edit_status")}</label>
	<input type="text" name="status_text" id="status_text" bind:value={data.user_status.text} />
	<div class="checkbox busy">
		<label for="busy">{$_("busy")}</label>
		<input type="checkbox" name="busy" id="busy" bind:checked={data.user_status.busy} />
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/Public/Bio.scss';
</style>
