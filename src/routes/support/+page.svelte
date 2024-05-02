<svelte:head>
	<title>Real Golf - Support</title>
</svelte:head>

<h1>Support</h1>

<form method="POST" autocomplete="off">
	<label for="name">Name</label>
	<input type="text" id="name" name="name" />
	<label for="email">Your Email</label>
	<input type="text" id="email" name="email" />
	<label for="subject">Subject</label>
	<select name="subject" id="subject">
		<option value="other">Other</option>
		<option value="account">Account</option>
		<!-- <option value="payment">Payment</option> -->
		<option value="technical">Technical</option>
		<option value="bug">Bug</option>
		<option value="feature">Feature Request</option>
	</select>
	<label for="message">Message</label>
	<textarea name="message" id="message" cols="30" rows="10" />
	<br />
	<button type="submit">Submit</button>
</form>

<style lang="scss">
	textarea {
		background-color: var(--background-color);
		color: var(--font-color);
		font-size: var(--medium-font);
		width: 100%;
	}
</style>
