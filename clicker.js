var framespeed = 50; // how many ms in between each game loop
var default_format = {
	sigfigs: 3
};

var loaded = false; // TODO: loading screen and stuff

var showingops = true;

var game = {
	oat_count: 200,
	ops: 0,
	ops_multiplier: 1,
	opc: 1,
	opc_multiplier: 1,
	upgrades: {
		spoon: {
			// to calculate the price: base_price * (1 + price_interest) ** owned
			name: "Spoon",
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
		bowl: {
			name: "Oat Bowl",
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
			description: "A big place to store oats",
			icon: "/sprites/pot.png",
			base_price: 350,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 5,
			multiplier: 1,
			type: "booster"
		},
		bs: {
			name: "Bigger Spoons",
			description: "Make your spoons bigger to scoop up more oats",
			icon: "/sprites/big_spoon.png",
			base_price: 100,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 0,
			multiplies: "spoon",
			multiplier: 1,
			type: "upgrade"
		},
		cinnamon: {
			name: "Cinnamon",
			description: "Makes your oatmeal taste better",
			icon: "/sprites/cinnamon.png",
			base_price: 250,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 0,
			customfunc: {
				run_every: 10, // interval (seconds) to run this at
				run: owned => {
					if (Math.random() * owned > 100) {
						// TODO: acheivement popup for lottery
						game.oat_count *= 2;
					}
				}
			},
			type: "upgrade"
		}
	}
};

function save_game() {
	let save = {
		game: {
			upgrades: {},
			oat_count: game.oat_count,
			ops_multiplier: game.ops_multiplier,
			opc_multiplier: game.opc_multiplier
		},
		achievements: {}
	}
	for (let i in game.upgrades) {
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
	}
	
	game.oat_count = save.game.oat_count;
	game.ops_multiplier = save.game.ops_multiplier;
	game.opc_multiplier = save.game.opc_multiplier;
	
	update_ops();
}

function oat_clicked() {
	game.oat_count += game.opc;
}

function game_tick() {
	game.oat_count += game.ops * framespeed / 1000;
	
	if (game.oat_count > 0) {
		document.title = numberformat.formatShort(Math.floor(game.oat_count)) + " oats - Oat Clicker";
	}
	else {
		document.title = "Oat Clicker";
	}
	
	if (!document.hasFocus()) return; // don't waste resources on other dom updates when the document doesn't have focus
	
	document.querySelector("#oats").innerHTML = "Oats: " + numberformat.format(Math.floor(game.oat_count), default_format);
	
	if (showingops) {
		document.querySelector("#ops").innerHTML = "Per second: " + (game.ops > 999 ? numberformat.formatShort(game.ops) : Math.floor(game.ops * 10) / 10);
	}
	else {
		document.querySelector("#ops").innerHTML = "Per click: " + (game.opc > 999 ? numberformat.formatShort(game.opc) : Math.floor(game.opc * 10) / 10);
	}
	
	// update price stuff
	for (let i in game.upgrades) {
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
}

async function init() {
	// anti cheat (super effective):
	console.log("%cEH!\n%cNot here to cheat, are we? \nIf you truly are here for debugging, please report any issues you find at %chttps://github.com/ooogle/oatmeal2/issues/new", "color:blue; font-size: 100px;", "color:#0068df; font-size: 15px;", "font-size:14px; color:#0276fc; background:lightgray;");
	
	await load_save();
	
	setup_keymap();
	
	let booster_template = await fetch("/templates/booster_template.hbs").then(a => a.text());
	
	for (let i in game.upgrades) {
		game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
		let template_data = {
			...game.upgrades[i],
			can_afford: game.oat_count >= game.upgrades[i].price,
			display_price: numberformat.format(game.upgrades[i].price, default_format),
			display_count: numberformat.format(game.upgrades[i].owned, default_format),
			id: i
		}
		let target_element = "#" + game.upgrades[i].type + "s";
		fill_template(booster_template, template_data, target_element);
		
		// for upgrades with a custom function such as cinnamon
		if (game.upgrades[i].customfunc) {
			setInterval(() => {
				game.upgrades[i].customfunc.run(game.upgrades[i].owned);
			}, game.upgrades[i].customfunc.run_every * 1000);
		}
	}
	
	setInterval(game_tick, framespeed);
	setInterval(save_game, 10000); // save every ten seconds
}

function update_ops() {
	let ops = 0;
	let opc = 1;
	for (let i in game.upgrades) {
		ops += (game.upgrades[i].ops || 0) * (game.upgrades[i].multiplier || 1) * game.upgrades[i].owned;
		opc += (game.upgrades[i].opc || 0) * (game.upgrades[i].multiplier || 1) * game.upgrades[i].owned;
	}
	ops *= game.ops_multiplier;
	opc *= game.opc_multiplier;
	game.ops = ops;
	game.opc = opc;
}

function update_prices() {
	for (let i in game.upgrades) {
		game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
		document.querySelector("#price-" + i).innerHTML = numberformat.format(game.upgrades[i].price, default_format) + " oats";
		document.querySelector("#owned-" + i).innerHTML = "Owned: " + numberformat.format(game.upgrades[i].owned, default_format);
	}
}

function buy_upgrade(upgrade) {
	if (game.oat_count < game.upgrades[upgrade].price) return;
	game.upgrades[upgrade].owned++;
	if (game.upgrades[upgrade].multiplies) {
		game.upgrades[game.upgrades[upgrade].multiplies].multiplier += game.upgrades[upgrade].multiplier;
	}
	game.oat_count -= game.upgrades[upgrade].price;
	update_prices();
	update_ops();
}
