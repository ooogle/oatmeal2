/*
	helper.js: random useful utility functions that aren't really part of the clicker
*/

/** automatically fills out handlebars template
 * @param {String} template - the handlebars template to use
 * @param {Object} data - the data to fill.
 * @param {String} target_selector - the selector of the element to put the final HTML. if null then the html is returned
 * @param {Object} handlebar_options - extra handlebars config
 */
function fill_template(template_string, data, target_selector, handlebar_options, just_return) {
	if (typeof data != "object") {
		return;
	}
	if (!handlebar_options) {
		handlebar_options = {};
	}
	var template = Handlebars.compile(template_string, handlebar_options);
	var html = template(data);
	if (!target_selector) return html;
	document.querySelector(target_selector).innerHTML += html;
}

/** initialzes the keymap **/
function setup_keymap() {
	key("p", () => showingops = !showingops);
}
