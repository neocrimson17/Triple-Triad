var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

// I don't know how to make these variables work in an array.
// Will change them to an array once I figure it out.

var playerCard0 = document.getElementById('playerCard0');
var ctxPlayerCard0 = playerCard0.getContext('2d');

var playerCard1 = document.getElementById('playerCard1');
var ctxPlayerCard1 = playerCard1.getContext('2d');

var playerCard2 = document.getElementById('playerCard2');
var ctxPlayerCard2 = playerCard2.getContext('2d');

var playerCard3 = document.getElementById('playerCard3');
var ctxPlayerCard3 = playerCard3.getContext('2d');

var playerCard4 = document.getElementById('playerCard4');
var ctxPlayerCard4 = playerCard4.getContext('2d');

var enemyCard0 = document.getElementById('enemyCard0');
var ctxEnemyCard0 = enemyCard0.getContext('2d');

var enemyCard1 = document.getElementById('enemyCard1');
var ctxEnemyCard1 = enemyCard1.getContext('2d');

var enemyCard2 = document.getElementById('enemyCard2');
var ctxEnemyCard2 = enemyCard2.getContext('2d');

var enemyCard3 = document.getElementById('enemyCard3');
var ctxEnemyCard3 = enemyCard3.getContext('2d');

var enemyCard4 = document.getElementById('enemyCard4');
var ctxEnemyCard4 = enemyCard4.getContext('2d');

var canvasFinger = document.getElementById('canvasFinger');
var ctxFinger = canvasFinger.getContext('2d');

// Hand arrays
var playerCards = ["0", "1", "2", "3", "4"];
var enemyCards = ["0", "1", "2", "3", "4"];

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


var playerCardImg = ["0", "1", "2", "3", "4"];
playerCardImg[0] = new Image();
playerCardImg[1] = new Image();
playerCardImg[2] = new Image();
playerCardImg[3] = new Image();
playerCardImg[4] = new Image();

var enemyCardImg = ["0", "1", "2", "3", "4"];
enemyCardImg[0] = new Image();
enemyCardImg[1] = new Image();
enemyCardImg[2] = new Image();
enemyCardImg[3] = new Image();
enemyCardImg[4] = new Image();

fingerImg = new Image();

// Load background
imgBg.addEventListener('load',init,false);

