<script lang="ts">
	import type { PageData } from '../../../../routes/[name]/$types';

	export let data: PageData;
</script>

<div class="checkbox">
	<label for="email_public">Display Email Public</label>
	<input
		type="checkbox"
		name="email_public"
		id="email_public"
		bind:checked={data.user_email_public}
	/>
</div>

<style lang="scss">
	@import '$lib/scss/Public/Bio.scss';
</style>
