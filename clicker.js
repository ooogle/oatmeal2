var framespeed = 50; // how many ms in between each game loop
var game = {
	oat_count: 0,
	ops: 0,
	ops_multiplier: 1,
	opc: 1,
	opc_multiplier: 1,
	upgrades: {
		spoon: {
			// to calculate the price: price * (1 + price_interest) ** owned
			name: "Spoon",
			description: "Scoops up oats every five seconds",
			icon: "/sprites/spoon.png",
			price: 30,
			price_interest: 0.15,
			owned: 0,
			can_afford: false,
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
			price: 75,
			price_interest: 0.15,
			owned: 0,
			can_afford: false,
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
			price: 350,
			price_interest: 0.15,
			owned: 0,
			can_afford: false,
			unlocked: true,
			ops: 0,
			opc: 5,
			multiplier: 1,
			type: "booster"
		},
		bs: {
			name: "Bigger Spoons",
			description: "Make your spoons bigger to scoop up more oats",
			icon: "TODO",
			price: 100,
			price_interest: 0.15,
			owned: 0,
			can_afford: false,
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
			price: 250,
			price_interest: 0.15,
			owned: 0,
			can_afford: false,
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

function init() {
	
}
