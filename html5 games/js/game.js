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

<<<<<<< HEAD
// enum for cards
var CardEnum = {
	//level 1 monster cards
	GEEZARD:"Geezard",
	FUNGUAR:"Funguar",
	BITEBUG:"BiteBug",
	REDBAT:"RedBat",
	BLOBRA:"Blobra",
	GAYLA:"Gayla",
	GESPER:"Gesper",
	FASTITOCALONF:"Fastitocalon-F",
	BLOODSOUL:"BloodSoul",
	CATERCHIPILLAR:"Caterchipillar",
	COCKATRICE:"Cockatrice",
	//level 2 monster cards
	GRAT:"Grat",
	BUEL:"Buel",
	MESMERIZE:"Mesmerize",
	GLACIALEYE:"GlacialEye",
	BELHELMEL:"Belhelmel",
	THRUSTAEVIS:"Thrustaevis",
	ANACONDAUR:"Anacondaur",
	CREEPS:"Creeps",
	GRENDEL:"Grendel",
	JELLEYE:"Jelleye",
	GRANDMANTIS:"GrandMantis",
	//level 3 monster cards
	FORBIDDEN:"Forbidden",
	ARMADODO:"Armadodo",
	TriFace:"Tri-Face",
	FASTITOCALON:"Fastitocalon",
	SNOWLION:"SnowLion",
	OCHU:"Ochu",
	SAM08G:"SAM08G",
	DEATHCLAW:"DeathClaw",
	CACTUAR:"Cactuar",
	TONBERRY:"Tonberry",
	ABYSSWORM:"AbyssWorm",
	//level 4 monster cards
	TURTAPOD:"Turtapod",
	VYSAGE:"Vysage",
	TREXAUR:"T-Rexaur",
	BOMB:"Bomb",
	BLITZ:"Blitz",
	WENDIGO:"Wendigo",
	TORAMA:"Torama",
	IMP:"Imp",
	BLUEDRAGON:"BlueDragon",
	ADAMANTOISE:"Adamantoise",
	HEXADRAGON:"Hexadragon",
	//level 5 monster cards
	IRONGIANT:"Iron Giant",
	BEHEMOTH:"Behemoth",
	CHIMERA:"Chimera",
	
};

=======
>>>>>>> origin/master

// srcX and srcY are the initial coordinates of the background image, usually (0,0)
// the background will be drawn from srcX and srcY to gameWidth and gameHeight
// this is the dimension of the background image
// drawX and drawY are coordinates to tell where to begin to the sprite and gameWidth and gameHeight
// are coordinates where it will end. 

// main functions

function init(){
<<<<<<< HEAD

	soundBg();
=======
	SoundBg();
>>>>>>> origin/master
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
}

<<<<<<< HEAD
function setPlayerHand() {
		// card 4 at bottom of pile, card 0 at top
		// future: cards[0].position = playerHand[0];
		
		playerCards[0].drawX = col4 * widthScale;
		playerCards[1].drawX = col4 * widthScale;
		playerCards[2].drawX = col4 * widthScale;
		playerCards[3].drawX = col4 * widthScale;
		playerCards[4].drawX = col4 * widthScale;
		
		playerCards[0].drawY = row0 * heightScale;
		playerCards[1].drawY = row1 * heightScale;
		playerCards[2].drawY = row2 * heightScale;
		playerCards[3].drawY = row3 * heightScale;
		playerCards[4].drawY = row4 * heightScale;
}

function setEnemyHand() {
		// card 9 at bottom of pile, card 5 at top
		// future: cards[5].position = enemyHand[0];
		
		enemyCards[0].drawX = col0 * widthScale;
		enemyCards[1].drawX = col0 * widthScale;
		enemyCards[2].drawX = col0 * widthScale;
		enemyCards[3].drawX = col0 * widthScale;
		enemyCards[4].drawX = col0 * widthScale;
		
		enemyCards[0].drawY = row0 * heightScale;
		enemyCards[1].drawY = row1 * heightScale;
		enemyCards[2].drawY = row2 * heightScale;
		enemyCards[3].drawY = row3 * heightScale;
		enemyCards[4].drawY = row4 * heightScale;
}

