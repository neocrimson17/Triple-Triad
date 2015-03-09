// Canvas Variables
var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

// Hand arrays
var playerCards = ["0", "1", "2", "3", "4"];
var enemyCards = ["0", "1", "2", "3", "4"];

// Game Settings variables
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var fps = 10;
var drawInterval;
var playerTurn = true;

// a Card object has an individual widthScale and heightScale used for animation.
// These two variables are global scaling variables, used as the
// original scales for all iamges at initialization
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

var playerScore = 5;
var enemyScore = 5;

// sounds
var MainTheme = new Audio('sounds/ShuffleBoogie.mp3');
var CursorMove = new Audio('sounds/CursorMove.mp3');
// image sources
var imgBg = new Image();
imgBg.src = 'images/board.png';

var cardSheet = new Image();
cardSheet.src = 'images/cards.png';

var imgFinger = new Image();
imgFinger.src = 'images/finger.png';

var imgFont = new Image();
imgFont.src = 'images/fonts.png';

var imgEnemyBack = new Image();
imgEnemyBack.src = 'images/enemyBack.png';

var imgPlayerBack = new Image();
imgPlayerBack.src = 'images/playerBack.png';

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

// main functions

function init(){

	//soundBg();
	drawBg();
	startDrawing();

	// Initialize board drawing coordinates
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			boardCards[i][j] = new Card();
			
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
	
	playerCards[0] = new Card();
	//playerCards[0].randomize();
	//temporarily make chubby chocobo
	playerCards[0].card = CardEnum.CHOCOBO;
	playerCards[0].top 	= CardEnum.properties[CardEnum.CHOCOBO].topValue;
	playerCards[0].left 	= CardEnum.properties[CardEnum.CHOCOBO].leftValue;
	playerCards[0].right 	= CardEnum.properties[CardEnum.CHOCOBO].rightValue;
	playerCards[0].bottom = CardEnum.properties[CardEnum.CHOCOBO].bottomValue;
	playerCards[0].srcX = 64 * 19;
	playerCards[0].srcY = 64 * 2;
	playerCards[0].origX = playerCards[0].srcX;
	playerCards[0].origY = playerCards[0].srcY;
	
	playerCards[1] = new Card();
	playerCards[1].randomize();
	
	playerCards[2] = new Card();
	playerCards[2].randomize();
	
	playerCards[3] = new Card();
	playerCards[3].randomize();
	
	playerCards[4] = new Card();
	playerCards[4].randomize();
	
	enemyCards[0] = new Card();
	enemyCards[0].randomize();
	enemyCards[0].player = false;
	
	enemyCards[1] = new Card();
	enemyCards[1].randomize();
	enemyCards[1].player = false;
	
	enemyCards[2] = new Card();
	enemyCards[2].randomize();
	enemyCards[2].player = false;
	
	enemyCards[3] = new Card();
	enemyCards[3].randomize();
	enemyCards[3].player = false;
	
	enemyCards[4] = new Card();
	enemyCards[4].randomize();
	enemyCards[4].player = false;
	
	finger1 = new Finger();
	finger1.selected = playerCards[0];
	
	setPlayerHand();
	setEnemyHand();
	
	// testing this function/object TTDeck
	TTDeck();
	
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);
}

// card object to represent a monster/character/GF card
// name = name of card, top,bottom,left,right are the card's strength corresponding to 
// the 4 values on the card, and numCopy = the number of copies of the same card you have in the deck
function TTCard(name,top,bottom,left,right,numCopy){
	this.name = name;
	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;
	this.numCopy = numCopy;
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
	var CardArray = [];
	//alert(keys.length);
	for (var i = 1;i<keys.length;i++){
		
		var c = new TTCard(card.properties[i].name,card.properties[i].topValue,card.properties[i].bottomValue,card.properties[i].leftValue,card.properties[i].rightValue, card.properties[i].numCopy);
		CardArray.push(c);
		if (i == 1){
			name = c;
		}
	}
	//var c = new TTCard(card.properties[1].name,card.properties[1].topValue,card.properties[1].bottomValue,card.properties[1].leftValue,card.properties[1].rightValue);
	//alert("the name of the first card is: " + name.name +", top value: " + name.top + ", bottom value: " + name.bottom + ", left value: "+name.left + ", right value: " + name.right + " the number of copy current: " + name.numCopy );
	//CardArray[0].numCopy++;
	//alert(CardArray[0].numCopy);
	//alert("name: " +name.name);
	//alert(CardArray[0].name+" top value: " + CardArray[0].top);// Geezard 1st card
	//alert(CardArray[1].name+" top value: " + CardArray[1].top);// Funguar 2nd card 
	//alert(CardArray[109].name+" top value: " + CardArray[109].top);// Squall last card 
	
	return CardArray;
	
}

