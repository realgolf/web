<script lang="ts">
	import type { PageData } from '../../../routes/[name]/$types';

	export let data: PageData;
</script>

{#if data.user_registration_date}
	<div class="registration_date">
		<p>
			{data.user_username} joined RealGolf.Games on {data.user_registration_date.toLocaleDateString()}.
		</p>
	</div>
{/if}
