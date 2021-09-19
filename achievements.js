var achievements = {
	one_oat: {
		text: "You clicked the oat!",
		possible: () => game.oat_count > 0
	},
	ten_click: {
		text: "Deca-clicker: you clicked the oat ten times!",
		possible: () => game.oat_count >= 10
	},
	_69_oats: {
		text: "69 oats. nice",
		possible: () => game.oat_count >= 69
	},
	firstspoon: {
		text: "You have a spoon!",
		possible: () => game.upgrades.spoon.owned >= 1
	},
	fiftyoats: {
		text: "you have 50 oats!",
		possible: () => game.oat_count >= 50
	},
	one_hundred: {
		text: "wow! 100 oats!",
		possible: () => game.oat_count >= 100
	},
	bowl: {
		text: "your first oat bowl",
		possible: () => game.upgrades.bowl.owned >= 1
	},
	pot1: {
		text: "your first oat pot",
		possible: () => game.upgrades.pot.owned >= 1
	},
	cow1: {
		text: "moo moo cachoo: you have an oat cow",
		possible: () => game.upgrades.cow.owned >= 1
	},
	cow10: {
		text: "farmer: you have lots of cows",
		possible: () => game.upgrades.cow.owned >= 10
	},
	cow20: {
		text: "local legend: you are known for your numerous cows",
		possible: () => game.upgrades.cow.owned >= 20
	},
	cow30: {
		text: "mad cow disease: you are obsessed with your cows",
		possible: () => game.upgrades.cow.owned >= 30
	},
	cow40: {
		text: "PETA has its eyes on you. One false move and your cows could be confiscated",
		possible: () => game.upgrades.cow.owned >= 40
	},
	cow50: {
		text: "great cow Guru: keep an eye on your feilds...",
		possible: () => game.upgrades.cow.owned >= 50
	},
	oats200: {
		text: "200 oats! that's incredible!",
		possible: () => game.oat_count >= 200
	},
	oats500: {
		text: "Five hundred oats: that's like, a lot or something",
		possible: () => game.oat_count >= 500
	},
	oats1k: {
		text: "Bob's Red Mill: you have one thousand oats",
		possible: () => game.oat_count >= 1000
	},
	tenops: {
		text: "Ten OPS: that's a whole bunch!",
		possible: () => game.ops >= 10
	},
	hunredops: {
		text: "you're making 100 oats every second. that's epic!",
		possible: () => game.ops >= 100
	},
	onekops: {
		text: "Ten Red Mills: you have 1,000 ops",
		possible: () => game.ops >= 1000
	},
	hundredkops: {
		text: "oat hero: you have 100,000 OPS",
		possible: () => game.ops >= 100_000
	},
	cinnamon1: {
		text: "The lottery is a risky business",
		possible: () => game.upgrades.cinnamon.owned >= 1
	},
	
};
