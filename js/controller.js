class ControllerMapper {
	constructor() {
		this.keyDown = {};

		this.data = {
			velX: 0,
			velY: 0,
			enter: false,
			quit: false,
		};
	}

	getData() {
		let data = this.data;
		this.data = {
			velX: 0,
			velY: 0,
			enter: false,
			quit: false,
		};

		return data;
	}

	keyDownMethod(code, keys) {
		if (this.keyDown[code]) {
			this.keyDown[code](keys);
		}
	}
}

class ControllerMapperKeyboard extends ControllerMapper {
	constructor() {
		super();

		this.keyDown['ArrowUp'] = (keys) => {
			this.data.velX = 0;
			this.data.velY = -1;
		};

		this.keyDown['ArrowDown'] = (keys) => {
			this.data.velX = 0;
			this.data.velY = 1;
		};

		this.keyDown['ArrowLeft'] = (keys) => {
			this.data.velX = -1;
			this.data.velY = 0;
		};

		this.keyDown['ArrowRight'] = (keys) => {
			this.data.velX = 1;
			this.data.velY = 0;
		};

		this.keyDown['Enter'] = (keys) => {
			this.data.enter = true;
		};

		this.keyDown['Escape'] = (keys) => {
			this.data.quit = true;
		};

		this.keyDown['Digit2'] = this.keyDown['ArrowUp'];
		this.keyDown['Digit8'] = this.keyDown['ArrowDown'];
		this.keyDown['Digit4'] = this.keyDown['ArrowLeft'];
		this.keyDown['Digit6'] = this.keyDown['ArrowRight'];
		this.keyDown['Digit5'] = this.keyDown['Enter'];
		this.keyDown['Backspace'] = this.keyDown['Escape'];
		this.keyDown['Digit0'] = this.keyDown['Escape'];
	}
}

class ControllerMapperGamePad extends ControllerMapper {
	constructor() {
		super();

		this.keyDown['Axes0'] = (keys) => {
			const x = keys.Axes0;
			const y = keys.Axes1;

			if (x && Math.abs(x) > Math.abs(y)) {
				this.data.velY = 0;

				if (x > 0) {
					this.data.velX = 1;
				} else {
					this.data.velX = -1;
				}
			}
		};

		this.keyDown['Axes1'] = (keys) => {
			const x = keys.Axes0;
			const y = keys.Axes1;

			if (y && Math.abs(x) <= Math.abs(y)) {
				this.data.velX = 0;

				if (y > 0) {
					this.data.velY = 1;
				} else {
					this.data.velY = -1;
				}
			}
		};

		this.keyDown['Button0'] = (keys) => {
			this.data.enter = true;
		};

		this.keyDown['Button1'] = (keys) => {
			this.data.quit = true;
		};

		this.keyDown['Button12'] = (keys) => {
			this.data.velX = 0;
			this.data.velY = -1;
		};

		this.keyDown['Button13'] = (keys) => {
			this.data.velX = 0;
			this.data.velY = 1;
		};

		this.keyDown['Button14'] = (keys) => {
			this.data.velX = -1;
			this.data.velY = 0;
		};

		this.keyDown['Button15'] = (keys) => {
			this.data.velX = 1;
			this.data.velY = 0;
		};
	}
}

class Controller {
	player = null;
	keys = {};

	constructor(mapper) {
		this.mapper = mapper;
	}

	update() {
		return this.mapper.getData();
	}

	keyDownMethod(code, keys) {
		this.mapper.keyDownMethod(code, keys);
	}
}

class ControllerKeyboard extends Controller {
	keysDown = {};

	constructor(mapper) {
		super(mapper);

		window.addEventListener('keydown', ({ code }) => {
			if (!this.keysDown[code]) {
				this.keysDown[code] = 1;
			}
		});

		window.addEventListener('keyup', ({ code }) => {
			delete this.keysDown[code];
			delete this.keys[code];
		});
	}

	update() {
		const keys = [];

		for (let key in this.keysDown) {
			if (!this.keys[key]) {
				this.keys[key] = 1;

				keys.push(key);
			}
		}

		keys.forEach((key) => {
			this.keyDownMethod(key, this.keys);
		});

		return this.mapper.getData();
	}
}

class ControllerGamePad extends Controller {
	constructor(mapper, gamepad) {
		super(mapper);

		this.deathZone = 0.3;
		this.gamepad = gamepad;
		this.keys = {};
	}

	update() {
		const keys = [];

		this.gamepad.axes.forEach((axes, index) => {
			if (Math.abs(axes) > this.deathZone) {
				this.keys[`Axes${index}`] = axes;
			} else {
				this.keys[`Axes${index}`] = 0;
			}

			keys.push(`Axes${index}`);
		});

		this.gamepad.buttons.forEach((button, index) => {
			if (button.pressed) {
				if (!this.keys[`Button${index}`]) {
					this.keys[`Button${index}`] = 1;

					keys.push(`Button${index}`);
				}
			} else {
				delete this.keys[`Button${index}`];
			}
		});

		keys.forEach((key) => {
			this.keyDownMethod(key, this.keys);
		});

		return this.mapper.getData();
	}
}
