// Canvas Variables
var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

// Decks
//var playerDeck = [];
//var enemyDeck = [];
var CardArray = [];

// Hand arrays
var playerCards = [];
var enemyCards = [];

// Game Settings variables
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var spf = 5;	// seconds per frame
var updateInterval;

// a Card object has an individual widthScale and heightScale used for animation.
// These two variables are global scaling variables, used as the
// original scales for all images at initialization
var widthScale = 2;
var heightScale = 2.5;

// future: double array for board cards, stores either card or enemyCard index
// future: array to store pixel locations of placements (player/enemy hand, board)
var row0 = heightScale * 16; // row 1 in hand, row 1 on board
var row1 = heightScale * 48; // row 2 in hand
var row2 = heightScale * 80; // row 3 in hand, row 2 on board
var row3 = heightScale * 112;// row 4 in hand
var row4 = heightScale * 144;// row 5 in hand, row 3 on board

var col0 = widthScale * 24;	
var col1 = widthScale * 96;
var col2 = widthScale * 160;
var col3 = widthScale * 224;
var col4 = widthScale * 296;

var boardCards = [
[0,0],[0,1],[0,2],
[1,0],[1,1],[1,2],
[2,0],[2,1],[2,2],
];

var lastKey = null;
var isSpacebarKey = false;
var isUpKey = false;
var isRightKey = false;
var isDownKey = false;
var isLeftKey = false;

var playerScore = 5;
var enemyScore = 5;
var turn = 1;
var playerTurn = false;
var enemyTurn = false;
var isGameOver = false;
var animating = false;
var needCheck = false;

// sounds
var MainTheme = new Audio('sounds/ShuffleBoogie.mp3');
var CursorMove = new Audio('sounds/CursorMove.mp3');

var imgBg = new Image();
imgBg.src = 'images/board.png';

var cardSheet = new Image();
cardSheet.src = 'images/cards.png';

var imgSelector = new Image();
imgSelector.src = 'images/finger.png';

var imgFont = new Image();
imgFont.src = 'images/fonts.png';

var imgEnemyBack = new Image();
imgEnemyBack.src = 'images/enemyBack.png';

var imgPlayerBack = new Image();
imgPlayerBack.src = 'images/playerBack.png';

var imgSelection = new Image();
imgSelection.src = 'images/selection.png';

var imgGameOver = new Image();
imgGameOver.src = 'images/gameOverStates.png';