// enum for cards to help create a card object
// note: each card has a name and 4 corresponding values(top,bottom, left and right)
// The highest value is represented by a letter A graphically (numerically it's equal to 10)
// example: to use in game code
// var mySize = CardEnum.GEEZARD;
// var myCode = CardEnum.properties[mySize].name; // myCode == "Geezard"
// OR if mycode = Card.properties[mySize].topValue; // myCode == 1
var CardEnum = {
	//level 1 monster cards
	GEEZARD: 1,
	FUNGUAR: 2,
	BITEBUG: 3,
	REDBAT: 4,
	BLOBRA: 5,
	GAYLA: 6,
	GESPER: 7,
	FASTITOCALONF: 8,
	BLOODSOUL: 9,
	CATERCHIPILLAR: 10,
	COCKATRICE: 11,
	//level 2 monster cards
	GRAT: 12,
	BUEL: 13,
	MESMERIZE: 14,
	GLACIALEYE: 15,
	BELHELMEL: 16,
	THRUSTAEVIS: 17,
	ANACONDAUR: 18,
	CREEPS: 19,
	GRENDEL: 20,
	JELLEYE: 21,
	GRANDMANTIS: 22,
	//level 3 monster cards
	FORBIDDEN: 23,
	ARMADODO: 24,
	TriFace: 25,
	FASTITOCALON: 26,
	SNOWLION: 27,
	OCHU: 28,
	SAM08G: 29,
	DEATHCLAW: 30,
	CACTUAR: 31,
	TONBERRY: 32,
	ABYSSWORM: 33,
	//level 4 monster cards
	TURTAPOD: 34,
	VYSAGE: 35,
	TREXAUR: 36,
	BOMB: 37,
	BLITZ: 38,
	WENDIGO: 39,
	TORAMA: 40,
	IMP: 41,
	BLUEDRAGON: 42,
	ADAMANTOISE: 43,
	HEXADRAGON: 44,
	//level 5 monster cards
	IRONGIANT: 45,
	BEHEMOTH: 46,
	CHIMERA: 47,
	PUPU: 48,
	ELASTOID: 49,
	GIM47N: 50,
	MALBORO: 51,
	RUBYDRAGON: 52,
	ELNOYLE: 53,
	TONBERRYKING: 54,
	BIGGSWEDGE: 55,
	//level 6 bosses cards
	FUJINRAIJIN: 56,
	ELVORET: 57,
	XATM092: 58,
	GRANALDO: 59,
	GEROGERO: 60,
	IGUION: 61,
	ABADON: 62,
	TRAUMA: 63,
	OILBOYLE: 64,
	SHUMITRIBE: 65,
	KRYSTA: 66,
	//level 7 bosses cards
	PROPAGATOR: 67,
	JUMBOCACTUAR: 68,
	TRIPOINT: 69,
	GARGANTUA: 70,
	MOBILETYPE8: 71,
	SPHINXARA: 72,
	TIAMAT: 73,
	BGH251F2: 74,
	REDGIANT: 75,
	CATOBLEPAS: 76,
	ULTIMAWEAPON: 77,
	//level 8 guardian force cards
	CHUBBYCHOCOBO: 78,
	ANGELO: 79,
	GILGAMESH: 80,
	MINIMOG: 81,
	CHOCOBO: 82,
	QUEZACOTL: 83,
	SHIVA: 84,
	IFRIT: 85,
	SIREN: 86,
	SACRED: 87,
	MINOTAUR: 88,
	//level 9 guardian force cards
	CARBUNCLE: 89,
	DIABLOS: 90,
	LEVIATHAN: 91,
	ODIN: 92,
	PANDEMONA: 93,
	CERBERUS: 94,
	ALEXANDER: 95,
	PHOENIX: 96,
	BAHAMUT: 97,
	DOOMTRAIN: 98,
	EDEN: 99,
	//level 10 character cards
	WARD: 100,
	KIROS: 101,
	LAGUNA: 102,
	SELPHIE: 103,
	QUISTIS: 104,
	IRVINE: 105,
	ZELL: 106,
	RINOA: 107,
	EDEA: 108,
	SEIFER: 109,
	SQUALL: 110,
	
	properties: {
		// level 1 monsters 
		1:{name: "Geezard", topValue: 1, bottomValue: 1, leftValue: 5, rightValue: 4},
		2:{name: "Funguar", topValue: 5, bottomValue: 1, leftValue: 3, rightValue: 1},
		3:{name: "Bite Bug", topValue: 1, bottomValue: 3, leftValue: 5, rightValue: 3},
		4:{name: "Red Bat", topValue: 6, bottomValue: 1, leftValue: 2, rightValue: 1},
		5:{name: "Blobra", topValue: 2, bottomValue: 1, leftValue: 5, rightValue: 3},
		6:{name: "Gayla", topValue: 2, bottomValue: 4, leftValue: 4, rightValue: 1},
		7:{name: "Gesper", topValue: 1, bottomValue: 4, leftValue: 1, rightValue: 5},
		8:{name: "Fastitocalon-F", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 5},
		9:{name: "Blood Soul", topValue: 2, bottomValue: 6, leftValue: 1, rightValue: 1},
		10:{name: "Caterchipillar", topValue: 4, bottomValue: 4, leftValue: 3, rightValue: 2},
		11:{name: "Cockatrice", topValue: 2, bottomValue: 2, leftValue: 6, rightValue: 1},
		// level 2 monsters 
		12:{name: "Grat", topValue: 7, bottomValue: 3, leftValue: 1, rightValue: 1},
		13:{name: "Buel", topValue: 6, bottomValue: 2, leftValue: 3, rightValue: 2},
		14:{name: "Mesmerize", topValue: 5, bottomValue: 3, leftValue: 4, rightValue: 3},
		15:{name: "Glacial Eye", topValue: 6, bottomValue: 4, leftValue: 3, rightValue: 1},
		16:{name: "Belhelmel", topValue: 3, bottomValue: 5, leftValue: 3, rightValue: 4},
		17:{name: "Thrustaevis", topValue: 5, bottomValue: 2, leftValue: 5, rightValue: 3},
		18:{name: "Anacondaur", topValue: 5, bottomValue: 3, leftValue: 5, rightValue: 1},
		19:{name: "Creeps", topValue: 5, bottomValue: 5, leftValue: 2, rightValue: 2},
		20:{name: "Grendel", topValue: 4, bottomValue: 5, leftValue: 2, rightValue: 4},
		21:{name: "Jelleye", topValue: 3, bottomValue: 1, leftValue: 7, rightValue: 2},
		22:{name: "Grand Mantis", topValue: 5, bottomValue: 5, leftValue: 3, rightValue: 2},
		// level 3 monsters 
		23:{name: "Forbidden", topValue: 6, bottomValue: 3, leftValue: 2, rightValue: 6},
		24:{name: "Armadodo", topValue: 6, bottomValue: 1, leftValue: 6, rightValue: 3},
		25:{name: "Tri-Face", topValue: 3, bottomValue: 5, leftValue: 5, rightValue: 5},
		26:{name: "Fastitocalon", topValue: 7, bottomValue: 1, leftValue: 3, rightValue: 5},
		27:{name: "Snow Lion", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 1},
		28:{name: "Ochu", topValue: 5, bottomValue: 3, leftValue: 3, rightValue: 6},
		29:{name: "SAM08G", topValue: 5, bottomValue: 2, leftValue: 4, rightValue: 6},
		30:{name: "Death Claw", topValue: 4, bottomValue: 7, leftValue: 2, rightValue: 4},
		31:{name: "Cactuar", topValue: 6, bottomValue: 6, leftValue: 3, rightValue: 2},
		32:{name: "Tonberry", topValue: 3, bottomValue: 4, leftValue: 4, rightValue: 6},
		33:{name: "Abyss Worm", topValue: 7, bottomValue: 3, leftValue: 5, rightValue: 2},
		// level 4 monsters 
		34:{name: "Turtapod", topValue: 2, bottomValue: 6, leftValue: 7, rightValue: 3},
		35:{name: "Vysage", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 5},
		36:{name: "T-Rexaur", topValue: 4, bottomValue: 2, leftValue: 7, rightValue: 6},
		37:{name: "Bomb", topValue: 2, bottomValue: 6, leftValue: 3, rightValue: 7},
		38:{name: "Blitz", topValue: 1, bottomValue: 4, leftValue: 7, rightValue: 6},
		39:{name: "Wendigo", topValue: 7, bottomValue: 1, leftValue: 6, rightValue: 3},
		40:{name: "Torama", topValue: 7, bottomValue: 4, leftValue: 4, rightValue: 4},
		41:{name: "Imp", topValue: 3, bottomValue: 3, leftValue: 6, rightValue: 7},
		42:{name: "Blue Dragon", topValue: 6, bottomValue: 7, leftValue: 3, rightValue: 2},
		43:{name: "Adamantoise", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 5},
		44:{name: "Hexadragon", topValue: 7, bottomValue: 4, leftValue: 3, rightValue: 5},
		// level 5 monsters 
		45:{name: "Iron Giant", topValue: 6, bottomValue: 6, leftValue: 5, rightValue: 5},
		46:{name: "Behemoth", topValue: 3, bottomValue: 5, leftValue: 7, rightValue: 6},
		47:{name: "Chimera", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 6},
		48:{name: "PuPu", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 10},
		49:{name: "Elastoid", topValue: 6, bottomValue: 6, leftValue: 7, rightValue: 2},
		50:{name: "GIM47N", topValue: 5, bottomValue: 7, leftValue: 4, rightValue: 5},
		51:{name: "Malboro", topValue: 7, bottomValue: 4, leftValue: 2, rightValue: 7},
		52:{name: "Ruby Dragon", topValue: 7, bottomValue: 7, leftValue: 4, rightValue: 2},
		53:{name: "Elnoyle", topValue: 5, bottomValue: 7, leftValue: 6, rightValue: 3},
		54:{name: "Tonberry King", topValue: 4, bottomValue: 7, leftValue: 4, rightValue: 6},
		55:{name: "Biggs, Wedge", topValue: 6, bottomValue: 2, leftValue: 7, rightValue: 6},
		// level 6 bosses 
		56:{name: "Fujin, Raijin", topValue: 2, bottomValue: 8, leftValue: 4, rightValue: 8},
		57:{name: "Elvoret", topValue: 7, bottomValue: 3, leftValue: 4, rightValue: 8},
		58:{name: "X-ATM092", topValue: 4, bottomValue: 7, leftValue: 3, rightValue: 8},
		59:{name: "Granaldo", topValue: 7, bottomValue: 8, leftValue: 5, rightValue: 2},
		60:{name: "Gerogero", topValue: 1, bottomValue: 8, leftValue: 3, rightValue: 8},
		61:{name: "Iguion", topValue: 8, bottomValue: 8, leftValue: 2, rightValue: 2},
		62:{name: "Abadon", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 8},
		63:{name: "Trauma", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 8},
		64:{name: "Oilboyle", topValue: 1, bottomValue: 4, leftValue: 8, rightValue: 8},
		65:{name: "Shumi Tribe", topValue: 6, bottomValue: 8, leftValue: 4, rightValue: 5},
		66:{name: "Krysta", topValue: 7, bottomValue: 8, leftValue: 1, rightValue: 5},
		// level 7 bosses 
		67:{name: "Propagator", topValue: 8, bottomValue: 4, leftValue: 8, rightValue: 4},
		68:{name: "Jumbo Cactuar", topValue: 8, bottomValue: 4, leftValue: 4, rightValue: 8},
		69:{name: "Tri-Point", topValue: 8, bottomValue: 2, leftValue: 8, rightValue: 5},
		70:{name: "Gargantua", topValue: 5, bottomValue: 6, leftValue: 8, rightValue: 6},
		71:{name: "Mobile Type 8", topValue: 8, bottomValue: 7, leftValue: 3, rightValue: 6},
		72:{name: "Sphinxara", topValue: 8, bottomValue: 5, leftValue: 8, rightValue: 3},
		73:{name: "Tiamat", topValue: 8, bottomValue: 5, leftValue: 4, rightValue: 8},
		74:{name: "BGH251F2", topValue: 5, bottomValue: 8, leftValue: 5, rightValue: 7},
		75:{name: "Red Giant", topValue: 6, bottomValue: 4, leftValue: 7, rightValue: 8},
		76:{name: "Catoblepas", topValue: 1, bottomValue: 7, leftValue: 7, rightValue: 8},
		77:{name: "Ultima Weapon", topValue: 7, bottomValue: 2, leftValue: 8, rightValue: 7},
		// level 8 guardian forces
		78:{name: "Chubby Chocobo", topValue: 4, bottomValue: 8, leftValue: 9, rightValue: 4},
		79:{name: "Angelo", topValue: 9, bottomValue: 7, leftValue: 3, rightValue: 6},
		80:{name: "Gilgamesh", topValue: 3, bottomValue: 9, leftValue: 6, rightValue: 7},
		80:{name: "MiniMog", topValue: 9, bottomValue: 9, leftValue: 2, rightValue: 3},
		81:{name: "Chocobo", topValue: 9, bottomValue: 8, leftValue: 4, rightValue: 4},
		82:{name: "Quezacotl", topValue: 2, bottomValue: 9, leftValue: 4, rightValue: 9},
		83:{name: "Shiva", topValue: 6, bottomValue: 4, leftValue: 9, rightValue: 7},
		84:{name: "Ifrit", topValue: 9, bottomValue: 2, leftValue: 8, rightValue: 6},
		85:{name: "Siren", topValue: 8, bottomValue: 6, leftValue: 2, rightValue: 9},
		86:{name: "Sacred", topValue: 5, bottomValue: 9, leftValue: 9, rightValue: 1},
		87:{name: "Minotaur", topValue: 9, bottomValue: 2, leftValue: 9, rightValue: 5},
		// level 9 guardian forces 
		88:{name: "Carbuncle", topValue: 8, bottomValue: 10, leftValue: 4, rightValue: 4},
		89:{name: "Diablos", topValue: 5, bottomValue: 8, leftValue: 3, rightValue: 10},
		90:{name: "Leviathan", topValue: 7, bottomValue: 1, leftValue: 7, rightValue: 10},
		91:{name: "Odin", topValue: 8, bottomValue: 3, leftValue: 5, rightValue: 10},
		92:{name: "Pandemona", topValue: 10, bottomValue: 7, leftValue: 7, rightValue: 1},
		93:{name: "Cerberus", topValue: 7, bottomValue: 6, leftValue: 10, rightValue: 4},
		94:{name: "Alexander", topValue: 9, bottomValue: 4, leftValue: 2, rightValue: 10},
		95:{name: "Phoenix", topValue: 7, bottomValue: 7, leftValue: 10, rightValue: 2},
		96:{name: "Bahamut", topValue: 10, bottomValue: 2, leftValue: 6, rightValue: 8},
		97:{name: "Doomtrain", topValue: 3, bottomValue: 10, leftValue: 10, rightValue: 1},
		98:{name: "Eden", topValue: 4, bottomValue: 9, leftValue: 10, rightValue: 4},
		// level 10 characters
		99:{name: "Ward", topValue: 10, bottomValue: 2, leftValue: 8, rightValue: 7},
		100:{name: "Kiros", topValue: 6, bottomValue: 6, leftValue: 10, rightValue: 7},
		101:{name: "Laguna", topValue: 5, bottomValue: 3, leftValue: 9, rightValue: 10},
		102:{name: "Selphie", topValue: 10, bottomValue: 6, leftValue: 4, rightValue: 8},
		103:{name: "Quistis", topValue: 9, bottomValue: 10, leftValue: 2, rightValue: 6},
		104:{name: "Irvine", topValue: 2, bottomValue: 9, leftValue: 10, rightValue: 6},
		105:{name: "Zell", topValue: 8, bottomValue: 10, leftValue: 6, rightValue: 5},
		106:{name: "Rinoa", topValue: 4, bottomValue: 2, leftValue: 10, rightValue: 10},
		107:{name: "Edea", topValue: 10, bottomValue: 3, leftValue: 3, rightValue: 10},
		108:{name: "Seifer", topValue: 6, bottomValue: 10, leftValue: 4, rightValue: 9},
		109:{name: "Squall", topValue: 10, bottomValue: 6, leftValue: 9, rightValue: 4}
		
	}
	
};

