<script lang="ts">
	import type { Course_Data } from '$lib/types/courses';

	export let data: Course_Data;
</script>

<h1>Course</h1>

{#if data.courses}
	<div class="courses">
		{#each data.courses as course}
			<div class="course">
				<p><span>Name:</span> {course.name}</p>
				<p><span>Location:</span> {course.location}</p>
				<p><span>Par:</span> {course.total_par}</p>
			</div>
		{/each}
	</div>
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
