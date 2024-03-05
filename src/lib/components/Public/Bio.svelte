<script lang="ts">
	import { modify_social } from '$lib/scripts/Public/modify_socials';
	import type { matchedSocials } from '$lib/types/matched_socials';
	import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { PageData } from '../../../routes/[name]/$types';
	import Status from './Status.svelte';

	export let data: PageData;

	let editing = false;

	function handleCancel(event: { preventDefault: () => void }) {
		event.preventDefault();
		editing = false;
	}

	let display_socials = data.socials?.map((social) => `${social}\n`).join('') ?? '';

	type socialsRender = matchedSocials[];

	let socials_render: socialsRender = [];

	// Call modify_social() and assign the result to socials_render
	socials_render = modify_social(data);
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
			<div class="pronoun">
				<label for="pronouns">Pronouns</label>
				<select name="pronoun" id="pronoun" bind:value={data.pronoun}>
					<option value="dont">Don't specify</option>
					<option value="he/him">he/him</option>
					<option value="she/her">she/her</option>
					<option value="they/them">they/them</option>
					<option value="custom">Costum</option>
				</select>
				{#if data.pronoun == 'custom'}
					<input
						type="text"
						name="custom_pronoun"
						id="custom_pronoun"
						bind:value={data.custom_pronoun}
					/>
				{/if}
			</div>
			<div class="social">
				<label for="socials">Socials (one per line)</label>
				<textarea bind:value={display_socials} name="socials" id="socials" rows="3" />
			</div>
			<div class="status">
				<label for="status_input">Edit status</label>
				<input type="text" name="status_text" id="status_text" bind:value={data.user_status.text} />
				<div class="checkbox busy">
					<label for="busy">Busy</label>
					<input type="checkbox" name="busy" id="busy" bind:checked={data.user_status.busy} />
				</div>
			</div>
			<button type="submit">Save</button>
			<button type="button" on:click={handleCancel}>Cancel</button>
		</form>
	{:else if data.sameUser}
		{#if data.user_status.text}
			<Status {data} />
		{/if}
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
	{:else}
		{#if data.user_status.text}
			<Status {data} />
		{/if}
		{#if data.user_bio}
			<p>{data.user_bio}</p>
		{/if}
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
	@import '$lib/scss/Public/Bio.scss';
</style>
