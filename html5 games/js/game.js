var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

// I don't know how to make these variables work in an array.
// Will change them to an array once I figure it out.

var card0 = document.getElementById('card0');
var ctxCard0 = card0.getContext('2d');

var card1 = document.getElementById('card1');
var ctxCard1 = card1.getContext('2d');

var card2 = document.getElementById('card2');
var ctxCard2 = card2.getContext('2d');

var card3 = document.getElementById('card3');
var ctxCard3 = card3.getContext('2d');

var card4 = document.getElementById('card4');
var ctxCard4 = card4.getContext('2d');

var card5 = document.getElementById('card5');
var ctxCard5 = card5.getContext('2d');

var card6 = document.getElementById('card6');
var ctxCard6 = card6.getContext('2d');

var card7 = document.getElementById('card7');
var ctxCard7 = card7.getContext('2d');

var card8 = document.getElementById('card8');
var ctxCard8 = card8.getContext('2d');

var card9 = document.getElementById('card9');
var ctxCard9 = card9.getContext('2d');

var canvasFinger = document.getElementById('canvasFinger');
var ctxFinger = canvasFinger.getContext('2d');

var cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var fps = 10;
var drawInterval;

// a Card object has an individual widthScale and heightScale used for animation.
// These two variables are global scaling variables, used as the
// original scales for all iamges at initialization
var widthScale = 2;
var heightScale = 2.5;

// future: double array for board cards, stores either card or enemyCard index
// future: array to store pixel locations of placements (player/enemy hand, board)
var row0 = 16; // row 1 in hand, row 1 on board
var row1 = 48; // row 2 in hand
var row2 = 80; // row 3 in hand, row 2 on board
var row3 = 112;// row 4 in hand
var row4 = 144;// row 5 in hand, row 3 on board

var col0 = 24;	
var col1 = 96;
var col2 = 160;
var col3 = 224;
var col4 = (gameWidth/widthScale) - 64 - 24;

// change to double array when figure out how
var board0 = -1;
var board1 = -1;
var board2 = -1;
var board3 = -1;
var board4 = -1;
var board5 = -1;
var board6 = -1;
var board7 = -1;
var board8 = -1;

var isUpKey = false;
var isRightKey = false;
var isDownKey = false;
var isLeftKey = false;
var is0Key = false;
var is1Key = false;
var is2Key = false;
var is3Key = false;
var is4Key = false;
var is5Key = false;
var is6Key = false;
var is7Key = false;
var is8Key = false;
var is9Key = false;
var isSpacebarKey = false;
var isFKey = false;

// sounds
var MainTheme = new Audio('sounds/ShuffleBoogie.mp3');
var CursorMove = new Audio('sounds/CursorMove.mp3');

var imgBg = new Image();
imgBg.src = 'images/board.png';

var cardSheet = new Image();
cardSheet.src = 'images/cards.png';
//imgBg.addEventListener('load',drawBg,false);

var cardImg = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
cardImg[0] = new Image();
cardImg[1] = new Image();
cardImg[2] = new Image();
cardImg[3] = new Image();
cardImg[4] = new Image();
cardImg[5] = new Image();
cardImg[6] = new Image();
cardImg[7] = new Image();
cardImg[8] = new Image();
cardImg[9] = new Image();

fingerImg = new Image();

//var imgCard = new Image();
//imgCard.src = 'images/card2.png';
//imgCard.addEventListener('load',drawCard,false);

// filepath of cardBack
var cardBack = 'images/cardBack.png';

// sprite sheet test
//19, 2
//var imgCard = new Image();
//imgCard.src = 'images/cards.png';
//imgCard.addEventListener('load',drawCard,false);


imgBg.addEventListener('load',init,false);




// main functions

