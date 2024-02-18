/**
 * Initializes MathJax and renders formulas using MathJax.
 * @module formulas
 */

import mathjax from 'mathjax';

const MathJax = await mathjax.init({
	loader: { load: ['input/tex', 'output/svg'] }
});

/**
 * Renders a single formula with MathJax.
 * @param {string} formula - The formula to render.
 * @returns {string} - The rendered formula as an HTML string.
 */
function render_formula(formula) {
	const svg = MathJax.tex2svg(formula, {
		display: false
	});
	return MathJax.startup.adaptor.innerHTML(svg);
}

const math_tag_regex = /&lt;math&gt;(.*?)&lt;\/math&gt;/g;

/**
 * Renders all formulas in an HTML string with MathJax.
 * @param {string} htmlContent - The HTML string containing formulas to render.
 * @returns {string} - The HTML string with rendered formulas.
 */
export function render_formulas(htmlContent) {
	const renderedHtml = htmlContent.replace(math_tag_regex, (_, formula) => {
		return render_formula(formula);
	});

	return renderedHtml;
}