var imgBoxInfo = new Image();
imgBoxInfo.src = 'images/boxInfo.png';

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
	TRIFACE: 25,
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
		1:{name: "Geezard", topValue: 1, bottomValue: 1, leftValue: 5, rightValue: 4, numCopy: 1},
		2:{name: "Funguar", topValue: 5, bottomValue: 1, leftValue: 3, rightValue: 1, numCopy: 1},
		3:{name: "Bite Bug", topValue: 1, bottomValue: 3, leftValue: 5, rightValue: 3, numCopy: 1},
		4:{name: "Red Bat", topValue: 6, bottomValue: 1, leftValue: 2, rightValue: 1, numCopy: 1},
		5:{name: "Blobra", topValue: 2, bottomValue: 1, leftValue: 5, rightValue: 3, numCopy: 1},
		6:{name: "Gayla", topValue: 2, bottomValue: 4, leftValue: 4, rightValue: 1, numCopy: 1},
		7:{name: "Gesper", topValue: 1, bottomValue: 4, leftValue: 1, rightValue: 5, numCopy: 1},
		8:{name: "Fastitocalon-F", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 5, numCopy: 1},
		9:{name: "Blood Soul", topValue: 2, bottomValue: 6, leftValue: 1, rightValue: 1, numCopy: 1},
		10:{name: "Caterchipillar", topValue: 4, bottomValue: 4, leftValue: 3, rightValue: 2, numCopy: 1},
		11:{name: "Cockatrice", topValue: 2, bottomValue: 2, leftValue: 6, rightValue: 1, numCopy: 1},
		// level 2 monsters 
		12:{name: "Grat", topValue: 7, bottomValue: 3, leftValue: 1, rightValue: 1, numCopy: 1},
		13:{name: "Buel", topValue: 6, bottomValue: 2, leftValue: 3, rightValue: 2, numCopy: 1},
		14:{name: "Mesmerize", topValue: 5, bottomValue: 3, leftValue: 4, rightValue: 3, numCopy: 1},
		15:{name: "Glacial Eye", topValue: 6, bottomValue: 4, leftValue: 3, rightValue: 1, numCopy: 1},
		16:{name: "Belhelmel", topValue: 3, bottomValue: 5, leftValue: 3, rightValue: 4, numCopy: 1},
		17:{name: "Thrustaevis", topValue: 5, bottomValue: 2, leftValue: 5, rightValue: 3, numCopy: 1},
		18:{name: "Anacondaur", topValue: 5, bottomValue: 3, leftValue: 5, rightValue: 1, numCopy: 1},
		19:{name: "Creeps", topValue: 5, bottomValue: 5, leftValue: 2, rightValue: 2, numCopy: 1},
		20:{name: "Grendel", topValue: 4, bottomValue: 5, leftValue: 2, rightValue: 4, numCopy: 1},
		21:{name: "Jelleye", topValue: 3, bottomValue: 1, leftValue: 7, rightValue: 2, numCopy: 1},
		22:{name: "Grand Mantis", topValue: 5, bottomValue: 5, leftValue: 3, rightValue: 2, numCopy: 1},
		// level 3 monsters 
		23:{name: "Forbidden", topValue: 6, bottomValue: 3, leftValue: 2, rightValue: 6, numCopy: 1},
		24:{name: "Armadodo", topValue: 6, bottomValue: 1, leftValue: 6, rightValue: 3, numCopy: 1},
		25:{name: "Tri-Face", topValue: 3, bottomValue: 5, leftValue: 5, rightValue: 5, numCopy: 1},
		26:{name: "Fastitocalon", topValue: 7, bottomValue: 1, leftValue: 3, rightValue: 5, numCopy: 1},
		27:{name: "Snow Lion", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 1, numCopy: 1},
		28:{name: "Ochu", topValue: 5, bottomValue: 3, leftValue: 3, rightValue: 6, numCopy: 1},
		29:{name: "SAM08G", topValue: 5, bottomValue: 2, leftValue: 4, rightValue: 6, numCopy: 1},
		30:{name: "Death Claw", topValue: 4, bottomValue: 7, leftValue: 2, rightValue: 4, numCopy: 1},
		31:{name: "Cactuar", topValue: 6, bottomValue: 6, leftValue: 3, rightValue: 2, numCopy: 1},
		32:{name: "Tonberry", topValue: 3, bottomValue: 4, leftValue: 4, rightValue: 6, numCopy: 1},
		33:{name: "Abyss Worm", topValue: 7, bottomValue: 3, leftValue: 5, rightValue: 2, numCopy: 1},
		// level 4 monsters 
		34:{name: "Turtapod", topValue: 2, bottomValue: 6, leftValue: 7, rightValue: 3, numCopy: 1},
		35:{name: "Vysage", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 5, numCopy: 1},
		36:{name: "T-Rexaur", topValue: 4, bottomValue: 2, leftValue: 7, rightValue: 6, numCopy: 1},
		37:{name: "Bomb", topValue: 2, bottomValue: 6, leftValue: 3, rightValue: 7, numCopy: 1},
		38:{name: "Blitz", topValue: 1, bottomValue: 4, leftValue: 7, rightValue: 6, numCopy: 1},
		39:{name: "Wendigo", topValue: 7, bottomValue: 1, leftValue: 6, rightValue: 3, numCopy: 1},
		40:{name: "Torama", topValue: 7, bottomValue: 4, leftValue: 4, rightValue: 4, numCopy: 1},
		41:{name: "Imp", topValue: 3, bottomValue: 3, leftValue: 6, rightValue: 7, numCopy: 1},
		42:{name: "Blue Dragon", topValue: 6, bottomValue: 7, leftValue: 3, rightValue: 2, numCopy: 1},
		43:{name: "Adamantoise", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 5, numCopy: 1},
		44:{name: "Hexadragon", topValue: 7, bottomValue: 4, leftValue: 3, rightValue: 5, numCopy: 1},
		// level 5 monsters 
		45:{name: "Iron Giant", topValue: 6, bottomValue: 6, leftValue: 5, rightValue: 5, numCopy: 1},
		46:{name: "Behemoth", topValue: 3, bottomValue: 5, leftValue: 7, rightValue: 6, numCopy: 1},
		47:{name: "Chimera", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 6, numCopy: 1},
		48:{name: "PuPu", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 10, numCopy: 1},
		49:{name: "Elastoid", topValue: 6, bottomValue: 6, leftValue: 7, rightValue: 2, numCopy: 1},
		50:{name: "GIM47N", topValue: 5, bottomValue: 7, leftValue: 4, rightValue: 5, numCopy: 1},
		51:{name: "Malboro", topValue: 7, bottomValue: 4, leftValue: 2, rightValue: 7, numCopy: 1},
		52:{name: "Ruby Dragon", topValue: 7, bottomValue: 7, leftValue: 4, rightValue: 2, numCopy: 1},
		53:{name: "Elnoyle", topValue: 5, bottomValue: 7, leftValue: 6, rightValue: 3, numCopy: 1},
		54:{name: "Tonberry King", topValue: 4, bottomValue: 7, leftValue: 4, rightValue: 6, numCopy: 1},
		55:{name: "Biggs, Wedge", topValue: 6, bottomValue: 2, leftValue: 7, rightValue: 6, numCopy: 1},
		// level 6 bosses 
		56:{name: "Fujin, Raijin", topValue: 2, bottomValue: 8, leftValue: 4, rightValue: 8, numCopy: 1},
		57:{name: "Elvoret", topValue: 7, bottomValue: 3, leftValue: 4, rightValue: 8, numCopy: 1},
		58:{name: "X-ATM092", topValue: 4, bottomValue: 7, leftValue: 3, rightValue: 8, numCopy: 1},
		59:{name: "Granaldo", topValue: 7, bottomValue: 8, leftValue: 5, rightValue: 2, numCopy: 1},
		60:{name: "Gerogero", topValue: 1, bottomValue: 8, leftValue: 3, rightValue: 8, numCopy: 1},
		61:{name: "Iguion", topValue: 8, bottomValue: 8, leftValue: 2, rightValue: 2, numCopy: 1},
		62:{name: "Abadon", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 8, numCopy: 1},
		63:{name: "Trauma", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 8, numCopy: 1},
		64:{name: "Oilboyle", topValue: 1, bottomValue: 4, leftValue: 8, rightValue: 8, numCopy: 1},
		65:{name: "Shumi Tribe", topValue: 6, bottomValue: 8, leftValue: 4, rightValue: 5, numCopy: 1},
		66:{name: "Krysta", topValue: 7, bottomValue: 8, leftValue: 1, rightValue: 5, numCopy: 1},
		// level 7 bosses 
		67:{name: "Propagator", topValue: 8, bottomValue: 4, leftValue: 8, rightValue: 4, numCopy: 1},
		68:{name: "Jumbo Cactuar", topValue: 8, bottomValue: 4, leftValue: 4, rightValue: 8, numCopy: 1},
		69:{name: "Tri-Point", topValue: 8, bottomValue: 2, leftValue: 8, rightValue: 5, numCopy: 1},
		70:{name: "Gargantua", topValue: 5, bottomValue: 6, leftValue: 8, rightValue: 6, numCopy: 1},
		71:{name: "Mobile Type 8", topValue: 8, bottomValue: 7, leftValue: 3, rightValue: 6, numCopy: 1},
		72:{name: "Sphinxara", topValue: 8, bottomValue: 5, leftValue: 8, rightValue: 3, numCopy: 1},
		73:{name: "Tiamat", topValue: 8, bottomValue: 5, leftValue: 4, rightValue: 8, numCopy: 1},
		74:{name: "BGH251F2", topValue: 5, bottomValue: 8, leftValue: 5, rightValue: 7, numCopy: 1},
		75:{name: "Red Giant", topValue: 6, bottomValue: 4, leftValue: 7, rightValue: 8, numCopy: 1},
		76:{name: "Catoblepas", topValue: 1, bottomValue: 7, leftValue: 7, rightValue: 8, numCopy: 1},
		77:{name: "Ultima Weapon", topValue: 7, bottomValue: 2, leftValue: 8, rightValue: 7, numCopy: 1},
		// level 8 guardian forces
		78:{name: "Chubby Chocobo", topValue: 4, bottomValue: 8, leftValue: 9, rightValue: 4, numCopy: 1},
		79:{name: "Angelo", topValue: 9, bottomValue: 7, leftValue: 3, rightValue: 6, numCopy: 1},
		80:{name: "Gilgamesh", topValue: 3, bottomValue: 9, leftValue: 6, rightValue: 7, numCopy: 1},
		81:{name: "MiniMog", topValue: 9, bottomValue: 9, leftValue: 2, rightValue: 3, numCopy: 1},
		82:{name: "Chocobo", topValue: 9, bottomValue: 8, leftValue: 4, rightValue: 4, numCopy: 1},
		83:{name: "Quezacotl", topValue: 2, bottomValue: 9, leftValue: 4, rightValue: 9, numCopy: 1},
		84:{name: "Shiva", topValue: 6, bottomValue: 4, leftValue: 9, rightValue: 7, numCopy: 1},
		85:{name: "Ifrit", topValue: 9, bottomValue: 2, leftValue: 8, rightValue: 6, numCopy: 1},
		86:{name: "Siren", topValue: 8, bottomValue: 6, leftValue: 2, rightValue: 9, numCopy: 1},
		87:{name: "Sacred", topValue: 5, bottomValue: 9, leftValue: 9, rightValue: 1, numCopy: 1},
		88:{name: "Minotaur", topValue: 9, bottomValue: 2, leftValue: 9, rightValue: 5, numCopy: 1},
		// level 9 guardian forces 
		89:{name: "Carbuncle", topValue: 8, bottomValue: 10, leftValue: 4, rightValue: 4, numCopy: 1},
		90:{name: "Diablos", topValue: 5, bottomValue: 8, leftValue: 3, rightValue: 10, numCopy: 1},
		91:{name: "Leviathan", topValue: 7, bottomValue: 1, leftValue: 7, rightValue: 10, numCopy: 1},
		92:{name: "Odin", topValue: 8, bottomValue: 3, leftValue: 5, rightValue: 10, numCopy: 1},
		93:{name: "Pandemona", topValue: 10, bottomValue: 7, leftValue: 7, rightValue: 1, numCopy: 1},
		94:{name: "Cerberus", topValue: 7, bottomValue: 6, leftValue: 10, rightValue: 4, numCopy: 1},
		95:{name: "Alexander", topValue: 9, bottomValue: 4, leftValue: 2, rightValue: 10, numCopy: 1},
		96:{name: "Phoenix", topValue: 7, bottomValue: 7, leftValue: 10, rightValue: 2, numCopy: 1},
		97:{name: "Bahamut", topValue: 10, bottomValue: 2, leftValue: 6, rightValue: 8, numCopy: 1},
		98:{name: "Doomtrain", topValue: 3, bottomValue: 10, leftValue: 10, rightValue: 1, numCopy: 1},
		99:{name: "Eden", topValue: 4, bottomValue: 9, leftValue: 10, rightValue: 4, numCopy: 1},
		// level 10 characters
		100:{name: "Ward", topValue: 10, bottomValue: 2, leftValue: 8, rightValue: 7, numCopy: 1},
		101:{name: "Kiros", topValue: 6, bottomValue: 6, leftValue: 10, rightValue: 7, numCopy: 1},
		102:{name: "Laguna", topValue: 5, bottomValue: 3, leftValue: 9, rightValue: 10, numCopy: 1},
		103:{name: "Selphie", topValue: 10, bottomValue: 6, leftValue: 4, rightValue: 8, numCopy: 1},
		104:{name: "Quistis", topValue: 9, bottomValue: 10, leftValue: 2, rightValue: 6, numCopy: 1},
		105:{name: "Irvine", topValue: 2, bottomValue: 9, leftValue: 10, rightValue: 6, numCopy: 1},
		106:{name: "Zell", topValue: 8, bottomValue: 10, leftValue: 6, rightValue: 5, numCopy: 1},
		107:{name: "Rinoa", topValue: 4, bottomValue: 2, leftValue: 10, rightValue: 10, numCopy: 1},
		108:{name: "Edea", topValue: 10, bottomValue: 3, leftValue: 3, rightValue: 10, numCopy: 1},
		109:{name: "Seifer", topValue: 6, bottomValue: 10, leftValue: 4, rightValue: 9, numCopy: 1},
		110:{name: "Squall", topValue: 10, bottomValue: 6, leftValue: 9, rightValue: 4, numCopy: 1}
		
	}
	
};





