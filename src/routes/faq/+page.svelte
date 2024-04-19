<script lang="ts">
	import { _, isLoading } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Real Golf - FAQ</title>
</svelte:head>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<main class="wrapper">
		<h1>FAQ</h1>
		<main class="question">
			<details>
				<summary>{$_('faq_question_1')}</summary>
				<div>
					<p>
						{$_('faq_answer_1_steps')}
					</p>
					<ol class="faq-list">
						<li>
							<strong>{$_('faq_answer_1_step_1_title')}:</strong>
							{$_('faq_answer_1_step_1_description')}
						</li>
						<li>
							<strong>{$_('faq_answer_1_step_2_title')}:</strong>
							{$_('faq_answer_1_step_2_description')}
						</li>
						<li>
							<strong>{$_('faq_answer_1_step_3_title')}:</strong>
							{$_('faq_answer_1_step_3_description')}
						</li>
						<li>
							<strong>{$_('faq_answer_1_step_4_title')}:</strong>
							{$_('faq_answer_1_step_4_description')}
						</li>
					</ol>
					<p>
						{$_('faq_answer_1_conclusion')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_2_title')}</summary>
				<div>
					<p>
						{$_('faq_answer_2_content')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>Can I contribute new Games to the project?</summary>
				<div>
					<p>
						Your creative input is highly valued! If you have exciting new game ideas, we encourage
						you to get involved. Here's how:
					</p>
					<ul class="faq-list">
						<li>
							<strong>Open an Issue on GitHub:</strong> Feel free to open an Issue on our
							<a href="https://github.com/MoinJulian/Golf/issues">GitHub</a> repository and label it
							with "game". Your idea will be reviewed and considered by our team.
						</li>
						<li>
							<strong>Email Us:</strong> You can also share your ideas via email to
							<a href="mailto:support@moinjulian.com">support@moinjulian.com</a>. We welcome your
							suggestions and will eagerly explore each one.
						</li>
					</ul>
					<p>
						For your valuable contributions, your name will be recognized in our <a
							href="/Contributors.md">Contributors.md</a
						> file. Your ideas can shape the future of Real Golf, and we greatly appreciate your input.
						Let's create amazing experiences together!
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>How can I report bugs or suggest new features?</summary>
				<div>
					<p>
						To report bugs, you can open an Issue on our <a
							href="https://github.com/MoinJulian/Golf/issues">GitHub repository</a
						>
						and label it with "bug." Alternatively, you can send an email to
						<a href="mailto:support@moinjulian.com">support@moinjulian.com</a>.
					</p>
					<p>
						To suggest new features, you can also open an issue on our <a
							href="https://github.com/MoinJulian/Golf/issues">GitHub repository</a
						>
						and label it with "feature." You can also send your suggestions via email to
						<a href="mailto:support@moinjulian.com">support@moinjulian.com</a>.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>Is the project open source?</summary>
				<div>
					<p>
						No, the project is not open source. However, you are still very welcome to contribute by
						creating an Issue as described above.
						<strong>We appreciate your input and suggestions!</strong>
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>How often are new updates or features added?</summary>
				<div>
					<p>
						Rest assured, we're committed to providing a steady stream of new updates and exciting
						features. Our team is dedicated to enhancing your experience, and you can expect
						frequent additions to keep the excitement alive.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>Can I play the offline version on all devices?</summary>
				<div>
					<p>
						Absolutely! The offline version is designed to be accessible on a wide range of devices.
						It functions just like a website, and it's pre-rendered upon opening to ensure seamless
						functionality even when there's no network connectivity. This means you can enjoy the
						games on various devices without worrying about a network connection.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>What programming languages are used in the project?</summary>
				<div>
					<p>Our project is built using a combination of powerful technologies:</p>
					<ul class="faq-list">
						<li>
							<strong>Frontend Development:</strong> We utilize the JavaScript Full Stack Framework,
							<a href="https://kit.svelte.dev">SvelteKit</a>, along with TypeScript and Sass for
							crafting engaging and dynamic user interfaces.
						</li>
						<li>
							<strong>Backend Development:</strong> For the server-side aspect, we've harnessed the
							capabilities of
							<a href="https://www.mongodb.com">MongoDB</a>
							to securely store user data and ensure smooth interactions.
						</li>
					</ul>
					<p>
						This versatile tech stack empowers us to create a seamless user experience and a robust
						backend infrastructure.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary> Can I change my Password after registration? </summary>
				<div>
					<p>
						Absolutely! You have the flexibility to change your password at any time. Here's how:
					</p>
					<ol class="faq-list">
						<li>
							<strong>Navigate to Account Settings:</strong> Log in to your account and go to the "Account"
							tab.
						</li>
						<li>
							<strong>Update Password:</strong> In the "Account" section, you'll find an option to change
							your password. Simply enter your new password in the designated input field.
						</li>
						<li>
							<strong>Save Changes:</strong> After entering your new password, click on the "Update"
							button to save your changes.
						</li>
					</ol>
					<p>
						By following these steps, you can easily update your password and keep your account
						secure.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary> Is my Personal Information safe and secure? </summary>
				<div>
					<p>
						Absolutely. We take the security and privacy of your personal information seriously.
						Here's how we ensure your data is safe:
					</p>
					<ul class="faq-list">
						<li>
							<strong>Password Protection:</strong> Your password is not stored in clear text on our
							servers. It's securely hashed to protect its confidentiality.
						</li>
						<li>
							<strong>Limited Access:</strong> Your password and personal information are not viewable
							by any team member. We implement strict access controls to ensure only authorized personnel
							can handle sensitive data.
						</li>
					</ul>
					<p>
						We are committed to maintaining the highest standards of security to safeguard your
						personal information.
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>Further Questions</summary>
				<div>
					<p>
						If you have any additional questions, don't hesitate to reach out to us. Simply send an
						email to <a href="mailto:support@moinjulian.com">support@moinjulian.com</a> with your question.
						We'll respond promptly and may even consider adding your question to this FAQ to help other
						users.
					</p>
				</div>
			</details>
		</main>
	</main>
{/if}

<style lang="scss">
	h1 {
		text-align: center;
	}

	.wrapper {
		.question {
			border-top: 1px solid var(--border-color);
			padding: 1rem 0;
			transition: background-color 0.3s ease;

			details {
				summary {
					font-weight: 600;
					line-height: 1.2rem;
					padding: 0.5rem 1.5rem;
					cursor: pointer;

					&:hover {
						color: var(--highlight-color);
					}
				}

				div {
					padding: 0 1.5rem 1.5rem;

					.faq-list {
						padding-left: 1.5em;
					}
				}
			}
		}
	}
</style>
