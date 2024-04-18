<script>
	import Exact from '$lib/components/Home_Page/Feature/Exact.svelte';
	import FourWinning from '$lib/components/Home_Page/Feature/FourWinning.svelte';
	import Precision from '$lib/components/Home_Page/Feature/Precision.svelte';
	import { _, isLoading } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Real Golf</title>
</svelte:head>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<main>
		<section class="hero">
			<div class="hero-content">
				<img src="/home_page/banner.png" alt="RealGolf.Games Banner" />
				<p id="ultimate_destination">
					{$_('ultimate_destination')}
				</p>
				<a href="/register" class="btn">Sign Up for RealGolf.Games</a>
			</div>
		</section>

		<section class="features">
			<h2>Features</h2>
			<FourWinning />
			<Exact />
			<Precision />
		</section>

		<section class="testimonial">
			<h2>What our Users say</h2>
			<blockquote>
				"I just signed up for RealGolf.Games, and I can already tell it's going to revolutionize how
				I enjoy practicing on the range. It's like unlocking a whole new level of fun!"
			</blockquote>
			<cite>- <a href="/Thorsten">Thorsten Hammer</a>, first user</cite>
		</section>

		<section class="cta">
			<h2>Ready to take your golf game to the next level?</h2>
			<p>
				Whether you want to have a challange during training or just want to be more motivated going
				onto the Range and hit some Balls, RealGolf.Games is your place to go.
			</p>
			<a href="/register" class="btn">Sign Up for RealGolf.Games</a>
		</section>
	</main>
{/if}

<style lang="scss">
	@import '$lib/scss/Home_page/main.scss';
</style>