function init(){
	SoundBg();
	drawBg();
	startDrawing();
	
	cards[0] = new Card();
	cardImg[0].src = cards[0].cardFilepath;
	cards[0].index = 0;
	cards[0].randomize();
	
	cards[1] = new Card();
	cardImg[1].src = cards[1].cardFilepath;
	cards[1].index = 1;
	cards[1].randomize();
	
	cards[2] = new Card();
	cardImg[2].src = cards[2].cardFilepath;
	cards[2].index = 2;
	cards[2].randomize();
	
	cards[3] = new Card();
	cardImg[3].src = cards[3].cardFilepath;
	cards[3].index = 3;
	cards[3].randomize();
	
	cards[4] = new Card();
	cardImg[4].src = cards[4].cardFilepath;
	cards[4].index = 4;
	cards[4].randomize();
	
	cards[5] = new Card();
	cardImg[5].src = cards[5].cardFilepath;
	cards[5].index = 5;
	cards[5].randomize();
	
	cards[6] = new Card();
	cardImg[6].src = cards[6].cardFilepath;
	cards[6].index = 6;
	cards[6].randomize();
	
	cards[7] = new Card();
	cardImg[7].src = cards[7].cardFilepath;
	cards[7].index = 7;
	cards[7].randomize();
	
	cards[8] = new Card();
	cardImg[8].src = cards[8].cardFilepath;
	cards[8].index = 8;
	cards[8].randomize();
	
	cards[9] = new Card();
	cardImg[9].src = cards[9].cardFilepath;
	cards[9].index = 9;
	cards[9].randomize();
	
	finger1 = new Finger();
	fingerImg.src = 'images/finger.png';
	
	// temporary placement for testing, replace with 'initialize hands' function or similar
	
	/*cards[1].drawX = (74 * 2);
	cards[2].drawX = (74 * 4);
	cards[3].drawX = (74 * 6);
	cards[4].drawX = (74 * 8);
	
	cards[5].drawY = 200;
	cards[6].drawY = 200;
	cards[7].drawY = 200;
	cards[8].drawY = 200;
	cards[9].drawY = 200;
	
	cards[6].drawX = (74 * 2);
	cards[7].drawX = (74 * 4);
	cards[8].drawX = (74 * 6);
	cards[9].drawX = (74 * 8);*/
	
	setPlayerHand();
	setEnemyHand();
	
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
}

function draw() {
	for (i = 0; i < cards.length; i++) {
		cards[i].draw();
	}
	finger1.draw();
	checkKeys();
}

function startDrawing() {
	stopDrawing();
	drawInterval = setInterval(draw,fps);
}

function stopDrawing() {
	clearInterval(drawInterval);
}

function drawBg() {
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	ctxBg.drawImage(imgBg,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*widthScale,gameHeight*heightScale);
}

function clearCtxBg() {
	ctxBg.clearRect(0,0,gameWidth,gameHeight);
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

function clearCtxBg(){
		ctxBg.clearRect(0,0,gameWidth,gameHeight);
	}
	
}

function setPlayerHand() {
		// card 4 at bottom of pile, card 0 at top
		// future: cards[0].position = playerHand[0];
		
		cards[0].drawX = col4 * widthScale;
		cards[1].drawX = col4 * widthScale;
		cards[2].drawX = col4 * widthScale;
		cards[3].drawX = col4 * widthScale;
		cards[4].drawX = col4 * widthScale;
		
		cards[0].drawY = row0 * heightScale;
		cards[1].drawY = row1 * heightScale;
		cards[2].drawY = row2 * heightScale;
		cards[3].drawY = row3 * heightScale;
		cards[4].drawY = row4 * heightScale;
}

function setEnemyHand() {
		// card 9 at bottom of pile, card 5 at top
		// future: cards[5].position = enemyHand[0];
		
		cards[5].drawX = col0 * widthScale;
		cards[6].drawX = col0 * widthScale;
		cards[7].drawX = col0 * widthScale;
		cards[8].drawX = col0 * widthScale;
		cards[9].drawX = col0 * widthScale;
		
		cards[5].drawY = row0 * heightScale;
		cards[6].drawY = row1 * heightScale;
		cards[7].drawY = row2 * heightScale;
		cards[8].drawY = row3 * heightScale;
		cards[9].drawY = row4 * heightScale;
}