// function to add card to a deck/stack/hand and etc.
// the global array of cards called CardArray holds all the cards.

function TTDraw(index, deck){
	var card;

	if (index >= 0 && index < this.deck.length) {
		card = this.deck[index];
		this.deck.splice(index, 1);
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

function draw() {
	ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
	drawBg();
	for (i = 0; i < playerCards.length; i++) {
		if (playerCards[i] != null) {
			playerCards[i].draw();
		}
	}
	for (i = 0; i < enemyCards.length; i++) {
		if (enemyCards[i] != null) {
			enemyCards[i].draw();
		}
	}
	
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (boardCards[i][j].card > 0) {
				boardCards[i][j].draw();
			}
		}
	}
	
	finger1.draw();
	
	drawScore();
	
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

function drawScore() {
	var scaleX = 40;
	var scaleY = 40;
	var x = 0;
	var y = 0;
	var locX = col0 + (12 * widthScale);
	var locY = row4 + (40 * heightScale);
	
	x = 148 + (playerScore * 16); y = 66;
	ctxBg.drawImage(imgFont, x, y, 16, 16, locX, locY, scaleX * widthScale, scaleY * heightScale);
	
	var locX = col4 + (12 * widthScale);
	
	x = 148 + (enemyScore * 16); y = 66;
	ctxBg.drawImage(imgFont, x, y, 16, 16, locX, locY, scaleX * widthScale, scaleY * heightScale);
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
		// future: cards[0].position = playerHand[0];
		
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
}

function setEnemyHand() {
		// future: cards[5].position = enemyHand[0];
		
		enemyCards[0].drawX = col0;
		enemyCards[1].drawX = col0;
		enemyCards[2].drawX = col0;
		enemyCards[3].drawX = col0;
		enemyCards[4].drawX = col0;
		
		enemyCards[0].drawY = row0;
		enemyCards[1].drawY = row1;
		enemyCards[2].drawY = row2;
		enemyCards[3].drawY = row3;
		enemyCards[4].drawY = row4;
}

function Finger() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = gameWidth * 16;
	this.height = gameHeight * 12;
	this.selectedNumber = 0;
	
	this.playerHand = true;
	this.board = false;
	this.locX = 0;	// used in relation to board or hand
	this.locY = 0;	
}

Finger.prototype.highlight = function(card) {
	// unused right now, reimplement later once animations are figured out
	
	//var playerCol = gameWidth - (32 * widthScale) - (64 * widthScale) - (24 * widthScale);
	//var enemyCol =  (24 - 32) * widthScale;
	var playerCol = col4;
	var enemyCol  = col0;
	
	//only fix previous card's position if not placed on board
	
	if (this.player == true) {
		// player card
		if (playerCards[this.selectedCard].onBoard == false) {
			// if card is not already on board, return card to original position in hand
			playerCards[this.selectedCard].drawX = playerCol;
		}
	} else {
		// enemy card
		if (enemyCards[this.selectedCard].onBoard == false) {
			// if card is not already on board, return card to original position in hand
			enemyCards[this.selectedCard].drawX = enemyCol;
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
			playerCards[card].drawX = playerCol - (widthScale * 8);
		}
		CursorMove.play();
	} else {
		if (enemyCards[card].onBoard == false) {
			enemyCards[card].drawX = enemyCol - (widthScale * 8);
		}
		CursorMove.play();
	}
	
	this.selected = card;
	
	if (this.player) {
		this.drawX = playerCol - (26 * heightScale);
	} else {
		this.drawX = enemyCol - (26 * heightScale);
	}
	
	if (card == 0) { this.drawY = row0 + (16 * heightScale); }
	if (card == 1) { this.drawY = row1 + (16 * heightScale); }
	if (card == 2) { this.drawY = row2 + (16 * heightScale); }
	if (card == 3) { this.drawY = row3 + (16 * heightScale); }
	if (card == 4) { this.drawY = row4 + (16 * heightScale); }	
}

