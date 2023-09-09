// Game configuration and settings
var config = {
	canvasWidth: 800,
	canvasHeight: 600,
	bugSize: 90,
	initialHoppingInterval: 100,
	hoppingIntervalDecrement: 100,
	resetSpeedButton: {
		x: 32,
		y: 32,
		width: 120,
		height: 32
	},
	resetScoreButton: {
		x: 32,
		y: 80,
		width: 120,
		height: 32
	}
};

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
document.body.appendChild(canvas);

// Background image
var backgroundImage = new Image();
backgroundImage.onload = function () {
	render();
};
backgroundImage.src = "images/forest.png";

// Game objects
var bug = {
	x: 0,
	y: 0,
	timer: 0
};
var score = 0;
var hoppingInterval = config.initialHoppingInterval;

// Update bug position and check for collisions
var update = function (modifier) {
	bug.timer -= modifier;
	if (bug.timer <= 0) {
		bug.timer = hoppingInterval / 100;
		bug.x = Math.random() * (config.canvasWidth - config.bugSize);
		bug.y = Math.random() * (config.canvasHeight - config.bugSize);
	}

	canvas.addEventListener("click", function (e) {
		var rect = canvas.getBoundingClientRect();
		var clickX = e.clientX - rect.left;
		var clickY = e.clientY - rect.top;

		if (
			clickX >= bug.x &&
			clickX <= bug.x + config.bugSize &&
			clickY >= bug.y &&
			clickY <= bug.y + config.bugSize
		) {
			score++;
			hoppingInterval -= config.hoppingIntervalDecrement;
			resetBugTimer();
			render();
		}
	});
};

// Reset the bug's movement timer
var resetBugTimer = function () {
	bug.timer = hoppingInterval / 100;
};

// Reset the game speed to the initial hopping interval
var resetSpeed = function () {
	hoppingInterval = config.initialHoppingInterval;
	resetBugTimer();
};

// Reset the score to zero
var resetScore = function () {
	score = 0;
};

// Render game objects on the canvas
var render = function () {
	// Clear the canvas
	ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);

	// Draw the background image
	ctx.drawImage(backgroundImage, 0, 0, config.canvasWidth, config.canvasHeight);


	// Bug image
	var bugImage = new Image();
	bugImage.src = "images/sonic.png";

// Draw the bug
ctx.drawImage(bugImage, bug.x, bug.y, config.bugSize, config.bugSize);


	// Draw the score
	ctx.fillStyle = "#000000";
	ctx.font = "24px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Score: " + score, config.canvasWidth / 2, 30);

	// Draw the reset speed button
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(
		config.resetSpeedButton.x,
		config.resetSpeedButton.y,
		config.resetSpeedButton.width ,
		config.resetSpeedButton.height
	);
	ctx.fillStyle = "#000000";
	ctx.fillText("Reset Speed", config.resetSpeedButton.x + 40,
	 config.resetSpeedButton.y + 22, config.resetScoreButton.height +30,
	 config.resetSpeedButton.width + 30);

	// Draw the reset score button
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(
		config.resetScoreButton.x,
		config.resetScoreButton.y,
		config.resetScoreButton.width,
		config.resetScoreButton.height
	);
	ctx.fillStyle = "#000000";
	ctx.fillText("Reset Score", config.resetScoreButton.x + 
	40, config.resetScoreButton.y + 22,
	config.resetScoreButton.height +30,
	 config.resetSpeedButton.width + 30);
};

// Handle button clicks
canvas.addEventListener("click", function (e) {
	var rect = canvas.getBoundingClientRect();
	var clickX = e.clientX - rect.left;
	var clickY = e.clientY - rect.top;

	// Check if Reset Speed button is clicked
	if (
		clickX >= config.resetSpeedButton.x &&
		clickX <= config.resetSpeedButton.x + config.resetSpeedButton.width &&
		clickY >= config.resetSpeedButton.y &&
		clickY <= config.resetSpeedButton.y + config.resetSpeedButton.height
	) {
		resetSpeed();
	}

	// Check if Reset Score button is clicked
	if (
		clickX >= config.resetScoreButton.x &&
		clickX <= config.resetScoreButton.x + config.resetScoreButton.width &&
		clickY >= config.resetScoreButton.y &&
		clickY <= config.resetScoreButton.y + config.resetScoreButton.height
	) {
		resetScore();
	}
});

// Game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame =
	w.requestAnimationFrame ||
	w.webkitRequestAnimationFrame ||
	w.msRequestAnimationFrame ||
	w.mozRequestAnimationFrame;

// Start the game
var then = Date.now();
resetBugTimer();
main();