function setupBoard() {
	
		// board placement test	
		
		cards[0].drawX = col1 * widthScale;
		cards[1].drawX = col2 * widthScale;
		cards[2].drawX = col3 * widthScale;
		cards[3].drawX = col1 * widthScale;
		cards[4].drawX = col2 * widthScale;
		cards[5].drawX = col3 * widthScale;
		cards[6].drawX = col1 * widthScale;
		cards[7].drawX = col2 * widthScale;
		cards[8].drawX = col3 * widthScale;
		
		cards[0].drawY = row0 * heightScale;
		cards[1].drawY = row0 * heightScale;
		cards[2].drawY = row0 * heightScale;
		cards[3].drawY = row2 * heightScale;
		cards[4].drawY = row2 * heightScale;
		cards[5].drawY = row2 * heightScale;
		cards[6].drawY = row4 * heightScale;
		cards[7].drawY = row4 * heightScale;
		cards[8].drawY = row4 * heightScale;
}

function placeOnBoard(card) { //(card, location) {
	var location = card; //just for testing, card 0 on place 0, 1 on 1, etc.
	
	// if card not already placed on board & board location isn't taken
	if (cards[card].onBoard == false) {
		//columns 1, 2, 3
		//rows 0, 2, 4
		//0, 1, 2
		//3, 4, 5
		//6, 7, 8
		
		
		
	}
}

function Finger() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 32;
	this.height = 32;
	this.selected = 0; // card selected
}

Finger.prototype.highlight = function(card) {
	
	var playerCol = gameWidth - (32 * widthScale) - (64 * widthScale) - (24 * widthScale);
	var enemyCol =  (24 - 32) * widthScale;
	
	//only fix previous card's position if not placed on board
	if (cards[this.selected].onBoard == false) {
		if (this.selected == 0 || this.selected == 1 || this.selected == 2
			|| this.selected == 3 || this.selected == 4) {
			cards[this.selected].drawX = ((gameWidth/widthScale) - 64 - 24) * widthScale;
		} else {
			cards[this.selected].drawX = 24 * widthScale;
		}
	}
	
	//only move selected card out if not already on board
	if (cards[card].onBoard == false) {
		if (card == 0 || card == 1 || card == 2 || card == 3 || card == 4) {
			cards[card].drawX = ((gameWidth/widthScale) - 64 - 24 - 8) * widthScale;
		} else {
			cards[card].drawX = (24 * widthScale) -  (8 * widthScale);
		}
		var mysound = new Audio('sounds/CursorMove.mp3');
		mysound.play();
	}
	
	
	this.selected = card;
	
	if (card == 0 || card == 1 || card == 2 || card == 3 || card == 4) {
		this.drawX = playerCol;
	} else {
		this.drawX = enemyCol;
	}
	
	if (card == 0 || card == 5) { this.drawY = (row0 + 16) * heightScale; }
	if (card == 1 || card == 6) { this.drawY = (row1 + 16) * heightScale; }
	if (card == 2 || card == 7) { this.drawY = (row2 + 16) * heightScale; }
	if (card == 3 || card == 8) { this.drawY = (row3 + 16) * heightScale; }
	if (card == 4 || card == 9) { this.drawY = (row4 + 16) * heightScale; }	
}

