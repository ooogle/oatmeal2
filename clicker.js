var framespeed = 50; // how many ms in between each game loop
var default_format = {
	sigfigs: 4
};

var oat_image = new Image();
oat_image.src = "/sprites/oat.png";

var loaded = false; // TODO: loading screen and stuff

var current_frame = 0;

var showingops = true;

var last_run = performance.now();

var game = {
	oat_count: 0,
	ops: 0,
	ops_multiplier: 1,
	opc: 1,
	opc_multiplier: 1,
	upgrades: {
		// to calculate the price: base_price * (1 + price_interest) ** owned
		spoon: {
			name: "Spoon",
			plural: "Spoons",
			description: "Scoops up oats every five seconds",
			icon: "/sprites/spoon.png",
			base_price: 30,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 1 / 5,
			opc: 0,
			multiplier: 1,
			type: "booster"
		},
		cow: {
			name: "Oat Cow",
			plural: "Cows",
			description: "Makes oat milk, which dries into oats",
			icon: "/sprites/cow.png",
			base_price: 230,
			price_interest: 0.1,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 150,
			ops: 1,
			opc: 0,
			multiplier: 1,
			type: "booster"
		},
		granary: {
			name: "Granary",
			plural: "Granaries",
			description: "Mills you eight oats per second",
			icon: "/sprites/granary.png",
			base_price: 480,
			price_interest: 0.18,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 390,
			ops: 8,
			opc: 0,
			multiplier: 1,
			type: "booster"
		},
		temple: {
			name: "Temple",
			plural: "Temples",
			description: "Appeases the Oat Gods",
			icon: "/sprites/temple.png",
			base_price: 3000,
			price_interest: 0.1,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 2000,
			ops: 15,
			opc: 0,
			multiplier: 1,
			type: "booster"
		},
		polytheism: {
			name: "Polytheism",
			plural: "Oat Gods",
			description: "The more gods you worship, the more oats you get",
			icon: "/sprites/polytheism.png",
			base_price: 5000,
			price_interest: 0.1,
			owned: 0,
			unlocked: false,
			canunlock: () => game.upgrades.temple.owned > 0,
			ops: 0,
			opc: 0,
			multiplies: ["temple"],
			multiplier: 1,
			type: "upgrade"
		},
		bowl: {
			name: "Oat Bowl",
			plural: "Bowls",
			description: "A place to store oats",
			icon: "/sprites/bowl.png",
			base_price: 75,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 1,
			multiplier: 1,
			type: "booster"
		},
		pot: {
			name: "Oat Pot",
			plural: "Pots",
			description: "A big place to store oats",
			icon: "/sprites/pot.png",
			base_price: 350,
			price_interest: 0.25,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 5,
			multiplier: 1,
			type: "booster"
		},
		bs: {
			name: "Bigger Spoons",
			plural: "Spoon Size",
			description: "Make your spoons bigger to scoop up more oats",
			icon: "/sprites/big_spoon.png",
			base_price: 100,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 0,
			multiplies: ["spoon"],
			multiplier: 1,
			type: "upgrade",
			own_word: "Spoon Size"
		},
		cinnamon: {
			name: "Cinnamon",
			plural: "Cinnamons",
			description: "Makes your oatmeal taste better",
			icon: "/sprites/cinnamon.png",
			base_price: 250,
			price_interest: 0.12,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 0,
			customfunc: {
				run_every: 10, // interval (seconds) to run this at
				run: owned => {
					if (Math.random() * owned > 100) {
						achieve("Cinnamon Lottery", "You just won the cinnamon lottery!");
						game.oat_count *= 2;
					}
				}
			},
			type: "upgrade",
			own_word: "Tastiness"
		},
		gold: {
			name: "Gold Pots & Bowls",
			plural: "Gold Pots & Bowls",
			description: "Why would you use boring wooden pots & bowls when you could use shiny gold ones?",
			icon: "/sprites/gold.png",
			base_price: 800,
			price_interest: 0.08,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 750,
			ops: 0,
			opc: 0.2,
			multiplies: ["pot", "bowl"],
			multiplier: 1,
			type: "upgrade",
			own_word: "Fanciness"
		},
		beetle: {
			name: "Oat Beetle",
			plural: "Beetles",
			description: "Rolls up balls of oats for you",
			icon: "/sprites/beetle.png",
			base_price: 50_000_000,
			price_interest: 0.1,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 150_000_000_000,
			ops: 700,
			opc: 800,
			type: "booster",
			multiplier: 1
		}
	}
};