function placeOnBoard(card) { //(card, location) {
	// not used yet
	/*
	//var location = 
	
	// if card not already placed on board & board location isn't taken
	if (cards[card].onBoard == false) {
		//columns 1, 2, 3
		//rows 0, 2, 4
		//0, 1, 2
		//3, 4, 5
		//6, 7, 8
		
		
		
	}*/
}

function Finger() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 32;
	this.height = 32;
	this.selected = 0; // card selected
	this.player = true; // boolean for either player or enemy
}

Finger.prototype.highlight = function(card) {
	
	var playerCol = gameWidth - (32 * widthScale) - (64 * widthScale) - (24 * widthScale);
	var enemyCol =  (24 - 32) * widthScale;
	
	//only fix previous card's position if not placed on board
	
	if (this.player == true) {
		// player card
		if (playerCards[this.selected].onBoard == false) {
			// if card is not already on board, return card to original position in hand
			playerCards[this.selected].drawX = ((gameWidth/widthScale) - 64 - 24) * widthScale;
		}
	} else {
		// enemy card
		if (enemyCards[this.selected].onBoard == false) {
			// if card is not already on board, return card to original position in hand
			enemyCards[this.selected].drawX = 24 * widthScale;
		}
	}
	
	/*if (cards[this.selected].onBoard == false) {
		if (this.selected == 0 || this.selected == 1 || this.selected == 2
			|| this.selected == 3 || this.selected == 4) {
			cards[this.selected].drawX = ((gameWidth/widthScale) - 64 - 24) * widthScale;
		} else {
			cards[this.selected].drawX = 24 * widthScale;
		}
	}*/
	
	//only move selected card out if not already on board
	if (this.player == true) {
		if (playerCards[card].onBoard == false) {
			playerCards[card].drawX = ((gameWidth/widthScale) - 64 - 24 - 8) * widthScale;
		}
		CursorMove.play();
	} else {
		if (enemyCards[card].onBoard == false) {
			enemyCards[card].drawX = (24 * widthScale) -  (8 * widthScale);
		}
		CursorMove.play();
	}
	
	this.selected = card;
	
	if (this.player) {
		this.drawX = playerCol;
	} else {
		this.drawX = enemyCol;
	}
	
	if (card == 0) { this.drawY = (row0 + 16) * heightScale; }
	if (card == 1) { this.drawY = (row1 + 16) * heightScale; }
	if (card == 2) { this.drawY = (row2 + 16) * heightScale; }
	if (card == 3) { this.drawY = (row3 + 16) * heightScale; }
	if (card == 4) { this.drawY = (row4 + 16) * heightScale; }	
}

Finger.prototype.hoverboard = function() {
	// hover finger above board, move with arrow keys, select place for card
	
	//columns 1, 2, 3
	//rows 0, 2, 4
	//0, 1, 2
	//3, 4, 5
	//6, 7, 8
	
	// just places corresponding card onto corresponding board place for now
	
	if (this.selected == 0 && this.player) {
		playerCards[0].drawX = col1 * widthScale;
		playerCards[0].drawY = row0 * heightScale;
		playerCards[0].onBoard = true;
	}
	if (this.selected == 1 && this.player) {
		playerCards[1].drawX = col2 * widthScale;
		playerCards[1].drawY = row0 * heightScale;
		playerCards[1].onBoard = true;
	}
	if (this.selected == 2 && this.player) {
		playerCards[2].drawX = col3 * widthScale;
		playerCards[2].drawY = row0 * heightScale;
		playerCards[2].onBoard = true;
	}
	if (this.selected == 3 && this.player) {
		playerCards[3].drawX = col1 * widthScale;
		playerCards[3].drawY = row2 * heightScale;
		playerCards[3].onBoard = true;
	}
	if (this.selected == 4 && this.player) {
		playerCards[4].drawX = col2 * widthScale;
		playerCards[4].drawY = row2 * heightScale;
		playerCards[4].onBoard = true;
	}
	if (this.selected == 0 && this.player == false) {
		enemyCards[0].drawX = col3 * widthScale;
		enemyCards[0].drawY = row2 * heightScale;
		enemyCards[0].onBoard = true;
	}
	if (this.selected == 1 && this.player == false) {
		enemyCards[1].drawX = col1 * widthScale;
		enemyCards[1].drawY = row4 * heightScale;
		enemyCards[1].onBoard = true;
	}
	if (this.selected == 2 && this.player == false) {
		enemyCards[2].drawX = col2 * widthScale;
		enemyCards[2].drawY = row4 * heightScale;
		enemyCards[2].onBoard = true;
	}
	if (this.selected == 3 && this.player == false) {
		enemyCards[3].drawX = col3 * widthScale;
		enemyCards[3].drawY = row4 * heightScale;
		enemyCards[3].onBoard = true;
	}
	
	
}

