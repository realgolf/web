<script lang="ts">
	export let display_socials: string;
</script>

<div class="social">
	<label for="socials">Socials (one per line)</label>
	<textarea bind:value={display_socials} name="socials" id="socials" rows="3" />
</div>

<style lang="scss">
	@import '$lib/scss/Public/Bio.scss';
</style>