// initialization functions

function init() {
	// Start playing background music
	soundBg();
	
	// Draw background
	drawBg();
	
	// Rules selection (later)
	

	// Initialize deck object (CardArray global variable)
	TTDeck();
	
	// Take cards from deck CardArray and put into hands
	setPlayerHand();
	setEnemyHand();
	
	// Animate cards flowing into hands (later)
	
	// Initialize board drawing coordinates
	drawingCoordinates();
	
	// Initialize Selector (finger)
	selector1 = new Selector();
	selector1.selected = playerCards[0];
	
	// Draw things on canvas
	startUpdating();
	
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
	
	// Determine if player or enemy goes first
	whoGoesFirst();
}

function setPlayerHand() {
	// Randomly takes five cards from the main deck
	// and assigns cards to player's hand
	
	var max = CardArray.length; max--;
	var rand = Math.floor((Math.random() * max));
	
	for (var i = 0; i < 5; i++) {
		playerCards[i] = TTDraw(rand);
		max--;
		rand = Math.floor((Math.random() * max));
	}
}

function setEnemyHand() {
	// Randomly takes five cards from the main deck
	// and assigns cards to enemy's hand

	var max = CardArray.length; max--;
	var rand = Math.floor((Math.random() * max));
	
	for (var i = 0; i < 5; i++) {
		enemyCards[i] = TTDraw(rand);
		enemyCards[i].player = false;
		enemyCards[i].front = false;
		max--;
		rand = Math.floor((Math.random() * max));
	}
}

