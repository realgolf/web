<script>
	import PostPreview from '$lib/components/Blog/PostPreview.svelte';

	export let data;
	const { posts } = data;
</script>

<svelte:head>
	<title>RealGolf.Games Blog</title>
</svelte:head>

<h1>RealGolf.Games Blog</h1>

<p>
	Here you can find Blog Posts about new features of RealGolf Games or feature we are currently
	developing, as well as server or database outages so you are always up to date.
</p>

<ol class="no-bullets">
	{#each posts as post (post.id)}
		<PostPreview {post} />
	{/each}
</ol>

<style>
	ol {
		margin-top: 1rem;
	}
</style>
