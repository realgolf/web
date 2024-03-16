<script>
	import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<footer>
	<div class="container">
		<div class="row">
			<div class="same-line">
				<div class="col-md-6">
					<h3>Contact Us</h3>
					<p>
						<Fa icon={faEnvelope} /> Email:
						<a href="mailto:info@realgolf.games">info@realgolf.games</a>
					</p>
				</div>
				<div class="col-md-6">
					<h3>Follow Us</h3>
					<p>
						<Fa icon={faXTwitter} /> Twitter:
						<a href="https://twitter.com/realgolfgames">@RealGolfGames</a>
					</p>
					<p>
						<Fa icon={faInstagram} /> Instagram:
						<a href="https://instagram.com/realgolfgames">@RealGolfGames</a>
					</p>
					<p>
						<Fa icon={faYoutube} /> YouTube:
						<a href="https://www.youtube.com/@realgolfgames">RealGolfGames</a>
					</p>
				</div>
			</div>
			<div class="col-md-6">
				<p>Copyright &copy; 2022 - 2024 <a href="https://realgolf.games">RealGolf.Games</a></p>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		border-top: 2px solid var(--border-color);
		width: 100vw;
		margin-top: 5vh;
		padding: 2vh 3vw;
		overflow-x: hidden;
		display: flex;
		justify-content: left;

		.row {
			width: 50vw;

			.same-line {
				display: flex;
				flex-direction: row;
				align-items: top;
				justify-content: space-between;
			}
		}
	}
</style>
