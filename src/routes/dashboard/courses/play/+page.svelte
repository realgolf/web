<script lang="ts">
	import type { Course_Data } from '$lib/types/courses';
	import { _, isLoading } from 'svelte-i18n';

	export let data: Course_Data;
</script>

<svelte:head>
	<title>Real Golf - {$_("course")}</title>
</svelte:head>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<h1>{$_("course")}</h1>

	{#if data.courses}
		<div class="courses">
			{#each data.courses as course}
				<div class="course">
					<p><span>{$_("name")}:</span> {course.name}</p>
					<p><span>{$_("location")}:</span> {course.location}</p>
					<p><span>{$_("par")}:</span> {course.total_par}</p>
				</div>
			{/each}
		</div>
	{/if}
{/if}

<style lang="scss">
	.courses {
		display: flex;
		flex-wrap: wrap;

		.course {
			border-bottom: 1px solid var(--border-color);
			margin: 10px;
			padding: 10px;
		}
	}
</style>