Finger.prototype.hoverboard = function() {
	// hover finger above board, move with arrow keys, select place for card
	
	//columns 1, 2, 3
	//rows 0, 2, 4
	//0, 1, 2
	//3, 4, 5
	//6, 7, 8
	
	// just places corresponding card onto corresponding board place for now
	
	if (this.selected == 0) {
		cards[0].drawX = col1 * widthScale;
		cards[0].drawY = row0 * heightScale;
		cards[0].onBoard = true;
	}
	if (this.selected == 1) {
		cards[1].drawX = col2 * widthScale;
		cards[1].drawY = row0 * heightScale;
		cards[1].onBoard = true;
	}
	if (this.selected == 2) {
		cards[2].drawX = col3 * widthScale;
		cards[2].drawY = row0 * heightScale;
		cards[2].onBoard = true;
	}
	if (this.selected == 3) {
		cards[3].drawX = col1 * widthScale;
		cards[3].drawY = row2 * heightScale;
		cards[3].onBoard = true;
	}
	if (this.selected == 4) {
		cards[4].drawX = col2 * widthScale;
		cards[4].drawY = row2 * heightScale;
		cards[4].onBoard = true;
	}
	if (this.selected == 5) {
		cards[5].drawX = col3 * widthScale;
		cards[5].drawY = row2 * heightScale;
		cards[5].onBoard = true;
	}
	if (this.selected == 6) {
		cards[6].drawX = col1 * widthScale;
		cards[6].drawY = row4 * heightScale;
		cards[6].onBoard = true;
	}
	if (this.selected == 7) {
		cards[7].drawX = col2 * widthScale;
		cards[7].drawY = row4 * heightScale;
		cards[7].onBoard = true;
	}
	if (this.selected == 8) {
		cards[8].drawX = col3 * widthScale;
		cards[8].drawY = row4 * heightScale;
		cards[8].onBoard = true;
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







// Card functions

function Card() {
	this.srcX = 0;	// column
	this.srcY = 0;	// row
	this.drawX = 0;
	this.drawY = 0;
	this.width = 64;
	this.height = 64;
	this.widthScale = widthScale;
	this.heightScale = heightScale;
	
	
	this.index = 0 //0-4 corresponds with player cards, 5-9 with enemy cards
	this.onBoard = false;
	this.shrink = true;
	this.front = true;
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
	
	this.srcX = 64 * col;
	this.srcY = 64 * row;
	
}

Card.prototype.draw = function () {
	
	// flip functions, test whether front or side flip. just front for now.
	if (this.flip) { this.frontFlip(); }
	
	// clears previous drawing of card in order to redraw card in new spot
	clearCtxCard(this.index);
	
	// Really need to figure out how to make the ctx variables into an array for this to be compact
	if (this.index == 0) {
		ctxCard0.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
		//ctxCard0.drawImage(COLOR BACKGROUND,this.srcX,this.srcY,this.width,this.height,
		//				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 1) {
		ctxCard1.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 2) {
		ctxCard2.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 3) {
		ctxCard3.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 4) {
		ctxCard4.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 5) {
		ctxCard5.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 6) {
		ctxCard6.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 7) {
		ctxCard7.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 8) {
		ctxCard8.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 9) {
		ctxCard9.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	
};

Card.prototype.frontFlip = function () {

	if (this.flip) {
		if (this.heightScale > 0 && this.shrink == true) {
			this.drawY += 4;
			this.heightScale -= 0.125;
		}
		
		if (this.heightScale == 0) {
			this.shrink = !this.shrink;
			this.front = !this.front;
			//switch to cardBack
			if (this.front) {
				cardImg[this.index].src = this.cardFilepath;
			} else {
				cardImg[this.index].src = cardBack;
			}
		}
		
		if (this.shrink == false && this.heightScale < heightScale) {
			this.drawY -= 4;
			this.heightScale += 0.125;
		}
		
		if (this.heightScale == heightScale) {
			// flipping done
			// switch to cardFront
			this.shrink = !this.shrink;
			if (this.front) {
				this.flip = false;
			}
		}
	}
}

function checkKeys() {
	//alert('message in pop up window here!');
	if (is0Key) { finger1.highlight(0); is0Key = false; }
	if (is1Key) { finger1.highlight(1); is1Key = false; }
	if (is2Key) { finger1.highlight(2); is2Key = false; }
	if (is3Key) { finger1.highlight(3); is3Key = false; }
	if (is4Key) { finger1.highlight(4); is4Key = false; }
	if (is5Key) { finger1.highlight(5); is5Key = false; }
	if (is6Key) { finger1.highlight(6); is6Key = false; }
	if (is7Key) { finger1.highlight(7); is7Key = false; }
	if (is8Key) { finger1.highlight(8); is8Key = false; }
	if (is9Key) { finger1.highlight(9); is9Key = false; }
	
	if (isSpacebarKey) {
		if (cards[finger1.selected].onBoard == false) {
			//Select this card and choose place on board
			finger1.hoverboard();
		}
	}
	if (isUpKey) {
		
	} 
	if (isRightKey) {
		
	}
	if (isDownKey) {
		
	}
	if (isLeftKey) {
		
	}
	if (isFKey) {
		cards[finger1.selected].flip = !cards[finger1.selected].flip;
	}
}

function clearCtxCard(index){
	// again, much simpler when/if ctx variables are in an array...
	if (index == 0) {
		ctxCard0.clearRect(0,0,gameWidth,gameHeight);
	}
	
	else if (index == 1) { ctxCard1.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 2) { ctxCard2.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 3) { ctxCard3.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 4) { ctxCard4.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 5) { ctxCard5.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 6) { ctxCard6.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 7) { ctxCard7.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 8) { ctxCard8.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 9) { ctxCard9.clearRect(0,0,gameWidth,gameHeight); }
}

// end of Card functions







// enemy functions

// end of enemy functions







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
	if (keyID === 48) { // 0
		is0Key = true;
		e.preventDefault();
	}
	if (keyID === 49) { // 1
		is1Key = true;
		e.preventDefault();
	}
	if (keyID === 50) { // 2
		is2Key = true;
		e.preventDefault();
	}
	if (keyID === 51) { // 3
		is3Key = true;
		e.preventDefault();
	}
	if (keyID === 52) { // 4
		is4Key = true;
		e.preventDefault();
	}
	if (keyID === 53) { // 5
		is5Key = true;
		e.preventDefault();
	}
	if (keyID === 54) { // 6
		is6Key = true;
		e.preventDefault();
	}
	if (keyID === 55) { // 7
		is7Key = true;
		e.preventDefault();
	}
	if (keyID === 56) { // 8
		is8Key = true;
		e.preventDefault();
	}
	if (keyID === 57) { // 9
		is9Key = true;
		e.preventDefault();
	}
	if (keyID === 32) { // spacebar
		isSpacebarKey = true;
		e.preventDefault();
	}
	if (keyID === 70) { // F
		isFKey = true;
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
	if (keyID === 48) { // 0
		is0Key = false;
		e.preventDefault();
	}
	if (keyID === 49) { // 1
		is1Key = false;
		e.preventDefault();
	}
	if (keyID === 50) { // 2
		is2Key = false;
		e.preventDefault();
	}
	if (keyID === 51) { // 3
		is3Key = false;
		e.preventDefault();
	}
	if (keyID === 52) { // 4
		is4Key = false;
		e.preventDefault();
	}
	if (keyID === 53) { // 5
		is5Key = false;
		e.preventDefault();
	}
	if (keyID === 54) { // 6
		is6Key = false;
		e.preventDefault();
	}
	if (keyID === 55) { // 7
		is7Key = false;
		e.preventDefault();
	}
	if (keyID === 56) { // 8
		is8Key = false;
		e.preventDefault();
	}
	if (keyID === 57) { // 9
		is9Key = false;
		e.preventDefault();
	}
	if (keyID === 32) { // spacebar
		isSpacebarKey = false;
		e.preventDefault();
	}
	if (keyID === 70) { // F
		isFKey = false;
		e.preventDefault();
	}
}

// end of event functions
