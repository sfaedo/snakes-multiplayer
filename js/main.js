let canvasSize = Math.min(window.innerWidth, window.innerHeight);
let canvasMargin =
	(Math.max(window.innerWidth, window.innerHeight) - canvasSize) / 2;

function resizeCanvas() {
	canvasSize = Math.min(window.innerWidth, window.innerHeight);
	canvasMargin =
		(Math.max(window.innerWidth, window.innerHeight) - canvasSize) / 2;

	begin.style.width = canvasMargin + 'px';
	begin.style.height = canvasSize + 'px';
	middle.style.width = canvasSize + 'px';
	middle.style.height = canvasSize + 'px';
	end.style.width = canvasMargin + 'px';
	end.style.height = canvasSize + 'px';

	document.querySelectorAll('.player-board').forEach((element) => {
		element.style.height = (canvasSize - 5) / 4 - 5 + 'px';
	});

	canvasBackground.width = canvasSize;
	canvasBackground.height = canvasSize;
	canvas.width = canvasSize;
	canvas.height = canvasSize;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

window.addEventListener('load', (event) => {
	container.style.display = 'flex';
	begin.style.width = canvasMargin + 'px';
	middle.style.width = canvasSize + 'px';
	end.style.width = canvasMargin + 'px';
	containerLoading.style.display = 'none';
});

const ctx = canvas.getContext('2d');
const ctxBackground = canvasBackground.getContext('2d');
const gpm = new GamePadManager();
const km = new ControllerKeyboard(new ControllerMapperKeyboard());

let x = 21;
let y = 21;
let size = Math.floor(canvasSize / y);

const board = new Board(x, y, size, canvasSize);

const fps = document.querySelector('[data-fps]');

function playersCheck() {
	gpm.scanGamePads();

	if (!board.gameStart) {
		const controllers = [km, ...gpm.getControllers()];

		controllers.forEach((controller) => {
			if (!controller.player) {
				const data = controller.update();

				if (data.enter) {
					board.playerAdd(controller);
				}
			}
		});
	}
}

let lastTick = performance.now();
let addTick = 0;
let frames = 0;
let printFrames = frames;

board.drawBackground(ctxBackground);

function update(currentTick) {
	const diffTick = currentTick - lastTick;
	lastTick = currentTick;

	playersCheck();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	board.update(diffTick);
	board.draw(ctx);

	addTick += diffTick;

	if (addTick > 1000) {
		printFrames = frames;
		frames = 0;
		addTick -= 1000;
	} else {
		frames++;
	}

	fps.innerHTML = printFrames;

	requestAnimationFrame(update);
}

update(lastTick);
