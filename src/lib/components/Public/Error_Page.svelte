<script lang="ts">
	export let path: string;
</script>

<div class="error-container">
	<h1 class="error">404 - User/Page Not Found!</h1>
	<p>
		We couldn't find the user or page for the path: <strong>{path}</strong>
	</p>
	<p>Please check the path for any errors, ensure it is correctly spelled, and try again.</p>
	<p>Go back to <a href="/">home</a>.</p>
</div>
