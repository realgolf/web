<script lang="ts">
	import { get_timestamp } from '$lib/shared/utils/getTimestamp';
	import type { message } from '$lib/types/chat';
	export let messages: message[] = [];
	export let messages_element: HTMLElement;
</script>

<section bind:this={messages_element}>
	<ol>
		{#each messages as message}
			<li class:bot={message.bot}>
				{#if !message.bot}
					<span class="author">{message.author} <small id="grey">- {get_timestamp()}</small>:</span>
				{/if}
				<span>{message.text}</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	section {
		padding: 0.5rem;
		overflow-y: scroll;
		scroll-behavior: smooth;
	}

	ol {
		list-style-type: none;
	}

	li {
		margin-bottom: 0.5rem;
	}

	.author {
		color: var(--dark-font-color);
	}

	.bot {
		font-weight: bold;
	}

	small#grey {
		color: grey;
	}
</style>