function save_game() {
	let save = {
		timestamp: Date.now(),
		game: {
			upgrades: {},
			oat_count: game.oat_count
		},
		achievements: {}
	}
	for (let i in game.upgrades) {
		if (!game.upgrades[i].unlocked) continue;
		save.game.upgrades[i] = {
			owned: game.upgrades[i].owned,
			multiplier: game.upgrades[i].multiplier
		}
	}
	
	for (let i in achievements) {
		if (achievements[i].has_unlocked) save.achievements[i] = {has_unlocked: true};
	}
	
	localforage.setItem("save", save);
}

async function load_save() {
	let save = await localforage.getItem("save");
	if (!save) return;
	for (let i in save.achievements) {
		achievements[i].has_unlocked = save.achievements[i].has_unlocked;
	}
	
	for (let i in save.game.upgrades) {
		game.upgrades[i].owned = save.game.upgrades[i].owned;
		game.upgrades[i].multiplier = save.game.upgrades[i].multiplier;
		game.upgrades[i].unlocked = true; // only unlocked upgrades are saved, so this is true if the save exists
	}
	
	game.oat_count = save.game.oat_count;
	
	update_ops();
	
	if ((Date.now() - save.timestamp) / 1000 < 60) return;
	
	let oats_earned = (Date.now() - save.timestamp) / 1000 * game.ops / 3
	
	game.oat_count += oats_earned;
	
	if(oats_earned >= 2) achieve("While you were gone...", "You earned " + numberformat.formatShort(Math.floor(oats_earned), default_format) + " oats");
}

function resetgame() {
	localforage.clear();
	window.location = window.location;
}

function oat_clicked() {
	game.oat_count += game.opc;
	if (screen.width >= 1000) check_achievements(); // mobile gaming
	if (game.ops < 15 && particles.length < 100) {
		add_particles(1);
	}
}

function game_tick() {
	game.oat_count += game.ops * (performance.now() - last_run) / 1000;
	
	last_run = performance.now();
	
	if (game.oat_count > 0) {
		document.title = numberformat.formatShort(Math.floor(game.oat_count)) + " oats - Oat Clicker";
	}
	else {
		document.title = "Oat Clicker";
	}

	// this should never happen, but just in case
	if (isNaN(game.oat_count)) game.oat_count = 0;
	
	if (!document.hasFocus()) return; // don't waste resources on other dom updates when the document doesn't have focus
	
	document.querySelector("#oats").innerHTML = "Oats: " + numberformat.format(Math.floor(game.oat_count), default_format);
	
	if (showingops) {
		document.querySelector("#ops").innerHTML = "Per second: " + (game.ops > 999 ? numberformat.formatShort(game.ops) : Math.floor(game.ops * 10) / 10);
	}
	else {
		document.querySelector("#ops").innerHTML = "Per click: " + (game.opc > 999 ? numberformat.formatShort(game.opc) : Math.floor(game.opc * 10) / 10);
	}
	
	// this stuff will only run every 5 frames
	if (current_frame != 5) return current_frame++;
	current_frame = 0;
	
	// update price stuff
	for (let i in game.upgrades) {
		if (!game.upgrades[i].unlocked) continue;
		if (game.oat_count >= game.upgrades[i].price) {
			document.querySelector("#price-" + i).classList.remove("not-enough-money");
			document.querySelector("#price-" + i).classList.add("enough-money");
			document.querySelector("#booster-" + i).classList.remove("cantbuy");
		}
		else {
			document.querySelector("#price-" + i).classList.remove("enough-money");
			document.querySelector("#price-" + i).classList.add("not-enough-money");
			document.querySelector("#booster-" + i).classList.add("cantbuy");
		}
	}
	
	check_achievements();
	
	if (game.ops > 10) {
		let particle_max = 8;
		if (screen.width <= 1000) particle_max = 1; // mobile gaming moment
		add_particles(Math.min(game.ops / 10, particle_max));
	}
	else if (randint(0, 100) < game.ops * 16) {
		add_particles(1);
	}
}

