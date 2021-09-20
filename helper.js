/*
	helper.js: random useful utility functions that aren't really part of the clicker
*/


var templates = {}; // this caches the templates so they don't need to be fetched

/** automatically fills out handlebars template
 * @param {String} template_url - the url to the handlebars template to use
 * @param {Object} data - the data to fill.
 * @param {String} target_selector - the selector of the element to put the final HTML. if null then the html is returned
 * @param {Object} handlebar_options - extra handlebars config
 */
async function fill_template(template_url, data, target_selector, handlebar_options, just_return) {
	if (typeof data != "object") {
		return;
	}
	if (!handlebar_options) {
		handlebar_options = {};
	}
	let template_string = templates[template_url];
	if (!template_string) {
		template_string = await fetch(template_url).then(a => a.text());
		templates[template_url] = template_string;
	}
	
	let template = Handlebars.compile(template_string, handlebar_options);
	let html = template(data);
	if (!target_selector) return html;
	document.querySelector(target_selector).innerHTML += html;
}

/** initialzes the keymap **/
function setup_keymap() {
	key("p", () => showingops = !showingops);
}
