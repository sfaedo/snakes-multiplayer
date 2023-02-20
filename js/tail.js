class Tail {
	energy = 0;
	prev = null;
	canvas = document.createElement('canvas');
	ctx = this.canvas.getContext('2d');

	constructor(x, y, size, color, next) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.next = next;

		const img = document.getElementById('snake-image');
		this.canvas.height = this.size * 4;
		this.canvas.width = this.size * 4;
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0, 0, this.size * 4, this.size * 4);
		this.ctx.globalCompositeOperation = 'destination-in';
		this.ctx.drawImage(
			img,
			0,
			0,
			160,
			160,
			0,
			0,
			this.size * 4,
			this.size * 4
		);
	}

	draw(ctx) {
		let x = 0;
		let y = 0;
		let up = false;
		let down = false;
		let left = false;
		let right = false;

		if (this.prev.x - this.x > 0) {
			right = true;
		}

		if (this.prev.x - this.x < 0) {
			left = true;
		}

		if (this.prev.y - this.y > 0) {
			down = true;
		}

		if (this.prev.y - this.y < 0) {
			up = true;
		}

		if (this.next) {
			if (this.next.x - this.x > 0) {
				right = true;
			}

			if (this.next.x - this.x < 0) {
				left = true;
			}

			if (this.next.y - this.y > 0) {
				down = true;
			}

			if (this.next.y - this.y < 0) {
				up = true;
			}
		}

		if (right && down) {
			x = 0;
			y = 0;
		}

		if (left && down) {
			x = 1;
			y = 0;
		}

		if (right && up) {
			x = 0;
			y = 1;
		}

		if (left && up) {
			x = 1;
			y = 1;
		}

		if (right && left) {
			x = 2;
			y = 2;
		}

		if (up && down) {
			x = 3;
			y = 2;
		}

		if (!this.next) {
			if (right) {
				x = 2;
				y = 0;
			}

			if (left) {
				x = 3;
				y = 1;
			}

			if (up) {
				x = 2;
				y = 1;
			}

			if (down) {
				x = 3;
				y = 0;
			}
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