function loadscreen() {
	if (!loaded) {
		let messages = [
			"Press P or click to switch between oats per second and per click",
			"new and improved!",
			"Don't press G",
			"Cinnamon is a bad investment",
			"Screw cookies",
			"Click that oat!",
			"Hey kid, want some oats?",
			"water is wet",
			"oatmeal is a very healthy food.",
			"Is this <i>really</i> a good use of your time?",
			"Winning the oat lottery is unlikely, but nice",
			"OATS!?!??!",
			"<q>nice</q> — your 69th oat",
			"what do you mean, <q>undefined</q>?",
			"ALL HAIL",
			"i'll give you an oat if you get in my van",
			"no, it's not a dumb game",
			"IT'S RAINING OATS!!!",
			"Fun fact: October 29th is National Oatmeal Day",
			"Fun fact: January is National Oatmeal Month",
			"Ya liek oats?",
			"Spoons, now with extra-strong handles!",
			"Beware of the cows",
			"Cinnamon is a lottery ticket to riches and fortune",
			"Fun fact: Oat milk comes from oat cows",
			"Press R to reset your game.",
			"Cinnamon is a scam",
			"Brother, may I have some oats?",
			"Praying to the oat gods twice a day may grant you a longer life",
			"Oats are good for your bones",
			"Eat Oats!",
			"Press S to get a save code. Press L to load your game from one.",
			"500 gods are better than one.",
			"I worship the many gods of oat",
			"make yourself a bowl of oats while you wait.",
			"free of jQuery since 2019",
			"Oats are vegan, gluten free, and jQuery free",
			"here at Oat Clicker, we use DOM",
			"jQuery sucks.",
			"I'm a vscode girl"
		];
		document.querySelector("#loadmessages").innerHTML = randarr(messages);
		return void setTimeout(loadscreen, 2000);
	}
}

async function init() {
	// anti cheat (super effective):
	console.log("%cHEY!\n%cNot here to cheat, are we? \nIf you truly are here for debugging, please report any issues you find at %chttps://github.com/ooogle/oatmeal2/issues/new", "color:blue; font-size: 100px;", "color:#0068df; font-size: 15px;", "font-size:14px; color:#0276fc; background:lightgray;");
	
	loadscreen();
	
	await prefetchtemplates(["/templates/achievement_template.hbs"]);
	
	await load_save();
	
	setup_keymap();
	
	for (let i in game.upgrades) {
		if (game.upgrades[i].unlocked) {
			game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
			let template_data = {
				...game.upgrades[i],
				can_afford: game.oat_count >= game.upgrades[i].price,
				display_price: numberformat.format(game.upgrades[i].price, default_format),
				display_count: numberformat.format(game.upgrades[i].owned, default_format),
				id: i
			}
			
			let target_element = "#" + game.upgrades[i].type + "s";
			await fill_template("/templates/booster_template.hbs", template_data, target_element);
		}
		
		// for upgrades with a custom function such as cinnamon
		if (game.upgrades[i].customfunc) {
			setInterval(() => {
				game.upgrades[i].customfunc.run(game.upgrades[i].owned);
			}, game.upgrades[i].customfunc.run_every * 1000);
		}
	}
	
	// draw main oat as canvas (very good for mobile usability)
	let context = document.querySelector("#oat_image").getContext("2d");
	context.drawImage(oat_image, 0, 0, 263, 354);
	
	setInterval(game_tick, framespeed);
	setInterval(save_game, 10000); // save every ten seconds
	
	// oat falling animations
	startparticles();
	
	// remove loadscreen after 0.5s delay
	setTimeout(() => {
		document.querySelector("#loadingscreen").classList.add("fadeout");
		setTimeout(() => {
			document.querySelector("#loadingscreen").remove();
		}, 300);
		loaded = true;
	}, 500);
}

