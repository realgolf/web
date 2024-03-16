<script>
	import { faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import {
		faBook,
		faBookBookmark,
		faBookOpenReader,
		faEnvelope
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<footer>
	<div class="container">
		<div class="row">
			<div class="same-line">
				<div class="col-md-6 first-row">
					<h3>Contact Us</h3>
					<p>
						<Fa icon={faEnvelope} /> Email:
						<a href="mailto:info@realgolf.games">info@realgolf.games</a>
					</p>
				</div>
				<div class="col-md-6 first-row">
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
				<div class="col-md-6 first-row">
					<h3>Explore More</h3>
					<p><Fa icon={faBookOpenReader} /> <a href="https://blog.realgolf.games">Blog</a></p>
					<p><Fa icon={faBook} /> <a href="https://docs.realgolf.games">Documentation</a></p>
					<p><Fa icon={faBookBookmark} /> <a href="https://rules.realgolf.games">Golfrules</a></p>
				</div>
			</div>
			<div class="col-md-6">
				<p>Copyright &copy; 2021 - 2024 <a href="https://realgolf.games">RealGolf.Games</a></p>
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

		.container {
			@media screen and (max-width: 767px) {
				width: 90vw;
			}

			.row {
				width: 50vw;

				@media screen and (max-width: 767px) {
                    display: flex;
					align-items: center;
				}

				.same-line {
					display: flex !important;
					flex-wrap: wrap !important;

					@media screen and (min-width: 767px) {
						.first-row:not(:first-child) {
							margin: 0 2rem;
						}
					}

					@media only screen and (max-width: 767px) {
						padding: 0 4vw;
						margin-right: -16px;
						margin-left: -16px;
						display: flex;
						flex-direction: column;
					}
				}
			}
		}
	}
</style>
