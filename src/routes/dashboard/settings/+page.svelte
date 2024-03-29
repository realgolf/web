<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/shared/utils/capitalizeFirstLetter';
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	export let form;
	export let data;

	// eslint-disable-next-line
	let handicap_history: any[] | undefined = [];

	onMount(() => {
		handicap_history = data.handicap_history;
	});

	onMount(() => {
		const newPasswordInput = document.getElementById('new_password_input') as HTMLInputElement;
		const currentPasswordInput = document.getElementById(
			'current_password_input'
		) as HTMLInputElement;
		const confirmPasswordInput = document.getElementById(
			'confirm_password_input'
		) as HTMLInputElement;

		const toggleButton = document.getElementById('toggle_password');

		if (toggleButton && newPasswordInput && currentPasswordInput && confirmPasswordInput) {
			toggleButton.addEventListener('click', function (event) {
				event.preventDefault(); // Prevent form submission

				if (
					newPasswordInput.type === 'password' &&
					currentPasswordInput.type === 'password' &&
					confirmPasswordInput.type === 'password'
				) {
					newPasswordInput.type = 'text';
					currentPasswordInput.type = 'text';
					confirmPasswordInput.type = 'text';
				} else {
					newPasswordInput.type = 'password';
					currentPasswordInput.type = 'password';
					confirmPasswordInput.type = 'password';
				}
			});
		}
	});

	let show_copy_info = false;

	function copy_to_clipboard(id: string) {
		if (window) {
			window.navigator.clipboard.writeText(id);
			show_copy_info = true;
			setTimeout(() => {
				show_copy_info = false;
			}, 3000);
		}
	}
</script>

<svelte:head>
	<title>Real Golf - Settings</title>
</svelte:head>

<h1>Settings</h1>

