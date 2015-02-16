var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

var canvasCard = document.getElementById('canvasCard');
var ctxCard = canvasCard.getContext('2d');

var card1;
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var fps = 10;
var drawInterval;
var widthScale = 2;
var heightScale = 2.5;

var isUpKey = false;
var isRightKey = false;
var isDownKey = false;
var isLeftKey = false;

// sounds
var MainTheme = new Audio('sounds/ShuffleBoogie.mp3');
var CursorMove = new Audio('sounds/CursorMove.mp3');

var imgBg = new Image();
imgBg.src = 'images/board.png';
//imgBg.addEventListener('load',drawBg,false);

var imgCard = new Image();
imgCard.src = 'images/card2.png';
//imgCard.addEventListener('load',drawCard,false);

// sprite sheet test
//19, 2
//var imgCard = new Image();
//imgCard.src = 'images/cards.png';
//imgCard.addEventListener('load',drawCard,false);


imgBg.addEventListener('load',init,false);


// srcX and srcY are the initial coordinates of the background image, usually (0,0)
// the background will be drawn from srcX and srcY to gameWidth and gameHeight
// this is the dimension of the background image
// drawX and drawY are coordinates to tell where to begin to the sprite and gameWidth and gameHeight
// are coordinates where it will end. 

// main functions

function init(){
	SoundBg();
	drawBg();
	startDrawing();
	card1 = new Card();
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
}

function draw() {
	card1.draw();
}

function startDrawing() {
	stopDrawing();
	drawInterval = setInterval(draw,fps);
}

function stopDrawing() {
	clearInterval(drawInterval);
}

function drawBg(){
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	ctxBg.drawImage(imgBg,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*widthScale,gameHeight*heightScale);
}