function update_ops() {
	let ops = 0;
	let opc = 1;
	let opc_multiplier = 1;
	let ops_multiplier = 1;
	for (let i in game.upgrades) {
		ops += (game.upgrades[i].ops || 0) * (game.upgrades[i].multiplier || 1) * game.upgrades[i].owned;
		opc += (game.upgrades[i].opc || 0) * (game.upgrades[i].multiplier || 1) * game.upgrades[i].owned;
		if (game.upgrades[i].opc_multiplier) opc_multiplier += game.upgrades[i].opc_multiplier * game.upgrades[i].owned;
		if (game.upgrades[i].ops_multiplier) ops_multiplier += game.upgrades[i].ops_multiplier * game.upgrades[i].owned;
	}
	ops *= ops_multiplier;
	opc *= opc_multiplier;
	game.ops = ops;
	game.opc = opc;
}

function update_prices() {
	for (let i in game.upgrades) {
		if (!game.upgrades[i].unlocked) continue;
		game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
		document.querySelector("#price-" + i).innerHTML = numberformat.format(game.upgrades[i].price, default_format) + " oats";
		document.querySelector("#owned-" + i).innerHTML = (game.upgrades[i].own_text || "Owned") + ": " + numberformat.format(game.upgrades[i].owned, default_format);
	}
}

function buy_upgrade(upgrade) {
	if (game.oat_count < game.upgrades[upgrade].price) return;
	game.upgrades[upgrade].owned++;
	if (game.upgrades[upgrade]?.multiplies?.length) {
		for (let mult of game.upgrades[upgrade].multiplies) {
			game.upgrades[mult].multiplier += game.upgrades[upgrade].multiplier;
		}
	}
	game.oat_count -= game.upgrades[upgrade].price;
	update_prices();
	update_ops();
}

async function unlock_upgrade(i) {
	let target_element = document.querySelector("#" + game.upgrades[i].type + "s");
	game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
	let template_data = {
		...game.upgrades[i],
		can_afford: game.oat_count >= game.upgrades[i].price,
		display_price: numberformat.format(game.upgrades[i].price, default_format),
		display_count: numberformat.format(game.upgrades[i].owned, default_format),
		id: i
	}
	let elem = await fill_template("/templates/booster_template.hbs", template_data, null);
	elem.classList.add("appear");
	target_element.insertBefore(elem, target_element.children[1]);
	game.upgrades[i].unlocked = true;
	
	// unlock popup
	let messages = ["You've unlocked ", "You unlocked ", "Now you have ", "You can now buy "];
	achieve("Booster Unlocked", randarr(messages) + game.upgrades[i].plural + "!");
}

function check_achievements() {
	for (let i in achievements) {
		if (!achievements[i].possible() || achievements[i].has_unlocked) continue;
		achieve("Achievement Unlocked", achievements[i].text);
		achievements[i].has_unlocked = true;
	}
	
	for (let i in game.upgrades) {
		if (game.upgrades[i].unlocked || !game.upgrades[i].canunlock) continue;
		if (game.upgrades[i].canunlock()) unlock_upgrade(i);
	}
	// TODO: cow rebellion
}

// initialize before full page load
window.addEventListener("DOMContentLoaded", init);
