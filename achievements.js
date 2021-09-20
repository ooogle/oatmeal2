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
	spoonguru: {
		text: "Spoon guru: you have fifty spoons",
		possible: () => game.upgrades.spoon.owned >= 50
	},
	spoonlord: {
		text: "Spoon lord: you have a hundred spoons",
		possible: () => game.upgrades.spoon.owned >= 100
	},
	fourtwenty: {
		text: "420 oats: blaze it!",
		possible: () => game.oat_count >= 420
	},
	billion: {
		text: "Get a life: you have one billion oats",
		possible: () => game.oat_count >= 1_000_000_000
	},
	million: {
		text: "A whole million oats",
		possible: () => game.oat_count >= 1_000_000
	},
	thirty: {
		text: "Quaker: you have thirty oats",
		possible: () => game.oat_count >= 30
	},
	fortyfive: {
		text: "brother, may I have some oats?",
		possible: () => game.oat_count >= 45
	},
	lotterymaster: {
		text: "Lottery master: you're a big gambler",
		possible: () => game.upgrades.cinnamon.owned >= 25
	},
	threehundred: {
		text: "a whole three hundred oats",
		possible: () => game.oat_count >= 300
	},
	sixhundred: {
		text: "Man, six hundred",
		possible: () => game.oat_count >= 600
	},
	twomil: {
		text: "two million oats, that's at least, like, a couple bowls",
		possible: () => game.oat_count >= 2_000_000
	},
	fourmil: {
		text: "Oat country: you have enough oats to start a small nation",
		possible: () => game.oat_count >= 4_000_000
	},
	threemil: {
		text: "Oat fetish: you are <a href='https://web.archive.org/web/20201111222258/https://answers.yahoo.com/question/index?qid=20110813210020AAzGwIe' class='link' target='_blank'>sexually attracted to oats.</a>",
		possible: () => game.oat_count >= 3_000_000
	},
	beetle1: {
		text: "You have an Oat Beetle",
		possible: () => game.upgrades.beetle.owned > 0
	},
	beetl2: {
		text: "You have two Oat Beetles",
		possible: () => game.upgrades.beetle.owned > 1
	},
	twohundredbeetles: {
		text: "The Beetles: your beetles have inspired the pop band The Beetles to write their hit song <i> I am the beetle, I am the oat man </i>",
		possible: () => game.upgrades.beetle.owned >= 200
	},
	tendmil: {
		text: "Ten million oats... you sure could buy a lotta cows with that",
		possible: () => game.oat_count >= 10_000_000
	},
	tril: {
		text: "Oat Lord: you have a trillion oats",
		possible: () => game.oat_count >= 1_000_000_000_000
	},
	tentril: {
		text: "Ten trillion oats: go outside",
		possible: () => game.oat_count >= 10_000_000_000_000
	},
	hundredtril: {
		text: "100 trillion oats! that's 100,000,000,000,000",
		possible: () => game.oat_count >= 100_000_000_000_000
	},
	quad: {
		text: "you have a quadrillion oats",
		possible: () => game.oat_count >= 1_000_000_000_000_000
	},
	granary: {
		text: "you were never one of them money hungry fools. you're hungry for <i>oats</i>!",
		possible: () => game.upgrades.granary.owned > 0
	},
	debt: {
		text: "debt: your oat count is in the negatives",
		possible: () => game.oat_count < 0
	},
	peta: {
		text: "PETA wants you dead for animal cruelty. Preferably burned at a stake, but any form of cruel execution will do.",
		possible: () => game.upgrades.cow.multiplier > 1
	},
	temple: {
		text: "You have founded a new religion.",
		possible: () => game.upgrades.temple.owned > 0
	},
	preist: {
		text: "Priest: you are a powerful leader",
		possible: () => game.upgrades.temple.owned >= 5
	},
	poly1: {
		text: "two gods are better than one",
		possible: () => game.upgrades.polytheism.owned >= 1
	},
	poly5: {
		text: "Suck-up: you \"please\" five gods",
		possible: () => game.upgrades.polytheism.owned >= 5
	},
	poly10: {
		text: "Your many oat gods love you almost as much as you love them",
		possible: () => game.upgrades.polytheism.owned >= 10
	},
	poly100: {
		text: "Oat Messiah: Your religion has inspired the popular prog rock band \"No\" to create their latest album, <i> Theatrics </i>",
		possible: () => game.upgrades.polytheism.owned >= 100
	},
	jesus: {
		text: "Better than Jesus: your Oat Gods are way cooler than the messiah",
		possible: () => game.upgrades.polytheism.owned >= 200
	},
	gold: {
		text: "Gold is beter than wood!",
		possible: () => game.upgrades.gold.owned >= 1
	},
	gold5: {
		text: "Wowie you sure can click those oats",
		possible: () => game.upgrades.gold.owned >= 5
	},
	gold15: {
		text: "Super cookware: your cookware is of immense power!",
		possible: () => game.upgrades.gold.owned >= 15
	},
	gold30: {
		text: "Thiccccc pots: your oat pots are hella thicccccc (just like to co-creator of this game)",
		possible: () => game.upgrades.gold.owned >= 30
	},
	poly50: {
		text: "The fifty oat gods way up in the sky just gave you fifty oats each",
		possible: () => {
			if (game.upgrades.polytheism >= 50) {
				game.oat_count += 50 * 50;
				return true;
			}
			return false;
		}
	}
};
