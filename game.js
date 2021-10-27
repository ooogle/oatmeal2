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