function drawingCoordinates() {
	// Initializes the coordinates for drawing each card

	// player cards
	playerCards[0].drawX = col4;
	playerCards[1].drawX = col4;
	playerCards[2].drawX = col4;
	playerCards[3].drawX = col4;
	playerCards[4].drawX = col4;
	
	playerCards[0].drawY = row0;
	playerCards[1].drawY = row1;
	playerCards[2].drawY = row2;
	playerCards[3].drawY = row3;
	playerCards[4].drawY = row4;
	
	for (var i = 0; i < 5; i++) {
		playerCards[i].origDrawX = playerCards[i].drawX;
		playerCards[i].origDrawY = playerCards[i].drawY;
	}
	
	// enemy cards
	enemyCards[0].drawX = col0;
	enemyCards[1].drawX = col0;
	enemyCards[2].drawX = col0;
	enemyCards[3].drawX = col0;
	enemyCards[4].drawX = col0;
	
	enemyCards[0].drawY = row0;
	enemyCards[1].drawY = row1;
	enemyCards[2].drawY = row2;
	enemyCards[3].drawY = row3;
	enemyCards[4].drawY = row4
	
	for (var i = 0; i < 5; i++) {
		enemyCards[i].origDrawX = enemyCards[i].drawX;
		enemyCards[i].origDrawY = enemyCards[i].drawY;
	}
	
	// board cards
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			boardCards[i][j] = new TTCard();
			
			if (i == 0) {
				boardCards[i][j].drawX = col1;
			} else if (i == 1) {
				boardCards[i][j].drawX = col2;
			} else if (i == 2) {
				boardCards[i][j].drawX = col3;
			}
			
			if (j == 0) {
				boardCards[i][j].drawY = row0;
			} else if (j == 1) {
				boardCards[i][j].drawY = row2;
			} else if (j == 2) {
				boardCards[i][j].drawY = row4;
			}
		}
	}
	
	
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			boardCards[i][j].origDrawX = boardCards[i][j].drawX;
			boardCards[i][j].origDrawY = boardCards[i][j].drawY;
		}
	}
}

// end initialization functions






// game logic functions

function gameLogic() {
	// Transfer the actual game logic to this function.
	// It will make it easier when we want to create different rules.
	
	if (needCheck) {
		boardCards[selector1.locX][selector1.locY].checkProximity(selector1.locX, selector1.locY);
		needCheck = false;
	} else if (playerTurn) {
		// take stuff from Selector.select and put in here
		if (selector1.select && selector1.playerHand && !selector1.board
					&& playerCards[selector1.locY] != null) {
			// if selecting a card in the player's hand, and not selecting an empty space
			selector1.selectedNumber = selector1.locY;
			selector1.locY = 0;	// will point at first slot on board
			selector1.playerHand = false;
			selector1.board = true;
			selector1.select = false;
		} else if (selector1.select && selector1.board && !selector1.playerHand
					&& boardCards[selector1.locX][selector1.locY].index == null) {
			// if selecting an empty space on the board
			selector1.placeOnBoard(selector1.selectedNumber);
			boardCards[selector1.locX][selector1.locY].placed = true;
			selector1.select = false;
			playerTurn = false;
			enemyTurn = true;
		} else {
			selector1.select = false;
		}
	} else if (enemyTurn) {
		enemyChoice();
		playerTurn = true;
		enemyTurn = false;
	} else {
		//alert('neither player nor enemy\'s turn');
	}
	
	if (turn >= 10) {
		playerTurn = false;
		enemyTurn = false;
		isGameOver = true;
	} 
}

function whoGoesFirst() {
	// Function to choose who goes first
	// For now, make player go first
	// True if player, false if enemy
	playerTurn = true;
}

// end game logic functions