{#if form?.message}
	<p class="success">
		{form.message}
	</p>
{/if}

{#if form?.error}
	<p class="error">
		{form.error}
	</p>
{/if}

{#if show_copy_info}
	<p class="success">ID copied to clipboard</p>
{/if}

<div id="account">
	<h2>Account</h2>

	<div class="id">
		<p>Your ID is: {data.id}</p>
		<button on:click={() => copy_to_clipboard(data.id)}>Copy ID</button>
		<p>
			Our team uses this ID to identify you, in the Database. Please provide our Team with this id
			when they ask for it.
		</p>
	</div>

	<form action="?/name" method="POST" autocomplete="off" class="update-form">
		<div>
			<label for="name_input">Name</label>
			<input type="text" id="name_input" name="name" value={data.name} />
		</div>
		<button aria-label="update name">Update</button>
	</form>

	<form action="?/email" method="POST" autocomplete="off" class="update-form">
		<div>
			<label for="email_input">Email</label>
			<input type="email" id="email_input" name="email" value={data.email} />
		</div>
		<button aria-label="update email">Update</button>
	</form>

	<form action="?/password" method="POST" autocomplete="off" class="update-form">
		<div>
			<label for="password_input">Password</label>
			<div>
				<label for="current_password_input">Current Password</label>
				<input type="password" id="current_password_input" name="current_password" value="" />
			</div>
			<div>
				<label for="new_password_input">New Password</label>
				<input type="password" id="new_password_input" name="new_password" value="" />
			</div>
			<div>
				<label for="confirm_password_input">Confirm Password</label>
				<input type="password" id="confirm_password_input" name="confirm_password" value="" />
			</div>
		</div>

		<div>
			<button
				id="toggle_password"
				type="button"
				aria-label="Toggle between password visible and pasword hidden"
				><Fa id="eye_icon" icon={faEye} /></button
			>
			<button aria-label="update password">Update</button>
		</div>
	</form>
</div>

<div class="handicap">
	<h2>Handicap</h2>
	<p class="success">
		The Handicap in Golf is a numerical measure of a golfer's ability, or potential ability, that is
		used to enable players of different abilities to compete against one another.
	</p>
	<p class="underline">Your current Handicap is: {data.handicap}</p>
	<p class="underline">
		You've updated your handicap the last time at the {data.handicap_updated.toLocaleString()}
	</p>
	<p>
		When your Handicap has changed you can also update it here, so you can keep track of your
		Handicap at all times.
	</p>

	<div id="update-handicap">
		<form action="?/handicap" method="POST" class="handicap-form">
			<label for="handicap">Enter your new Handicap here:</label>
			<input type="string" name="handicap" id="handicap" bind:value={data.handicap} />
			<button aria-label="Update Handicap">Update</button>
		</form>
	</div>

	{#if handicap_history && handicap_history.length > 0}
		<div class="handicap_history">
			<details>
				<summary>Handicap History</summary>
				{#each handicap_history.slice().reverse() as handicap}
					<div>
						<p>Handicap: {handicap.handicap}</p>
						<p>Updated at the: {new Date(handicap.date).toLocaleString()}</p>
					</div>
				{/each}
				<form action="?/clear_handicap_history" method="POST">
					<button>Clear History</button>
				</form>
			</details>
		</div>
	{/if}
</div>

<div class="measurement">
	<h2>Measurement Unit</h2>
	<p class="underline">
		Your current measurement unit is: {capitalizeFirstLetter(data.measurement_unit)}
	</p>
	<form action="?/measurement" method="POST" class="measurement-form">
		<label for="measurement-unit">Select your prefered Measurement Unit:</label>
		<select id="measurement-unit" name="measurement-unit" bind:value={data.measurement_unit}>
			<option value="yards">Yards</option>
			<option value="meters">Meters</option>
		</select>
		<br />
		<button aria-label="update Measurement Unit">Update</button>
	</form>
</div>

<div id="preferences">
	<h2>Appearence</h2>
	<p class="underline">
		Your currently saved Theme is: {capitalizeFirstLetter(data.theme)}
	</p>
	<form action="?/theme" method="POST" class="theme-form">
		<label for="theme-settings">Select your prefered Theme Setting:</label>
		<select id="theme-settings" name="theme-settings" bind:value={data.theme}>
			<option value="dark">Dark</option>
			<option value="light">Light</option>
			<option value="system">System</option>
		</select>
		<br />
		<button aria-label="update Theme">Update</button>
	</form>

	<h2>Rounded Corners</h2>
	<p class="underline">
		Your currently saved Rounded Corners Setting is: {JSON.stringify(data.rounded_corners)}
	</p>
	<form action="?/rounded_corners" method="POST" class="rounded-corners-form">
		<div class="same-row">
			<label for="rounded-corners-settings">Select your prefered Rounded Corners Setting:</label>
			<input
				type="checkbox"
				name="rounded-corners"
				id="rounded-corners"
				bind:checked={data.rounded_corners}
			/>
		</div>
		<br />
		<button aria-label="update Rounded Corners">Update</button>
	</form>
</div>

<div class="delete-account">
	<h2 class="danger-zone">Danger Zone</h2>
	<h2 class="error">Your Account will be lost forever! (a long time!)</h2>
	<form action="?/delete_account" method="POST" class="delete_account_form">
		<div>
			<label for="delete_account_password_input">Password</label>
			<input
				type="password"
				id="delete_account_password_input"
				name="password_delete_account"
				value=""
			/>
		</div>
		<button aria-label="delete Account">Delete Account</button>
	</form>
</div>

<form action="/logout" method="POST" class="logout-form">
	<button>Sign out</button>
</form>

<style lang="scss">
	.id {
		margin-bottom: 1rem;

		button {
			margin: 1rem 0;
		}
	}

	.handicap_history > details {
		&[open] summary {
			text-decoration: underline;
			margin-bottom: 20px;
		}

		div {
			background-color: var(--nav-color);
			width: max-content;
			padding: 50px 50px;
			border-radius: var(--border-radius);
			border: 3px solid var(--border-color);
			margin-right: auto;
			margin-bottom: 20px;
		}
	}

	.update-form {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: 1rem;
	}

	.same-row {
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

	.logout-form {
		margin-top: 1.5rem;
	}

	.error {
		font-size: var(--medium-font);
	}

	.danger-zone {
		color: red;
	}

	.underline {
		text-decoration: underline;
	}
</style>
