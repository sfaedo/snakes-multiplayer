class Snake {
	energy = 0;
	energyTotal = 0;

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
		ctx.fillStyle = this.color;
		ctx.fillRect(
			this.x * this.size + 4,
			this.y * this.size + 4,
			this.size - 12,
			this.size - 12
		);

		if (this.next) {
			this.next.drawNext(ctx, this.x, this.y);
		}
	}
}