Finger.prototype.place = function() {
	// places card
	
}

Finger.prototype.draw = function() {
	clearCtxFinger();
	
	ctxFinger.drawImage(fingerImg,this.srcX,this.srcY,gameWidth,gameHeight,
				this.drawX,this.drawY,gameWidth*widthScale,gameHeight*heightScale);
}

function clearCtxFinger() {
	ctxFinger.clearRect(0,0,gameWidth,gameHeight);
}

// end of main functions

=======
function clearCtxBg(){
		ctxBg.clearRect(0,0,gameWidth,gameHeight);
}
// end of main functions
>>>>>>> origin/master


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
<<<<<<< HEAD
	this.flip = false;
	
	// Card values, future implementation
	this.top;
	this.left;
	this.right;
	this.bottom;
	this.element;
}

Card.prototype.randomize = function() {
	// This function gets a random card image
	// from the card sheet
	// 28 columns, 4 rows
	// column 27, row 4 is back of card,
	// column 28, row 4 is blank
	
	var col = Math.floor((Math.random() * 28)); // 0-27
	var row = Math.floor((Math.random() * 4));	// 0-3
	
	while (row == 3 && (col == 26 || col == 27)) {
		// if rng chooses back of card or blank space,
		// regenerate until actual card is found
		col = Math.floor((Math.random() * 28)); // 0-27
		row = Math.floor((Math.random() * 4));	// 0-3
	}
	
	this.srcX = 64 * col;
	this.srcY = 64 * row;
	this.origX = 64 * col;
	this.origY = 64 * row;
	
=======
	this.flip = true;
	this.placement = 1;
>>>>>>> origin/master
}

Card.prototype.draw = function () {
	clearCtxCard();
	this.checkKeys();
	ctxCard.drawImage(imgCard,this.srcX,this.srcY,this.width,this.height,
		this.drawX,this.drawY,this.width*widthScale,this.height*heightScale);
	//ctxCard.drawImage(imgCard,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*2,gameHeight*3);
};

<<<<<<< HEAD
Card.prototype.frontFlip = function () {

	if (this.flip) {
		if (this.heightScale > 0 && this.shrink == true) {
			this.drawY += 4;
			this.heightScale -= 0.125;
		}
=======
Card.prototype.checkKeys = function () {
	if (isUpKey) {
		// play cursor movement sound
		CursorMove.play();
		// flip test
		var origScale = 2.5;
>>>>>>> origin/master
		
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
<<<<<<< HEAD
	if (isUpKey) {
		
	} 
	if (isRightKey) {
		
	}
	if (isDownKey) {
=======
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
>>>>>>> origin/master
		
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
<<<<<<< HEAD
=======
		// play cursor movement sound
		CursorMove.play();
		// left side placement test
		var row1 = 16;
		var row2 = 48;
		var row3 = 80;
		var row4 = 112;
		var row5 = 144;
		
		var col = 24;
>>>>>>> origin/master
		
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
