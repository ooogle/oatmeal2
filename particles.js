let particles = [];
function startparticles() {
	let canvas = document.querySelector("#falling_oats");
	let context = canvas.getContext("2d");
	let resize = () => {
		canvas.height = document.querySelector("#oat-col").clientHeight + 200;
		canvas.width = document.querySelector("#oat-col").clientWidth - 10;
	}
	window.onresize = resize;
	resize();
	
	let animatestuff = () => {
		requestAnimationFrame(animatestuff);
		if (!document.hasFocus()) return;
		
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let particle of particles) {
			context.globalAlpha = particle.y > canvas.height / 2 ? (canvas.height - particle.y) / (canvas.height / 2) : 1
			context.drawImage(oat_image, Math.floor(particle.x), Math.floor(particle.y), particle.size, Math.floor(oat_image.height / oat_image.width * particle.size));
			particle.y += particle.speed;
			if (particle.y >= canvas.height || particle.x > canvas.width - 37) setTimeout(() => particles.splice(particles.indexOf(particle), 1), 0);
		}
	}
	animatestuff();
}

function add_particles(amount) {
	if (particles.length > 95) return;
	if (screen.width <= 1000 && particles.length > 32) return;
	let canvas = document.querySelector("#falling_oats");
	for (let i = 0; i < amount; i++) {
		particles.push({
			x: randint(5, canvas.width - 36),
			y: randint(-250, -40),
			size: randint(19, 32),
			speed: randint(16, 43) / 10
		});
	}
}
