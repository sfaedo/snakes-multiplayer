class Board {
	gameStart = false;
	eatApple = false;

	constructor(rows, columns, size, height) {
		this.board = [];
		this.rows = rows;
		this.columns = columns;
		this.size = size;
		this.height = height;

		for (let i = 0; i < this.rows * this.columns; i++) {
			this.board.push(null);
		}

		this.players = [null, null, null, null];
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.translate(4, 4);

		this.board.forEach((cell, index) => {
			if (cell) {
				cell.draw(ctx);
			}
		});

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.stroke();
	}

	drawBackground(ctx) {
		ctx.beginPath();
		ctx.translate(4, 4);

		this.board.forEach((cell, index) => {
			const x = index % this.columns;
			const y = Math.floor(index / this.columns);
			ctx.rect(x * size, y * size, size - 4, size - 4);
		});

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.stroke();
	}

	update(diffTick) {
		if (!this.gameStart) {
			let allReady = true && this.players.filter((player) => player).length;

			this.players.forEach((player) => {
				if (player) {
					player.update();

					if (player.data.quit) {
						player.reset();
						this.playerRemove(player);
						allReady =
							true && this.players.filter((player) => player).length;
					} else {
						allReady = allReady && player.ready;
					}
				}
			});

			if (allReady) {
				this.gameBegin();
			}
		} else {
			this.players.forEach((player) => {
				if (player) {
					player.update();

					const coord = player.snake.update(
						diffTick,
						player.data.velX,
						player.data.velY
					);

					if (coord) {
						if (
							coord.x >= 0 &&
							coord.x < this.columns &&
							coord.y >= 0 &&
							coord.y < this.rows
						) {
							let energy = 0;
							const cell = this.board[coord.x + coord.y * this.columns];
							const isApple = cell instanceof Apple;
							const isSnake =
								cell instanceof Snake || cell instanceof Tail;

							if (!this.eatApple) {
								this.eatApple = isApple;
							}

							if (isApple) {
								player.snake.addEnergy(cell.energy);
								player.updateBoardScore();
								this.move(player.snake, coord.x, coord.y);
							} else if (isSnake) {
								// Hit a snake
							} else {
								this.move(player.snake, coord.x, coord.y);
							}
						} else {
							// Hit a wall
						}
					}
				}
			});

			if (this.eatApple) {
				this.eatApple = false;
				this.appleAdd();
			}
		}
	}

	move(current, x, y) {
		const next = current.next;

		if (next) {
			next.energy = current.energy;
			this.move(next, current.x, current.y);

			if (current.energy) {
				current.energy--;
			}
		} else {
			if (current.energy) {
				const newTail = new Tail(
					current.x,
					current.y,
					this.size,
					current.color,
					null
				);

				current.next = newTail;
				this.boardSet(current.x, current.y, newTail);
			} else {
				this.boardSet(current.x, current.y, null);
			}
		}

		this.boardSet(x, y, current);
		current.x = x;
		current.y = y;
	}

	starting = [
		{ x: 6, y: 6, vx: 1, vy: 0, c1: '#008800', c2: '#00BB00' },
		{ x: 13, y: 13, vx: -1, vy: 0, c1: '#888800', c2: '#BBBB00' },
		{ x: 6, y: 13, vx: 0, vy: -1, c1: '#000088', c2: '#0000BB' },
		{ x: 13, y: 6, vx: 0, vy: 1, c1: '#008888', c2: '#00BBBB' },
	];

	playerAdd(controller) {
		let position = 4;

		for (let i = 0; i < 4; i++) {
			if (!this.players[i]) {
				position = i;
				break;
			}
		}

		if (position != 4) {
			const start = this.starting[position];

			const tail2 = new Tail(
				start.x - 2 * start.vx,
				start.y - 2 * start.vy,
				this.size,
				start.c2,
				null
			);
			const tail1 = new Tail(
				start.x - start.vx,
				start.y - start.vy,
				this.size,
				start.c2,
				tail2
			);
			const snake = new Snake(
				start.x,
				start.y,
				this.size,
				start.c1,
				start.vx,
				start.vy,
				tail1
			);

			const player = new Player({
				index: position,
				controller,
				snake,
				colorPrimary: start.c1,
				colorSecondary: start.c2,
			});
			player.updateBoardData();
			this.players[position] = player;
			this.boardSet(snake.x, snake.y, snake);
			this.boardSet(tail1.x, tail1.y, tail1);
			this.boardSet(tail2.x, tail2.y, tail2);
		}
	}

	playerRemove(player) {
		for (let i = 0; i < 4; i++) {
			if (this.players[i] === player) {
				this.players[i] = null;
				player.controller = null;

				let cell = player.snake;
				while (cell) {
					this.boardSet(cell.x, cell.y, null);
					let temp = cell.next;
					cell.next = null;
					cell = temp;
				}
				break;
			}
		}
	}

	gameBegin() {
		this.players.forEach((player) => {
			if (player) {
				player.playing();
			}
		});
		this.appleAdd();
		this.gameStart = true;
	}

	boardSet(x, y, cell) {
		this.board[x + y * this.columns] = cell;
	}

	appleAdd() {
		const freeCells = [];
		this.board.forEach((cell, index) => {
			if (!cell) {
				freeCells.push(index);
			}
		});

		if (freeCells.length) {
			const index = freeCells[Math.floor(Math.random() * freeCells.length)];

			const x = index % this.columns;
			const y = Math.floor(index / this.columns);

			const apple = new Apple(x, y, this.size);
			this.board[index] = apple;
		} else {
			// board complete!!!!!
		}
	}
}
