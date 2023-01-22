class Apple {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.energy = 2;
	}

	draw(ctx) {
		ctx.fillStyle = '#BB0000';
		ctx.fillRect(
			this.x * this.size + 4,
			this.y * this.size + 4,
			this.size - 12,
			this.size - 12
		);
	}
}
