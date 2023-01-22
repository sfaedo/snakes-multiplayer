class Tail {
	energy = 0;

	constructor(x, y, size, color, next) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.next = next;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;

		const drawX = this.x * this.size + this.size / 2 - 2;
		const drawY = this.y * this.size + this.size / 2 - 2;

		ctx.fillRect(
			this.x * this.size + 4,
			this.y * this.size + 4,
			this.size - 12,
			this.size - 12
		);
	}

	drawNext(ctx, x, y) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;

		const prevX = x - this.x;
		const prevY = y - this.y;

		if (prevX > 0) {
			ctx.fillRect(
				x * this.size - this.size / 2,
				y * this.size + 4,
				this.size / 2,
				this.size - 12
			);
		}

		if (prevX < 0) {
			ctx.fillRect(
				this.x * this.size,
				this.y * this.size + 4,
				this.size / 2,
				this.size - 12
			);
		}

		if (prevY > 0) {
			ctx.fillRect(
				x * this.size + 4,
				y * this.size - this.size / 2,
				this.size - 12,
				this.size / 2
			);
		}

		if (prevY < 0) {
			ctx.fillRect(
				this.x * this.size + 4,
				this.y * this.size,
				this.size - 12,
				this.size / 2
			);
		}

		if (this.next) {
			const nextX = this.x - this.next.x;
			const nextY = this.y - this.next.y;

			if (nextX > 0) {
				ctx.fillRect(
					this.x * this.size,
					this.y * this.size + 4,
					this.size / 2,
					this.size - 12
				);
			}

			if (nextX < 0) {
				ctx.fillRect(
					this.next.x * this.size - this.size / 2,
					this.next.y * this.size + 4,
					this.size / 2,
					this.size - 12
				);
			}

			if (nextY > 0) {
				ctx.fillRect(
					this.x * this.size + 4,
					this.y * this.size,
					this.size - 12,
					this.size / 2
				);
			}

			if (nextY < 0) {
				ctx.fillRect(
					this.next.x * this.size + 4,
					this.next.y * this.size - this.size / 2,
					this.size - 12,
					this.size / 2
				);
			}
		}

		ctx.fill();

		if (this.next) {
			this.next.drawNext(ctx, this.x, this.y);
		}
	}
}
