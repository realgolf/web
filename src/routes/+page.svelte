<script>
	import Exact from '$lib/components/Home_Page/Feature/Exact.svelte';
	import FourWinning from '$lib/components/Home_Page/Feature/FourWinning.svelte';
	import Precision from '$lib/components/Home_Page/Feature/Precision.svelte';
</script>

<svelte:head>
	<title>Real Golf</title>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-content">
			<img src="/home_page/banner.png" alt="RealGolf.Games Banner" />
			<p>Your ultimate destination for challenging and immersive golf experiences.</p>
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
		<blockquote>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam. Quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</blockquote>
		<cite>- Max Musterman, first user</cite>
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

<style lang="scss">
	@import '$lib/scss/Home_page/main.scss';
</style>