// TTCard functions

// card object to represent a monster/character/GF card
// name = name of card, top,bottom,left,right are the card's strength corresponding to 
// the 4 values on the card, and numCopy = the number of copies of the same card you have in the deck
function TTCard(name,top,bottom,left,right,numCopy,index){
	this.name = name;
	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;
	this.numCopy = numCopy;
	this.index = index; // used for finding correct image on spritesheet
	
	this.srcX = 0;	// column
	this.srcY = 0;	// row
	this.origSrcX = 0;
	this.origSrcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.origDrawX = 0;
	this.origDrawY = 0;
	this.backX = 64 * 26;
	this.backY = 64 * 3;
	this.width = 64;
	this.height = 64;
	this.widthScale = widthScale;
	this.heightScale = heightScale;
	
	this.player = true; 		// either player or enemy
	this.front = true;			// display front or back of card
	this.flipHori = false;		// horizontal flip
	this.flipVert = false;		// vertical flip
	this.shrink = false;		// used for flipping
	this.fall = false;			// fall onto board
}

// Deck to hold cards
// will fix this later. 
// in the process of testing for iteration through the enum, card object, get name, top,bottom,left, right values
// array to hold all the cards, so far it seems to work notice the name of the cards and value
function TTDeck(){
	var card = CardEnum;
	var name;
	// length of enum
	var keys = Object.keys(card);
	// CardArray is a global array
	//var CardArray = [];
	//alert(keys.length);
	for (var i = 1;i<keys.length;i++){
		
		var c = new TTCard(card.properties[i].name,card.properties[i].topValue,card.properties[i].bottomValue,card.properties[i].leftValue,card.properties[i].rightValue, card.properties[i].numCopy, i);
		c.srcCoordinates(i);
		CardArray.push(c);
		if (i == 1){
			name = c;
		}
	}
	//var c = new TTCard(card.properties[1].name,card.properties[1].topValue,card.properties[1].bottomValue,card.properties[1].leftValue,card.properties[1].rightValue);
	//alert("the name of the first card is: " + name.name +", top value: " + name.top + ", bottom value: " + name.bottom + ", left value: "+name.left + ", right value: " + name.right + " the number of copy current: " + name.numCopy );
	//alert("name: " +name.name);
	//alert(CardArray[0].name+" top value: " + CardArray[0].top);// Geezard 1st card
	//alert(CardArray[1].name+" top value: " + CardArray[1].top);// Funguar 2nd card 
	//alert(CardArray[109].name+" top value: " + CardArray[109].top);// Squall last card 
	
	return CardArray;
	
}

// function to add card to a deck/stack/hand and etc.
// the global array of cards called CardArray holds all the cards.

function TTDraw(index){
	var card;

	if (index >= 0 && index < CardArray.length) {
		card = CardArray[index];
		CardArray.splice(index, 1);
	}
	else
		card = null;

	return card;
}
// function to shuffle the cards in the deck
// n is the number of time you want to shuffle
// deck = the stack of cards you want to shuffle
function TTDeckShuffle(n, deck){
	var i, j, k;
	var temp;

	// Shuffle the stack 'n' times.

	for (i = 0; i < n; i++){
		for (j = 0; j < this.deck.length; j++) {
		  k = Math.floor(Math.random() * this.deck.length);
		  temp = this.deck[j];
		  this.deck[j] = this.deck[k];
		  this.deck[k] = temp;
		}
	}
	
	return deck;
}

