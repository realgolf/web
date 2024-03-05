<script lang="ts">
	import type { PageData } from '../../../routes/[name]/$types';

	export let data: PageData;
</script>

<div class="status">
	<p>{data.user_status.text}</p>
	{#if data.user_status.busy == true}
		<p>Busy</p>
	{/if}
</div>

<style lang="scss">
	.status {
		display: flex;
		flex-direction: row;
	}
</style>
