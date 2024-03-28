<script lang="ts">
	import { faUsers } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { PageData } from '../../../../routes/[name]/$types';

	export let data: PageData;
</script>

{#if data.followers && data.following}
	<p class="followers">
		<span><Fa icon={faUsers} /></span>
		{data.followers.count} Followers · {data.following.count} Following
	</p>
{/if}