// main functions

function init(){

	soundBg();
	drawBg();
	startDrawing();
	
	playerCards[0] = new Card();
	playerCards[0].index = 0;
	playerCards[0].randomize();
	
	playerCards[1] = new Card();
	playerCards[1].index = 1;
	playerCards[1].randomize();
	
	playerCards[2] = new Card();
	playerCards[2].index = 2;
	playerCards[2].randomize();
	
	playerCards[3] = new Card();
	playerCards[3].index = 3;
	playerCards[3].randomize();
	
	playerCards[4] = new Card();
	playerCards[4].index = 4;
	playerCards[4].randomize();
	
	enemyCards[0] = new Card();
	enemyCards[0].index = 5;
	enemyCards[0].randomize();
	
	enemyCards[1] = new Card();
	enemyCards[1].index = 6;
	enemyCards[1].randomize();
	
	enemyCards[2] = new Card();
	enemyCards[2].index = 7;
	enemyCards[2].randomize();
	
	enemyCards[3] = new Card();
	enemyCards[3].index = 8;
	enemyCards[3].randomize();
	
	enemyCards[4] = new Card();
	enemyCards[4].index = 9;
	enemyCards[4].randomize();
	
	finger1 = new Finger();
	fingerImg.src = 'images/finger.png';
	
	setPlayerHand();
	setEnemyHand();
	
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
}



