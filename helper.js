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
async function fill_template(template_url, data, target_selector, handlebar_options) {
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
	if (!target_selector) {
		let parser = new DOMParser();
		return parser.parseFromString(html, "text/html").body.firstChild;
	}
	document.querySelector(target_selector).innerHTML += html;
}

/** initialzes the keymap **/
function setup_keymap() {
	key("p", () => showingops = !showingops);
	key("g", () => {
		if (oat_image.src.endsWith("/sprites/fish.png")) return;
		oat_image.src = "/sprites/fish.png";
		let blub = new Audio("/sprites/sounds/blub.mp3");
		blub.play();
		let canvas = document.querySelector("#oat_image");
		let context = canvas.getContext("2d");		
		context.clearRect(0, 0, canvas.width, canvas.height);
		// for some reason there has to be a delay in between these
		setTimeout(() => context.drawImage(oat_image, 0, 110, 260, 133), 300);
	});
}

/** makes achievement popup
	* @param {String} title - the title of the popup
	* @param {String} description - the description of the popup
*/
async function achieve(title, description) {
	let elem = await fill_template("/templates/achievement_template.hbs", {title, description}, null, {noEscape: true});
	elem.classList.add("slide-left");
	let target_elem = document.querySelector("#achievements");
	if (!target_elem.children.length) {
		target_elem.appendChild(elem);
	}
	else {
		target_elem.insertBefore(elem, target_elem.children[0]);
	}
	setTimeout(() => elem.classList.remove("slide-left"), 400)
	setTimeout(() => {
		elem.classList.add("delete-right");
		setTimeout(() => {
			elem.remove();
		}, 500)
	}, 4000);
}
/** prefetches templates
	* @param {Object} urls - and array of URLs to prefetch
*/
function prefetchtemplates(urls) {
	return new Promise((resolve, reject) => {
		for (let i in urls) {
			fetch(urls[i]).then(a => a.text()).then(a => {
				templates[urls[i]] = a
				if (i == urls.length - 1) resolve();
			});
		}
	});
}

/* self explanatory
	* @param {Number} min - the minimum number
	* @param {Number} max - the maximum number
*/
function randint(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randarr(array) {
	return array[randint(0, array.length)];
}
