<script lang="ts">
	export let data: PageData;
</script>

<div class="vcard-names">
	<span class="vcard-nickname">{data.user_username}</span>
	<br />
	<span class="vcard-fullname">{data.user_name}</span>
</div>

<style lang="scss">
	.vcard-names {
		line-height: 1;

		.vcard-fullname {
			line-height: 24px;
			color: grey !important;
		}

		.vcard-nickname {
			font-size: 2rem;
			font-weight: 400;
			line-height: 1.25;
		}
	}
</style>
