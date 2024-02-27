<script lang="ts">
	import { page } from '$app/stores';
	import { getPagePath } from '$lib/scripts/Nav/get_page_path';
	import sanitizeHTML from '$lib/shared/utils/sanitizeHTML';

	$: currentPagePath = $page.url.pathname;
</script>

<span class="no-line" use:sanitizeHTML={[getPagePath(currentPagePath)]} />

<style lang="scss">
	span {
		margin-left: 15px;
	}
</style>