TTCard.prototype.draw = function () {
	// Draw card background (blue = player, pink = enemy)
	if (this.player) {
		ctxBg.drawImage(imgPlayerBack,0,0,this.width,this.height,
				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	} else {
		ctxBg.drawImage(imgEnemyBack,0,0,this.width,this.height,
				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	
	// Draw card image from sprite sheet
	if (this.front) {
		ctxBg.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
					this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
		
		// Draw card's point values (and element later)
		this.drawNumbers();
	} else {
		// Draw card's back
		ctxBg.drawImage(cardSheet,64*26,64*3,this.width,this.height,
					this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	
};

TTCard.prototype.drawNumbers = function () {

	var scaleX = 13 * widthScale;
	var scaleY = 10.5 * heightScale;
	var x = 0;
	var y = 0;
	
	// Columns and Rows for Number placement
	var col1 = this.drawX + (this.widthScale*1);
	var col2 = this.drawX + (this.widthScale*5);
	var col3 = this.drawX + (this.widthScale*9);
	
	var row1 = this.drawY + (this.heightScale*2);
	var row2 = this.drawY + (this.heightScale*10);
	var row3 = this.drawY + (this.heightScale*18);
	
	// Top
	if (-1 < this.top && this.top < 10) { x = 148 + (this.top * 16); y = 66; } else { x = 175; y = 83; }
	ctxBg.drawImage(imgFont, x, y, 16, 16, col2, row1, scaleX, scaleY);
	
	// Left
	if (-1 < this.left && this.left < 10) { x = 148 + (this.left * 16); y = 66; } else { x = 175; y = 83; }
	ctxBg.drawImage(imgFont, x, y, 16, 16, col1, row2, scaleX, scaleY);
	// Right
	if (-1 < this.right && this.right < 10) { x = 148 + (this.right * 16); y = 66; } else { x = 175; y = 83; }
	ctxBg.drawImage(imgFont, x, y, 16, 16, col3, row2, scaleX, scaleY);
	// Bottom
	if (-1 < this.bottom && this.bottom < 10) { x = 148 + (this.bottom * 16); y = 66; } else { x = 175; y = 83; }
	ctxBg.drawImage(imgFont, x, y, 16, 16, col2, row3, scaleX, scaleY);
	
}

TTCard.prototype.srcCoordinates = function(index) {

	// Calculates the correct 'monster' image from spritesheet
	// based on index number given
	var count = 1;
	var row = 0;
	var col = 0;
	var i = 0;
	var j = 0;
	var k = 0;
	var stop = false;
	
	while (!stop) {
	
		for (j = 0; j < 4; j++) {
			for (i = 0; i < 2; i++) {
				if (index == count) {
					break;
				} else if (i < 1) {
					count++;
				} 
			}
			if (i > 1) { i = 1; }
			
			
			if (index == count) {
				break;
			} else if (j < 3) {
				count++;
			} 
		}
		if (j > 3) { j = 3;}
		
		if (index == count) {
			stop = true;
		} else {
			k += 2; count++;
		}
		
	}
	
	col = i;
	row = j;
	this.srcX = (64 * col) + (64 * k);
	this.srcY = 64 * row;
	this.origSrcX = this.srcX;
	this.origSrcY = this.srcY;
}

TTCard.prototype.update = function() {
	if (this.placed) {
		// move up off of screen, then down into board
		fallInt = 2 * heightScale;
		animating = true;
		
		if (this.drawY > -(72 * heightScale) && this.fall == false) {
			this.drawY -= fallInt;
			if (this.drawY <= -(72 * heightScale)) {
				this.drawX = this.origDrawX;
				this.fall = true;
			}
		} else if (this.fall == true) {
			this.drawY += fallInt;
			if (this.drawY >= this.origDrawY) {
				this.drawY = this.origDrawY;
				this.fall = false;
				this.placed = false;
				animating = false;
				needCheck = true;
			}
		}
	} else if (this.flipHori) {
		// flip card horizontally
		animating = true;
		if (this.heightScale == heightScale) {
			// flipping done
			// switch to cardFront
			this.shrink = !this.shrink;
			this.heightScale -= 0.125;
		}
		else if (this.heightScale > 0 && this.shrink == true) {
			this.drawY += 4;
			this.heightScale -= 0.125;
		}
		
		else if (this.heightScale == 0) {
			this.shrink = !this.shrink;
			this.front = !this.front;
			this.heightScale += 0.125;
			//switch to cardBack
			if (this.front) {
				// original card coord
				this.srcX = this.origSrcX;
				this.srcY = this.origSrcY;
				this.player = !this.player;
			} else {
				// back card coord
				this.srcX = this.backX;
				this.srcY = this.backY;
			}
		}
		
		else if (this.shrink == false && this.heightScale < heightScale) {
			this.drawY -= 4;
			this.heightScale += 0.125;
			if (this.front && this.heightScale == heightScale) {
				this.flipHori = false;
				animating = false;
			}
		}
	} else if (this.flipVert) {
		// flip card vertically
		animating = true;
		if (this.widthScale == widthScale) {
			// flipping done
			// switch to cardFront
			this.shrink = !this.shrink;
			this.widthScale -= 0.125;
		}
		else if (this.widthScale > 0 && this.shrink == true) {
			this.drawX += 4;
			this.widthScale -= 0.125;
		}
		
		else if (this.widthScale == 0) {
			this.shrink = !this.shrink;
			this.front = !this.front;
			this.widthScale += 0.125;
			//switch to cardBack
			if (this.front) {
				// original card coord
				this.srcX = this.origSrcX;
				this.srcY = this.origSrcY;
				this.player = !this.player;
			} else {
				// back card coord
				this.srcX = this.backX;
				this.srcY = this.backY;
			}
		}
		
		else if (this.shrink == false && this.widthScale < widthScale) {
			this.drawX -= 4;
			this.widthScale += 0.125;
			if (this.front && this.widthScale == widthScale) {
				this.flipVert = false;
				animating = false;
			}
		}
		
	}
}

TTCard.prototype.checkProximity = function (col, row) {
	var card = boardCards[col][row];
	var check;
	var checkTop = false;
	var checkLeft = false;
	var checkRight = false;
	var checkBottom = false;
	
	if (row == 0) {
		checkBottom = true;
	} else if (row == 1) {
		checkTop = true;
		checkBottom = true;
	} else if (row == 2) {
		checkTop = true;
	}
	
	if (col == 0) {
		checkRight = true;
	} else if (col == 1) {
		checkLeft = true;
		checkRight = true;
	} else if (col == 2) {
		checkLeft = true;
	}
	
	if (checkBottom) {
		if (boardCards[col][row+1].index > 0 && card.player != boardCards[col][row+1].player) {
			check = boardCards[col][row+1];
			if (card.bottom > check.top) {
				if (card.player) {
					playerScore++;
					enemyScore--;
				} else {
					playerScore--;
					enemyScore++;
				}
				check.flipHori = true;
			}
		}
	}
	
	if (checkTop) {
		if (boardCards[col][row-1].index > 0 && card.player != boardCards[col][row-1].player) {
			check = boardCards[col][row-1];
			if (card.top > check.bottom) {
				if (card.player) {
					playerScore++;
					enemyScore--;
				} else {
					playerScore--;
					enemyScore++;
				}
				check.flipHori = true;
			}
		}
	}
	
	if (checkRight) {
		if (boardCards[col+1][row].index > 0 && card.player != boardCards[col+1][row].player) {
			check = boardCards[col+1][row];
			if (card.right > check.left) {
				if (card.player) {
					playerScore++;
					enemyScore--;
				} else {
					playerScore--;
					enemyScore++;
				}
				check.flipVert = true;
			}
		}
	}
	
	if (checkLeft) {
		if (boardCards[col-1][row].index > 0 && card.player != boardCards[col-1][row].player) {
			check = boardCards[col-1][row];
			if (card.left > check.right) {
				if (card.player) {
					playerScore++;
					enemyScore--;
				} else {
					playerScore--;
					enemyScore++;
				}
				check.flipVert = true;
			}
		}
	}
	
}

TTCard.prototype.transferCard = function(card) {
	this.name		= card.name;
	this.top		= card.top;
	this.bottom		= card.bottom;
	this.left		= card.left;
	this.right		= card.right;
	this.numCopy	= card.numCopy;
	this.index		= card.index;
	this.srcX		= card.srcX;
	this.srcY		= card.srcY;
	this.origSrcX	= card.origSrcX;
	this.origSrcY	= card.origSrcY;
	this.player		= card.player;
	
	this.drawX 		= card.drawX;
	this.drawY 		= card.drawY;
}

// end TTCard functions






// Update functions

function update() {
	// This function is called every frame

	// Draw the various images on the canvas
	// and checks for key input
	
	ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
	drawBg();
	
	updatePlayerCards();
	updateEnemyCards();
	updateBoardCards();
	
	selector1.draw();
	
	drawScore();
	
	checkKeys();
	
	if (!animating) {
		gameLogic();
	
		if (isGameOver) {
			drawGameOver();
		}
	}
}

function updatePlayerCards() {
	for (i = 0; i < playerCards.length; i++) {
		if (playerCards[i] != null) {
			playerCards[i].draw();
			playerCards[i].update();
		}
	}
}

function updateEnemyCards() {
	for (i = 0; i < enemyCards.length; i++) {
		if (enemyCards[i] != null) {
			enemyCards[i].draw();
			enemyCards[i].update();
		}
	}
}

function updateBoardCards() {
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (boardCards[i][j].index > 0) {
				boardCards[i][j].draw();
				boardCards[i][j].update();
			}
		}
	}
}

function startUpdating() {
	stopUpdating();
	updateInterval = setInterval(update,spf);
}

function stopUpdating() {
	clearInterval(updateInterval);
}

// end Update functions






// Drawing (on canvas) functions

function drawBg() {
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	ctxBg.drawImage(imgBg,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*widthScale,gameHeight*heightScale);
}

function drawScore() {
	var scaleX = 40;
	var scaleY = 40;
	var x = 0;
	var y = 0;
	var locX = col0 + (12 * widthScale);
	var locY = row4 + (40 * heightScale);
	
	x = 148 + (enemyScore * 16); y = 66;
	ctxBg.drawImage(imgFont, x, y, 16, 16, locX, locY, scaleX * widthScale, scaleY * heightScale);
	
	var locX = col4 + (12 * widthScale);
	
	x = 148 + (playerScore * 16); y = 66;
	ctxBg.drawImage(imgFont, x, y, 16, 16, locX, locY, scaleX * widthScale, scaleY * heightScale);
}

function drawInfoBox(text) {
	// Draws info box at bottom of screen,
	// shows card name
	var srcX = 0;
	var srcY = 0;
	var drawX = 104;
	var drawY = 184;
	var width = 176;
	var height = 32;
	
	//imgGameOver
	ctxBg.drawImage(imgBoxInfo,srcX,srcY,width,height,drawX*widthScale,drawY*heightScale,width*widthScale,height*heightScale);
	
	ctxBg.font="32px Georgia";
	ctxBg.textAlign = "center";
	ctxBg.fillStyle = "white"; 
	ctxBg.strokeStyle = "white"; 
	ctxBg.fillText(text,192*widthScale,204*heightScale);
}

function drawGameOver() {
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	var width = 160;
	var height = 40;
	
	//alert('game over');
	if (playerScore > enemyScore) {
		//alert('Player won!');
		srcY = 0;
	} else if (playerScore < enemyScore){
		//alert('Enemy won!');
		srcY = 40;
	} else {
		//alert('Tie game!');
		srcY = 80;
	}
	
	//imgGameOver
	ctxBg.drawImage(imgGameOver,srcX,srcY,width,height,drawX,drawY,width*widthScale,height*heightScale);
}
// end Drawing functions






// Sound functions

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

// end Sound functions




// Selector functions

function Selector() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = gameWidth * 16;
	this.height = gameHeight * 12;
	this.selectedNumber = 0;
	
	this.select = false;
	this.playerHand = true;
	this.board = false;
	this.locX = 0;	// used in relation to board or hand
	this.locY = 0;	
}

Selector.prototype.draw = function() {
	this.hoverboard();
	ctxBg.drawImage(imgSelector,this.srcX,this.srcY,gameWidth,gameHeight,
				this.drawX,this.drawY,gameWidth*widthScale,gameHeight*heightScale);
	
	if (this.board) {
		// draw selection square beside selector
		selX = boardCards[this.locX][this.locY].drawX; selX -= (4 * widthScale);
		selY = boardCards[this.locX][this.locY].drawY; selY -= (4 * heightScale);
		ctxBg.drawImage(imgSelection,this.srcX,this.srcY,gameWidth,gameHeight,
					selX,selY,gameWidth*widthScale,gameHeight*heightScale);
	}
}

Selector.prototype.hoverboard = function() {
	// hover selector above board, move with arrow keys, select place for card
	
	if (this.playerHand) {
		// just up and down keys
		//locX = 0
		//locY = 0 to 5
		
		this.drawX = col4 - (26 * heightScale);
		
		if (this.locY == 0) {
			this.drawY = row0 + (16 * heightScale);
		} else if (this.locY == 1) {
			this.drawY = row1 + (16 * heightScale);
		} else if (this.locY == 2) {
			this.drawY = row2 + (16 * heightScale);
		} else if (this.locY == 3) {
			this.drawY = row3 + (16 * heightScale);
		} else if (this.locY == 4) {
			this.drawY = row4 + (16 * heightScale);
		} else {}
		
		
		for (var i = 0; i < playerCards.length; i++) {
			if (playerCards[i] != null) {
				playerCards[i].drawX = playerCards[i].origDrawX;
			}
		}
		
		if (playerCards[this.locY] != null) {
			playerCards[this.locY].drawX -= 16;
			drawInfoBox(playerCards[this.locY].name);
		}
		
	} else if (this.board) {
		
		// X location
		if (this.locX == 0) {
			this.drawX = col1 - (26 * heightScale);
		} else if (this.locX == 1) {
			this.drawX = col2 - (26 * heightScale);
		} else if (this.locX == 2) {
			this.drawX = col3 - (26 * heightScale);
		} else {}
		
		// Y location
		if (this.locY == 0) {
			this.drawY = row0 + (16 * heightScale);
		} else if (this.locY == 1) {
			this.drawY = row2 + (16 * heightScale);
		} else if (this.locY == 2) {
			this.drawY = row4 + (16 * heightScale);
		} else {}
	} else {
		
	}
	
	
}

Selector.prototype.placeOnBoard = function(selectedNumber) {
	var card;
	
	if (playerTurn) {
		card = playerCards[selectedNumber];
		playerCards[selectedNumber] = null;
		this.board = false;
		playerTurn = false;
	} else {
		card = enemyCards[selectedNumber];
		enemyCards[selectedNumber] = null;
		this.playerHand = true;
		playerTurn = true;
	}
	
	
	boardCards[this.locX][this.locY].transferCard(card);
	
	turn++;
}

Selector.prototype.moveUp = function() {
	if (this.locY > 0) {
		this.locY--;
	}	
}

Selector.prototype.moveDown = function() {
	if (this.playerHand) {
		if (this.locY < 4) {
			this.locY++;
		}
	} else if (this.board) {
		if (this.locY < 2) {
			this.locY++;
		}
	}
}

Selector.prototype.moveLeft = function() {
	if (this.board) {
		if (this.locX > 0) {
			this.locX--;
		}
	}
}

Selector.prototype.moveRight = function() {
	if (this.board) {
		if (this.locX < 2) {
			this.locX++;
		}
	}
}

// end selector functions




// enemy functions

function enemyChoice() {
	//alert('hey');
	//alert('enemy');
	
	//randomize enemy choice
	
	//choose a card from enemy hand
	var selection = Math.floor((Math.random() * 5)); // 0-4
	
	while (enemyCards[selection] == null) {
		// if rng chooses back of card or blank space,
		// regenerate until actual card is found
		selection = Math.floor((Math.random() * 5)); // 0-4
	}
	
	//choose a card from enemy hand
	selector1.locX = Math.floor((Math.random() * 3)); // 0-2
	selector1.locY = Math.floor((Math.random() * 3)); // 0-2
	while (boardCards[selector1.locX][selector1.locY].index >= 0) {
		// if rng chooses back of card or blank space,
		// regenerate until actual card is found
		selector1.locX = Math.floor((Math.random() * 3)); // 0-2
		selector1.locY = Math.floor((Math.random() * 3)); // 0-2
	}

	boardCards[selector1.locX][selector1.locY].placed = true;
	selector1.placeOnBoard(selection);
}

// end enemy functions




// Keyboard functions

function checkKeys() {
	if (isSpacebarKey) {
		selector1.select = true;
		isSpacebarKey = false;
	}
	if (isUpKey) {
		selector1.moveUp();
		isUpKey = false;
	} 
	if (isRightKey) {
		selector1.moveRight();
		isRightKey = false;
	}
	if (isDownKey) {
		selector1.moveDown();
		isDownKey = false;
	}
	if (isLeftKey) {
		selector1.moveLeft();
		isLeftKey = false;
	}
}

function checkKeyDown(e) {
	var keyID = e.keyCode || e.which;
	if (lastKey && lastKey.keyCode == e.keyCode) {
        return;
    }
	if (keyID === 32) { // spacebar
		isSpacebarKey = true;
		lastKey = e;
		e.preventDefault();
	}
	if (keyID === 38) { // up arrow
		//alert('up arrow was pressed');
		isUpKey = true;
		lastKey = e;
		e.preventDefault();
	}
	if (keyID === 39) { // right arrow
		isRightKey = true;
		lastKey = e;
		e.preventDefault();
	}
	if (keyID === 40) { // down arrow 
		isDownKey = true;
		lastKey = e;
		e.preventDefault();
	}
	if (keyID === 37) { // left arrow
		isLeftKey = true;
		lastKey = e;
		e.preventDefault();
	}
}

function checkKeyUp(e) {
	var keyID = e.keyCode || e.which;
	if (keyID === 32) { // spacebar
		isSpacebarKey = false;
		lastKey = null;
		e.preventDefault();
	}
	if (keyID === 38) { // up arrow
		isUpKey = false;
		lastKey = null;
		e.preventDefault();
	}
	if (keyID === 39) { // right arrow
		isRightKey = false;
		lastKey = null;
		e.preventDefault();
	}
	if (keyID === 40) { // down arrow
		isDownKey = false;
		lastKey = null;
		e.preventDefault();
	}
	if (keyID === 37) { // left arrow
		isLeftKey = false;
		lastKey = null;
		e.preventDefault();
	}
}

// end keyboard functions