// play main theme
// loop the song indefinitely
// however to simply play a sounds one time
// declare a var and initialize that variable and point to the correct file to play it.
// for example var mysound = new Audio('sounds/howl.mp3');
// mysound.play();
function SoundBg(){
	if (typeof MainTheme.loop == 'boolean')
	{
		MainTheme.loop = true;
	}
	else
	{
		MainTheme.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	MainTheme.play();

	function clearCtxBg(){
		ctxBg.clearRect(0,0,gameWidth,gameHeight);
	}
}

// end of main functions







// Card functions

function Card() {
	//this.srcX = 19*64; //video 9 time 4:10
	//this.srcY = 2*64;
	this.srcX = 0; //video 9 time 4:10
	this.srcY = 0;
	this.drawX = 0; //gameWidth/3;
	this.drawY = 0;
	this.width = 64;
	this.height = 64;
	
	this.shrink = true;
	this.front = true;
	this.flip = true;
	this.placement = 1;
}

Card.prototype.draw = function () {
	clearCtxCard();
	this.checkKeys();
	ctxCard.drawImage(imgCard,this.srcX,this.srcY,this.width,this.height,
		this.drawX,this.drawY,this.width*widthScale,this.height*heightScale);
	//ctxCard.drawImage(imgCard,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*2,gameHeight*3);
};

Card.prototype.checkKeys = function () {
	if (isUpKey) {
		// play cursor movement sound
		CursorMove.play();
		// flip test
		var origScale = 2.5;
		
		if (this.flip) {
			if (heightScale > 0 && this.shrink == true) {
				this.drawY += 4;
				heightScale -= 0.125;
			}
			
			if (heightScale == 0) {
				this.shrink = !this.shrink;
				this.front = !this.front;
				//switch to cardBack
				if (this.front) {
					imgCard.src = 'images/card2.png';
				} else {
					imgCard.src = 'images/cardBack.png';
				}
			}
			
			if (this.shrink == false && heightScale < origScale) {
				this.drawY -= 4;
				heightScale += 0.125;
			}
			
			if (heightScale == origScale) {
				// flipping done
				// switch to cardFront
				this.shrink = !this.shrink;
				if (this.front) {
					this.flip = false;
				}
			}
		}
	} else { 
		this.flip = true;
	}
	if (isRightKey) {
		// play cursor movement sound
		CursorMove.play();
		// right side placement test
		var row1 = 16;
		var row2 = 48;
		var row3 = 80;
		var row4 = 112;
		var row5 = 144;
		
		//var col = gameWidth - 164 - 24;
		var col = (gameWidth/widthScale) - 64 - 24;
		
		if (this.placement == 1) {
			this.drawY = row1 * heightScale;
			this.drawX = col * widthScale;
			this.placement++;
		} else if (this.placement == 2) {
			this.drawY = row2 * heightScale;
			this.placement++;
		} else if (this.placement == 3) {
			this.drawY = row3 * heightScale;
			this.placement++;
		} else if (this.placement == 4) {
			this.drawY = row4 * heightScale;
			this.placement++;
		} else if (this.placement == 5) {
			this.drawY = row5 * heightScale;
			this.placement++;
		} else {
			this.placement = 1;
		}
	}
	if (isDownKey) {
		// play cursor movement sound
		CursorMove.play();
		// board placement test
		var row1 = 16;
		var row2 = 80;
		var row3 = 144;
		
		var col1 = 96;
		var col2 = 160;
		var col3 = 224;
		
		if (this.placement == 1) {
			this.drawY = row1 * heightScale;
			this.drawX = col1 * widthScale;
			this.placement++;
		} else if (this.placement == 2) {
			this.drawX = col2 * widthScale;
			this.placement++;
		} else if (this.placement == 3) {
			this.drawX = col3 * widthScale;
			this.placement++;
		} else if (this.placement == 4) {
			this.drawY = row2 * heightScale;
			this.drawX = col1 * widthScale;
			this.placement++;
		} else if (this.placement == 5) {
			this.drawX = col2 * widthScale;
			this.placement++;
		} else if (this.placement == 6) {
			this.drawX = col3 * widthScale;
			this.placement++;
		} else if (this.placement == 7) {
			this.drawY = row3 * heightScale;
			this.drawX = col1 * widthScale;
			this.placement++;
		} else if (this.placement == 8) {
			this.drawX = col2 * widthScale;
			this.placement++;
		} else if (this.placement == 9) {
			this.drawX = col3 * widthScale;
			this.placement++;
		} else {
			this.placement = 1;
		}
	}
	if (isLeftKey) {
		// play cursor movement sound
		CursorMove.play();
		// left side placement test
		var row1 = 16;
		var row2 = 48;
		var row3 = 80;
		var row4 = 112;
		var row5 = 144;
		
		var col = 24;
		
		if (this.placement == 1) {
			this.drawY = row1 * heightScale;
			this.drawX = col * widthScale;
			this.placement++;
		} else if (this.placement == 2) {
			this.drawY = row2 * heightScale;
			this.placement++;
		} else if (this.placement == 3) {
			this.drawY = row3 * heightScale;
			this.placement++;
		} else if (this.placement == 4) {
			this.drawY = row4 * heightScale;
			this.placement++;
		} else if (this.placement == 5) {
			this.drawY = row5 * heightScale;
			this.placement++;
		} else {
			this.placement = 1;
		}
	}
}

function clearCtxCard(){
	ctxCard.clearRect(0,0,gameWidth,gameHeight);
}

// testing card animation

Card.prototype.horizontalFlip = function () {

}

// end testing card animation

// end of Card functions







// event functions

function checkKeyDown(e) {
	var keyID = e.keyCode || e.which;
	if (keyID === 38 || keyID === 87) { // up arrow or W
		//alert('up arrow was pressed');
		isUpKey = true;
		e.preventDefault();
	}
	if (keyID === 39 || keyID === 68) { // right arrow or D
		isRightKey = true;
		e.preventDefault();
	}
	if (keyID === 40 || keyID === 83) { // down arrow or S
		isDownKey = true;
		e.preventDefault();
	}
	if (keyID === 37 || keyID === 65) { // left arrow or A
		isLeftKey = true;
		e.preventDefault();
	}
}

function checkKeyUp(e) {
	var keyID = e.keyCode || e.which;
	if (keyID === 38 || keyID === 87) { // up arrow or W
		isUpKey = false;
		e.preventDefault();
	}
	if (keyID === 39 || keyID === 68) { // right arrow or D
		isRightKey = false;
		e.preventDefault();
	}
	if (keyID === 40 || keyID === 83) { // down arrow or S
		isDownKey = false;
		e.preventDefault();
	}
	if (keyID === 37 || keyID === 65) { // left arrow or A
		isLeftKey = false;
		e.preventDefault();
	}
}

// end of event functions
