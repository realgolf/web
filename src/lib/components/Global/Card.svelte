<script lang="ts">
	export let title: string;
	export let link: string;
	export let description: string;
</script>

<a href={link} class="card_normal">
	<div>
		<h3>{title}</h3>
		<p class="description">{description}</p>
	</div>
</a>

<style lang="scss">
	.card_normal {
		background-color: var(--nav-color);
		padding: 50px 50px;
		border-radius: var(--border-radius);
		border: 1px solid var(--border-color);
		margin: 15px;
		text-align: center;
		text-decoration: none;

		&:hover {
			cursor: pointer;
			box-shadow: 10px 10px 20px var(--border-color);
		}
		h3 {
			text-align: center;
			text-decoration: underline;
		}

		.description {
			text-align: center;
			width: 50%;
			margin: 0 auto;
		}
	}

	/* On Desktop: Cards are 40vw */
	@media (min-width: 768px) {
		.card_normal {
			width: calc(40vw);
		}
	}

	/* On phone: Cards are 80vw */
	@media (max-width: 767px) {
		.card_normal {
			width: 80vw;

			.description {
				text-align: center;
				width: 100%;
				margin: 0 auto;
			}
		}
	}
</style>
