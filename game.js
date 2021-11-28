var game = {
	oat_count: 0,
	ops: 0,
	opc: 1,
	cow_war_won: false, // TODO: cow rebellion
	upgrades: {
		// to calculate the price: base_price * (1 + price_interest) ** owned
		spoon: {
			name: "Spoon",
			plural: "Spoons",
			description: "Scoops up oats every five seconds",
			icon: "/sprites/spoon.png",
			base_price: 12,
			price_interest: 0.15,
			owned: 0,
			unlocked: true,
			ops: 1 / 5,
			opc: 0,
			multiplier: 1,
			type: "booster"
		},
		bs: {
			name: "Bigger Spoons",
			plural: "Spoon Size",
			description: "Make your spoons bigger to scoop up more oats",
			icon: "/sprites/big_spoon.png",
			base_price: 112,
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
			type: "upgrade",
			own_word: "Additional Gods"
		},
		water: {
			name: "Water",
			plural: "Cups of Water",
			description: "Makes it possible to cook your oatmeal",
			icon: "/sprites/water.png",
			base_price: 1200,
			price_interest: 0.2,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count > 1000 && game.upgrades.cinnamon.owned > 0,
			ops: 0,
			opc: 0,
			multiplier: 1,
			ops_multiplier: 0.16, // this is technically 1.15 but math stuff so it doesn't become exponential
			type: "upgrade"
		},
		granary: {
			name: "Granary",
			plural: "Granaries",
			description: "Mills you eight oats per second",
			icon: "/sprites/granary.png",
			base_price: 420,
			price_interest: 0.18,
			owned: 0,
			unlocked: false,
			canunlock: () => game.oat_count >= 390,
			ops: 8,
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
		cinnamon: {
			name: "Cinnamon",
			plural: "Cinnamons",
			description: "Makes your oatmeal taste better",
			icon: "/sprites/cinnamon.png",
			base_price: 250,
			price_interest: 0.2,
			owned: 0,
			unlocked: true,
			ops: 0,
			opc: 0,
			customfunc: {
				run_every: 10, // interval (seconds) to run this at
				run: owned => {
					let wins = 0;
					for (let i = 0; i < owned; i++) {
						if (Math.random() < 1 / owned) {
							wins++;
						}
					}
					let to_add = Math.random() * game.oat_count * wins / 2;
					game.oat_count += to_add;
					if (to_add > 0) achieve("Cinnamon Lottery", "You just won " + numberformat.formatShort(to_add) + " oats!");
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
		honey: {
			name: "Honey",
			plural: "Cups of Honey",
			description: "Makes your oatmeal nice and sweet",
			icon: "/sprites/honey.png",
			base_price: 50_000,
			price_interest: 0.32,
			owned: 0,
			unlocked: false,
			canunlock: () => game.upgrades.cinnamon.owned >= 30 && game.ops >= 200 && game.oat_count >= 10_000,
			ops: 0,
			opc: 1,
			type: "upgrade",
			multiplier: 1,
			own_word: "Sweetness",
			customfunc: {
				run_every: 32,
				run: owned => {
					let wins = 0;
					for (let i = 0; i < owned; i++) {
						if (Math.random() < 0.55) {
							wins++;
						}
					}
					let to_add = wins / 5 * Math.random();
					to_add += game.ops * wins * Math.random();
					to_add *= 5 * Math.random();
					game.oat_count += to_add;
					if (to_add > 0) achieve("Honey Lottery", "Honey just won you " + numberformat.formatShort(Math.ceil(to_add)) + " oats!");
				}
			}
		},
		oatnog: {
			name: "Oatnog",
			plural: "Oatnogs",
			description: "Makes your oatmeal taste way better than oats with cinnamon, honey or water (December exclusive)",
			icon: "/sprites/oatnog.png",
			canunlock: () => game.oat_count > 100 && (new Date()).getMonth() == 11,
			works: () => (new Date()).getMonth() == 11,
			base_price: 200,
			price_interest: 0.1,
			owned: 0,
			unlocked: false,
			ops: 0.02,
			opc: 0,
			type: "upgrade",
			multiplier: 1,
			own_word: "Big Tastiness",
			customfunc: {
				run_every: 60,
				run: owned => {
					let wins = 0;
					for (let i = 0; i < owned; i++) {
						if (randint(0, 10) == 5) {
							wins++;
						}
					}
					to_add = wins * 100;
					game.oat_count += to_add;
					if (to_add > 0) achieve("EPIC GIFT!", "Oatnog just got you " + numberformat.formatShort(Math.ceil(to_add)) + " oats!");
					if ((new Date()).getMonth() != 11) return void save_game(), window.location = window.location;
				}
			}
		}
	}
};
