var framespeed = 50; // how many ms in between each game loop
var default_format = {
	sigfigs: 4
};

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
				run_every: 60, // interval (seconds) to run this at
				run: owned => {
					// TODO: cinnamon function
				}
			},
			type: "upgrade"
		}
	}
};

function game_tick() {
	
}

async function init() {
	console.log("test")
	
	let booster_template = await fetch("/templates/booster_template.hbs").then(a => a.text());
	
	for (let i in game.upgrades) {
		game.upgrades[i].price = game.upgrades[i].base_price * (1 + game.upgrades[i].price_interest) ** game.upgrades[i].owned
		let template_data = {
			...game.upgrades[i],
			can_afford: game.oat_count >= game.upgrades[i].price,
			display_price: numberformat.format(game.upgrades[i].price, default_format),
			display_count: numberformat.format(game.upgrades[i].owned, default_format)
		}
		let target_element = "#" + game.upgrades[i].type + "s";
		fill_template(booster_template, template_data, target_element);
	}

}
