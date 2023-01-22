const PlayerState = {
	GettingReady: 'Getting Ready',
	Ready: 'Ready',
	Playing: 'Playing',
	GameOver: 'Game Over',
};

class Player {
	ready = false;
	status = PlayerState.GettingReady;

	defaultData = {
		name: '',
		colorPrimary: '#888888',
		colorSecondary: '#888888',
		status: 'Open',
		score: '-',
	};

	constructor({ index, controller, snake, colorPrimary, colorSecondary }) {
		this.controller = controller;
		this.index = index;
		this.name = 'Player ' + index;
		this.controller.player = this;
		this.snake = snake;
		this.colorPrimary = colorPrimary;
		this.colorSecondary = colorSecondary;
	}

	update() {
		this.data = this.controller.update();

		if (!this.ready && this.data.enter) {
			this.ready = true;
			this.status = PlayerState.Ready;
			this.updateBoardData();
		}
	}

	reset() {
		this.colorPrimary = this.defaultData.colorPrimary;
		this.colorSecondary = this.defaultData.colorSecondary;
		this.status = this.defaultData.status;
		this.snake.energyTotal = this.defaultData.score;
		this.name = this.defaultData.name;

		this.controller.player = null;

		this.updateBoardData();
	}

	playing() {
		this.status = PlayerState.Playing;
		this.updateBoardData();
	}

	updateBoardData() {
		document.querySelector(`[data-player-board-${this.index + 1}]`).style[
			'border-color'
		] = this.colorSecondary;
		document.querySelector(`[data-player-board-${this.index + 1}]`).style[
			'color'
		] = this.colorPrimary;

		document.querySelector(
			`[data-player-board-name-${this.index + 1}]`
		).innerHTML = this.name;
		document.querySelector(
			`[data-player-board-name-${this.index + 1}]`
		).style['color'] = this.colorSecondary;

		document.querySelector(
			`[data-player-board-score-${this.index + 1}]`
		).innerHTML = this.snake.energyTotal;
		document.querySelector(
			`[data-player-board-score-${this.index + 1}]`
		).style['color'] = this.colorSecondary;

		document.querySelector(
			`[data-player-board-status-${this.index + 1}]`
		).innerHTML = this.status;
		document.querySelector(
			`[data-player-board-status-${this.index + 1}]`
		).style['color'] = this.colorSecondary;
	}

	updateBoardScore() {
		document.querySelector(
			`[data-player-board-score-${this.index + 1}]`
		).innerHTML = this.snake.energyTotal;
	}
}
