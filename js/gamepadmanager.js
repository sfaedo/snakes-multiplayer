class GamePadManager {
	constructor() {
		this.controllers = {};

		window.addEventListener('gamepadconnected', (e) => {
			this.addGamePad(e.gamepad);
		});
		window.addEventListener('gamepaddisconnected', (e) => {
			this.removeGamePad(e.gamepad);
		});
	}

	addGamePad(gamepad) {
		const controller = new ControllerGamePad(
			new ControllerMapperGamePad(),
			gamepad
		);
		this.controllers[gamepad.index] = controller;
	}

	removeGamePad(gamepad) {
		delete this.controllers[gamepad.index];
	}

	scanGamePads() {
		const gamepads = navigator.getGamepads();
		for (const gamepad of gamepads) {
			if (gamepad) {
				// Can be null if disconnected during the session
				if (gamepad.index in this.controllers) {
					this.controllers[gamepad.index].gamepad = gamepad;
				} else {
					this.addGamePad(gamepad);
				}
			}
		}
	}

	getControllers() {
		return Object.values(this.controllers);
	}
}

/*
gpm.controllers['0'].vibrationActuator.playEffect(gpm.controllers['0'].vibrationActuator.type, { startDelay: 0,
    duration: 5000,
    weakMagnitude: 1,
    strongMagnitude: 1 })
*/