function draw() {
	for (i = 0; i < playerCards.length; i++) {
		playerCards[i].draw();
	}
	for (i = 0; i < enemyCards.length; i++) {
		enemyCards[i].draw();
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

// play main theme song in a loop
// note this is for looping, but for simple sounds like cursor movement
// we can simply use this "CursorMove.play();"
// of course you have to declare var and point it to the correct file to play
function soundBg(){
	if (typeof MainTheme.loop == 'boolean')
	{
		MainTheme.loop = true;
	}
	else
	{
		// play main theme song in case loop is not supported
		MainTheme.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		
	}
	MainTheme.play();
}

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
	this.origX = 0;
	this.origY = 0;
	this.backX = 64 * 26;
	this.backY = 64 * 3;
	
	// blue background = player
	// pink background = enemy
	
	
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
	
}

Card.prototype.draw = function () {
	
	// flip functions, test whether front or side flip. just front for now.
	if (this.flip) { this.frontFlip(); }
	
	// clears previous drawing of card in order to redraw card in new spot
	clearCtxCard(this.index);
	
	// Really need to figure out how to make the ctx variables into an array for this to be compact
	if (this.index == 0) {
		ctxPlayerCard0.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
		//ctxCard0.drawImage(COLOR BACKGROUND,this.srcX,this.srcY,this.width,this.height,
		//				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 1) {
		ctxPlayerCard1.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 2) {
		ctxPlayerCard2.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 3) {
		ctxPlayerCard3.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 4) {
		ctxPlayerCard4.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 5) {
		ctxEnemyCard0.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 6) {
		ctxEnemyCard1.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 7) {
		ctxEnemyCard2.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 8) {
		ctxEnemyCard3.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	else if (this.index == 9) {
		ctxEnemyCard4.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
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
				// original card coord
				this.srcX = this.origX;
				this.srcY = this.origY;
			} else {
				// back card coord
				this.srcX = this.backX;
				this.srcY = this.backY;
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
	if (is0Key) { finger1.player = true; finger1.highlight(0); is0Key = false; }
	if (is1Key) { finger1.player = true; finger1.highlight(1); is1Key = false; }
	if (is2Key) { finger1.player = true; finger1.highlight(2); is2Key = false; }
	if (is3Key) { finger1.player = true; finger1.highlight(3); is3Key = false; }
	if (is4Key) { finger1.player = true; finger1.highlight(4); is4Key = false; }
	if (is5Key) { finger1.player = false; finger1.highlight(0); is5Key = false;}
	if (is6Key) { finger1.player = false; finger1.highlight(1); is6Key = false;}
	if (is7Key) { finger1.player = false; finger1.highlight(2); is7Key = false;}
	if (is8Key) { finger1.player = false; finger1.highlight(3); is8Key = false;}
	if (is9Key) { finger1.player = false; finger1.highlight(4); is9Key = false;}
	
	if (isSpacebarKey) {
		if (finger1.player == true) {
			if (playerCards[finger1.selected].onBoard == false) {
				//Select this card and choose place on board
				finger1.hoverboard();
			}
		} else {
			if (enemyCards[finger1.selected].onBoard == false) {
				//Select this card and choose place on board
				finger1.hoverboard();
			}
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
		if (finger1.player == true) {
			playerCards[finger1.selected].flip = !playerCards[finger1.selected].flip;
		} else {
			enemyCards[finger1.selected].flip = !enemyCards[finger1.selected].flip;
		}
		
	}
}

function clearCtxCard(index){
	// again, much simpler when/if ctx variables are in an array...
	if (index == 0) {
		ctxPlayerCard0.clearRect(0,0,gameWidth,gameHeight);
	}
	
	else if (index == 1) { ctxPlayerCard1.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 2) { ctxPlayerCard2.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 3) { ctxPlayerCard3.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 4) { ctxPlayerCard4.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 5) { ctxEnemyCard0.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 6) { ctxEnemyCard1.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 7) { ctxEnemyCard2.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 8) { ctxEnemyCard3.clearRect(0,0,gameWidth,gameHeight); }
	else if (index == 9) { ctxEnemyCard4.clearRect(0,0,gameWidth,gameHeight); }
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