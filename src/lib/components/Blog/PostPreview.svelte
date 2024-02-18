<script lang="ts">
	import type { posts } from '$lib/scripts/Blog/types';
	import PreviewCard from './PreviewCard.svelte';

	export let post: posts;

	$: draft = post.id.startsWith('_draft'); // Check if the post is a draft
</script>

<li>
	<PreviewCard href="/blog/{post.id}">
		<h2 class:draft>
			{post.title}
		</h2>
		<div class="date">
			{post.published.toLocaleDateString()}
		</div>
		<p>
			{post.description}
		</p>
		<div class="more_blog">More...</div>
	</PreviewCard>
</li>

<style lang="scss">
	.date {
		color: #999;
		font-size: var(--small-font);
		margin-bottom: 0.5rem;
	}

	.draft {
		opacity: 0.5;
		&::before {
			content: '[Draft] ';
		}
	}
</style>