Finger.prototype.select = function() {
	if (this.playerHand == true && this.board == false) {
		//if selecting a card in the player's hand
		this.selectedNumber = this.locY;
		this.locY = 0; // will point at first slot on board
		this.playerHand = false;
		this.board		= true;
	} else if (this.board == true && this.playerHand == false) {
		//if selecting a place on the board to put card
		this.placeOnBoard(this.selectedNumber, this.locX, this.locY);
		enemyChoice();
	}
}

Finger.prototype.hoverboard = function() {
	// hover finger above board, move with arrow keys, select place for card
	
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

Finger.prototype.placeOnBoard = function(selectedNumber, locX, locY) {
	var card = new Card();
	
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
		card.player = false;
	}
		
	boardCards[locX][locY].card		= card.card;
	boardCards[locX][locY].top		= card.top;
	boardCards[locX][locY].left		= card.left;
	boardCards[locX][locY].right	= card.right;
	boardCards[locX][locY].bottom	= card.bottom;
	boardCards[locX][locY].srcX		= card.srcX;
	boardCards[locX][locY].srcY		= card.srcY;
	boardCards[locX][locY].origX	= card.origX;
	boardCards[locX][locY].origY	= card.origY;
	boardCards[locX][locY].player	= card.player;
	
	boardCards[locX][locY].checkProximity(locX, locY);
}

Finger.prototype.draw = function() {
	this.hoverboard();
	ctxBg.drawImage(imgFinger,this.srcX,this.srcY,gameWidth,gameHeight,
				this.drawX,this.drawY,gameWidth*widthScale,gameHeight*heightScale);
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
	this.player = true; //either player or enemy
	
	// blue background = player
	// pink background = enemy
	
	this.onBoard = false;
	this.shrink = true;
	this.front = true;
	this.flip = false;
	
	// Card values, future implementation
	this.card;
	this.top;
	this.left;
	this.right;
	this.bottom;
	this.element;
	
	//CardEnum = { 82:{name: "Chocobo", topValue: 9, bottomValue: 8, leftValue: 4, rightValue: 4},
	
	/*
	var mySize = SizeEnum.MEDIUM;
	var myCode = SizeEnum.properties[mySize].code; // myCode == "M"
	*/
	// chubby values
	//this.top 	= 4;
	//this.card = CardEnum.CHOCOBO;
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
	this.origX = this.srcX;
	this.origY = this.srcY;
	
	// later, match the following with the picture array
	
	this.card = Math.floor((Math.random() * 110)+1);	// 1-110
	
	this.top 	= CardEnum.properties[this.card].topValue;
	this.left 	= CardEnum.properties[this.card].leftValue;
	this.right 	= CardEnum.properties[this.card].rightValue;
	this.bottom = CardEnum.properties[this.card].bottomValue;
	
}

