class Snake {
	energy = 0;
	energyTotal = 0;
	canvas = document.createElement('canvas');
	ctx = this.canvas.getContext('2d');

	constructor(x, y, size, color, velX, velY, next) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.next = next;

		this.velX = velX;
		this.velY = velY;
		this.nextVelX = velX;
		this.nextVelY = velY;

		this.tickAdd = 0;
		this.tickRate = 250;

		const img = document.getElementById('snake-image');
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0, 0, this.size * 2, this.size * 2);
		this.ctx.globalCompositeOperation = 'destination-in';
		this.ctx.drawImage(
			img,
			0,
			80,
			80,
			80,
			0,
			0,
			this.size * 2,
			this.size * 2
		);
	}

	update(diffTick, velX, velY) {
		this.tickAdd += diffTick;

		if (velX || velY) {
			this.nextVelX = velX;
			this.nextVelY = velY;
		}

		if (this.tickAdd > this.tickRate) {
			if (this.nextVelX || this.nextVelY) {
				if (this.nextVelX !== -this.velX || this.nextVelY !== -this.velY) {
					this.velX = this.nextVelX;
					this.velY = this.nextVelY;
				}
			}

			this.tickAdd -= this.tickRate;

			return { x: this.x + this.velX, y: this.y + this.velY };
		}
	}

	addEnergy(energy) {
		this.energy += energy;
		this.energyTotal += energy;
	}

	draw(ctx) {
		let x = 0;
		let y = 0;

		if (this.velX > 0) {
			x = 1;
			y = 1;
		}

		if (this.velX < 0) {
			x = 0;
			y = 0;
		}

		if (this.velY > 0) {
			x = 0;
			y = 1;
		}

		if (this.velY < 0) {
			x = 1;
			y = 0;
		}

		ctx.drawImage(
			this.canvas,
			x * this.size,
			y * this.size,
			this.size,
			this.size,
			this.x * this.size,
			this.y * this.size,
			this.size,
			this.size
		);
	}
}
