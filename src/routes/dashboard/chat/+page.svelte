<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Messages from '$lib/components/Chat/Messanges.svelte';
	import SendForm from '$lib/components/Chat/SendForm.svelte';
	import Status from '$lib/components/Chat/Status.svelte';
	import type {
		ClientToServerEvents,
		message,
		ServerToClientEvents,
		user_chat
	} from '$lib/types/chat';
	import { io, type Socket } from 'socket.io-client';
	import { tick } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let username: string = data.username as string;
	let messages: message[] = [];
	let messages_element: HTMLElement;
	let chat_users: user_chat[] = [];
	let text = '';
	let socket: undefined | Socket<ServerToClientEvents, ClientToServerEvents>;

	console.log('name', username);

	if (browser && !username) {
		goto('/dashboard/chat');
	} else {
		setup_socket();
	}

	function setup_socket() {
		socket = io();

		socket.on('message', async (message: message) => {
			messages = [...messages, message];
			scroll_to_bottom();
		});

		socket.on('users', (_users: user_chat[]) => {
			chat_users = _users;
		});
	}

	function send_message() {
		socket?.emit('message', {
			author: username,
			text: text,
			bot: false
		});
		text = '';
	}

	async function scroll_to_bottom() {
		await tick();
		if (messages_element) {
			messages_element.scrollTop = messages_element.scrollHeight;
		}
	}
</script>

{#if username}
	<Status {chat_users} {username} />
	<Messages bind:messages bind:messages_element />
	<SendForm bind:text {send_message} />
{:else}
	<p>You are not logged in.</p>
{/if}

<style>
	p {
		text-align: center;
		padding-block: 1rem;
	}
</style>