Card.prototype.draw = function () {
	
	// flip functions, test whether front or side flip. just front for now.
	if (this.flip) { this.frontFlip(); }
	
	// Draw card background (blue = player, pink = enemy)
	if (this.player) {
		ctxBg.drawImage(imgPlayerBack,0,0,this.width,this.height,
				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	} else {
		ctxBg.drawImage(imgEnemyBack,0,0,this.width,this.height,
				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	}
	
	// Draw card image from sprite sheet
	ctxBg.drawImage(cardSheet,this.srcX,this.srcY,this.width,this.height,
				this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
	
	// Draw card's point values (and element later)
	this.drawNumbers();
	
};

Card.prototype.drawNumbers = function () {
	// 0 : 148, 66
	// subsequent numbers up to 9 are 148 * #
	// A is outlier: 175, 83
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
	
	
	
	/*
		number images stretched to 165%
		on final 2x2.5 stretched card
	*/
	
	
	// if not 'A', or rather, if an integer between 0-9 (A is 10)
	
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

Card.prototype.checkProximity = function (row, col) {
	/*
		if in row 0, check against row 1
		if in row 1, check against 0 and 2
		if in 2, check against 1
		etc
	*/
	
	if (row == 0) {
		if (boardCards[1][col].card > 0) {
			alert(boardCards[row][col].bottom);
			alert(boardCards[1][col].top);
			if (boardCards[row][col].bottom > boardCards[1][col].top) {
			alert(boardCards[row][col].bottom + ' > ' + boardCards[1][col].top);
				boardCards[1][col].player = true;
				//boardCards[1][col].frontFlip(true);
			}
		}
	}
	
}

Card.prototype.frontFlip = function (changeTeam) {

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
				if (changeTeam)
				{
					this.player = !this.player;
				}
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
	if (isSpacebarKey) {
		finger1.select();
		isSpacebarKey = false;
	}
	if (isUpKey) {
		if (finger1.playerHand) {
			if (finger1.locY > 0 ) {
				finger1.locY --;
				isUpKey = false;
			}
		} else if (finger1.board) {
			if (finger1.locY > 0 ) {
				finger1.locY --;
				isUpKey = false;
			}
		}
	} 
	if (isRightKey) {
		if (finger1.board) {
			if (finger1.locX < 2 ) {
				finger1.locX ++;
				isRightKey = false;
			}
		}
	}
	if (isDownKey) {
		if (finger1.playerHand) {
			if (finger1.locY < 4 ) {
				finger1.locY ++;
				isDownKey = false;
			}
		} else if (finger1.board) {
			if (finger1.locY < 2 ) {
				finger1.locY ++;
				isDownKey = false;
			}
		}
	}
	if (isLeftKey) {
		if (finger1.board) {
			if (finger1.locX > 0 ) {
				finger1.locX --;
				isLeftKey = false;
			}
		}
	}
	if (isFKey) {
		finger1.board = !finger1.board;
		finger1.playerHand = !finger1.playerHand;
		if (finger1.player == true) {
			playerCards[finger1.selected].flip = !playerCards[finger1.selected].flip;
		} else {
			enemyCards[finger1.selected].flip = !enemyCards[finger1.selected].flip;
		}
		
	}
}


// end of Card functions





// enemy functions
function enemyChoice() {
	alert('hey');
	alert('enemy');
	
	//randomize enemy choice
	
	//choose a card from enemy hand
	var selection = Math.floor((Math.random() * 5)); // 0-4
	
	while (enemyCards[selection] == null) {
		// if rng chooses back of card or blank space,
		// regenerate until actual card is found
		selection = Math.floor((Math.random() * 5)); // 0-4
	}
	
	//choose a card from enemy hand
	var locX = Math.floor((Math.random() * 3)); // 0-2
	var locY = Math.floor((Math.random() * 3)); // 0-2
	
	while (boardCards[locX][locY].card >= 0) {
		// if rng chooses back of card or blank space,
		// regenerate until actual card is found
		locX = Math.floor((Math.random() * 3)); // 0-2
		locY = Math.floor((Math.random() * 3)); // 0-2
	}
	
	finger1.placeOnBoard(selection,locX,locY);
}
// end of enemy functions







// event functions

function checkKeyDown(e) {
	var keyID = e.keyCode || e.which;
	if (lastKey && lastKey.keyCode == e.keyCode) {
        return;
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
	/*
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
	}*/
	if (keyID === 32) { // spacebar
		isSpacebarKey = true;
		lastKey = e;
		e.preventDefault();
	}
	if (keyID === 70) { // F
		isFKey = true;
		lastKey = e;
		e.preventDefault();
	}
}

function checkKeyUp(e) {
	var keyID = e.keyCode || e.which;
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
	/*
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
	}*/
	if (keyID === 32) { // spacebar
		isSpacebarKey = false;
		lastKey = null;
		e.preventDefault();
	}
	if (keyID === 70) { // F
		isFKey = false;
		lastKey = null;
		e.preventDefault();
	}
}

// end of event functions