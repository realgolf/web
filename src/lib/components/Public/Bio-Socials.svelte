<script lang="ts">
	import { social_links } from '$lib/scripts/social_links.js';
	import { faEnvelope, faLink, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { PageData } from '../../../routes/[name]/$types';

	export let data: PageData;

	let editing = false;

	type matchedSocials = {
		link: string;
		domain: string;
		logo: IconDefinition | undefined;
		username: string;
	};

	function handleCancel(event: { preventDefault: () => void }) {
		event.preventDefault();
		editing = false;
	}

	let display_socials = data.socials?.map((social) => `${social}\n`).join('') ?? '';

	function modify_social() {
		let socials = data.socials;
		let matchedSocials: matchedSocials[] = [];

		if (socials) {
			socials.forEach((social) => {
				let matched = false;
				for (const social_link of social_links) {
					let pattern = new RegExp('^' + social_link.domain.replace('*', '.*'));
					if (pattern.test(social)) {
						matched = true;
						let url = new URL(social);
						let username;

						// Check for Lichess and Chess.com special cases
						if (social_link.domain === 'https://lichess.org/@/*') {
							username = url.pathname.split('@/')[1]; // Get the part after '@/'
						} else if (social_link.domain === 'https://www.chess.com/members/*') {
							username = url.pathname.split('/')[2]; // Get the part after 'members/'
						} else {
							username = url.pathname.substring(1); // Remove the leading slash
						}

						matchedSocials.push({
							link: social,
							domain: social_link.domain,
							logo: social_link.logo,
							username: username // Add the username to the object
						});
						break; // Break out of the loop once we find a match
					}
				}
				if (!matched) {
					matchedSocials.push({
						link: social,
						domain: social,
						logo: undefined,
						username: social
					});
				}
			});
		}

		return matchedSocials;
	}

	type socialsRender = matchedSocials[];

	let socials_render: socialsRender = [];
	// Call modify_social() and assign the result to socials_render
	socials_render = modify_social();
</script>

<div class="bio">
	{#if editing}
		<form action="?/edit_profile" method="POST">
			<label for="bio">Bio</label>
			<textarea bind:value={data.user_bio} name="bio" id="bio" rows="3" />
			<div class="checkbox">
				<label for="email_public">Display Email Public</label>
				<input
					type="checkbox"
					name="email_public"
					id="email_public"
					bind:checked={data.user_email_public}
				/>
			</div>
			<label for="socials">Socials (one per line)</label>
			<textarea bind:value={display_socials} name="socials" id="socials" rows="3" />
			<button type="submit">Save</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</form>
	{:else if data.sameUser}
		{#if data.user_bio}
			<p>{data.user_bio}</p>
		{/if}
		<button style="margin-bottom: 1rem;" on:click={() => (editing = true)}>Edit profile</button>
		<br />
		{#if data.user_email_public}
			<a href="mailto:{data.user_email}"><Fa icon={faEnvelope} /> <span>{data.user_email}</span></a>
		{/if}
		{#if data.socials}
			<div class="socials" style="margin-bottom: 1rem;">
				{#each socials_render as social}
					{#if social.logo != undefined}
						<p style="margin-bottom: 0px;">
							<a target="_blank" style="text-decoration: none;" href={social.link}
								><span><Fa icon={social.logo} /></span> {social.username}</a
							>
						</p>
					{:else}
						<p style="margin-bottom: 0px;">
							<a target="_blank" style="text-decoration: none;" href={social.link}>
								<span><Fa icon={faLink} /></span>
								<span>{social.username}</span>
							</a>
						</p>
					{/if}
				{/each}
			</div>
		{/if}
	{:else if data.user_bio && data.socials && data.user_email_public}
		<p>{data.user_bio}</p>
		{#if data.user_email_public == true}
			<p><Fa icon={faEnvelope} /> <span>{data.user_email}</span></p>
		{/if}
		<div class="socials">
			{#each socials_render as social}
				{#if social.logo != undefined}
					<p style="margin-bottom: 0px;">
						<a target="_blank" style="text-decoration: none;" href={social.link}
							><span><Fa icon={social.logo} /></span> {social.username}</a
						>
					</p>
				{:else}
					<p style="margin-bottom: 0px;">
						<a target="_blank" style="text-decoration: none;" href={social.link}>
							<span><Fa icon={faLink} /></span>
							<span>{social.username}</span>
						</a>
					</p>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.bio {
		padding: 0.5rem 0;
		max-width: 296px;

		textarea {
			background-color: var(--background-color);
			color: var(--font-color);
			font-size: var(--medium-font);
			width: 100%;
		}

		.checkbox {
			display: flex;
			flex-direction: row;

			& > label {
				height: max-content;
				margin-bottom: 0;
			}

			input {
				margin-top: 0.1rem;
				margin-left: 1rem;
			}
		}
	}
</style>
