<script lang="ts">
	import { _, isLoading } from 'svelte-i18n';

	let github_link = `<a href="https://github.com/realgolf/web/issues">GitHub</a>`;
	let support_email = `<a href="mailto:support@moinjulian.com">support@moinjulian.com</a>`;
	let contributors = `<a href="https://github.com/realgolf/web/blob/main/Contributors.md">Contributors.md</a>`;
	let svelte_kit = `<a href="https://kit.svelte.dev">SvelteKit</a>`;
	let mongodb = `<a href="https://www.mongodb.com">MongoDB</a>`;
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
				<summary>{$_('faq_question_1_title')}</summary>
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
				<summary>{$_('faq_question_3_title')}</summary>
				<div>
					<p>
						{$_('faq_answer_3_steps')}
					</p>
					<ul class="faq-list">
						<li>
							<strong>{$_('faq_answer_3_step_1_title')}:</strong>
							{@html $_('faq_answer_3_step_1_description', { values: { github_link } })}
						</li>
						<li>
							<strong>{$_('faq_answer_3_step_2_title')}:</strong>
							{@html $_('faq_answer_3_step_2_description', { values: { support_email } })}
						</li>
					</ul>
					<p>
						{@html $_('faq_answer_3_conclusion', { values: { contributors } })}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_4_title')}</summary>
				<div>
					<p>
						{@html $_('faq_answer_4_content_1')}
					</p>
					<p>
						{@html $_('faq_answer_4_content_2')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_5_title')}</summary>
				<div>
					<p>
						{@html $_('faq_answer_5_content')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_6_title')}</summary>
				<div>
					<p>
						{$_('faq_answer_6_content')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_7_title')}</summary>
				<div>
					<p>
						{$_('faq_answer_7_content')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_8_title')}</summary>
				<div>
					<p>{$_('faq_answer_8_technologies')}</p>
					<ul class="faq-list">
						<li>
							{@html $_('faq_answer_8_sveltekit', { values: { svelte_kit } })}
						</li>
						<li>
							{@html $_('faq_answer_8_mongodb', { values: { mongodb } })}
						</li>
					</ul>
					<p>
						{$_('faq_answer_8_conclusion')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_9_title')}</summary>
				<div>
					<p>
						{$_('faq_answer_9_steps')}
					</p>
					<ol class="faq-list">
						<li>
							{@html $_('faq_answer_9_steps_1')}
						</li>
						<li>
							{@html $_('faq_answer_9_steps_2')}
						</li>
						<li>
							{@html $_('faq_answer_9_steps_3')}
						</li>
					</ol>
					<p>
						{$_('faq_answer_9_conclusion')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_question_10_title')}</summary>
				<div>
					<p>
						{@html $_('faq_answer_10_steps')}
					</p>
					<ul class="faq-list">
						<li>
							{@html $_('faq_answer_10_steps_1')}
						</li>
						<li>
							{@html $_('faq_answer_10_steps_2')}
						</li>
					</ul>
					<p>
						{$_('faq_answer_10_conclusion')}
					</p>
				</div>
			</details>
		</main>

		<main class="question">
			<details>
				<summary>{$_('faq_further_questions')}</summary>
				<div>
					<p>
						{@html $_('faq_further_questions_content')}
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
