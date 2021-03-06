
document.Triad.Game = function() {
	var deferrer;
	var offline;
	var playerName;
	var monsterData;
	
	// Canvas Variables
	var canvasBg;
	var ctxBg;

	// Game States
	gameStates = {
		Init : 0, 
		RuleSelect : 1,
		Game : 2,
		CardTrade : 3,
		Finish : 4
	}
	
	elements = {
		none: 0,
		earth : 1,
		fire : 2,
		holy : 3,
		ice : 4,
		lightning : 5,
		poison : 6,
		water : 7,
		wind : 8
	}

	var gameState;

	// Decks
	var playerDeck;
	var enemyDeck;
	var CardArray;

	// Hand arrays
	var playerCards;
	var enemyCards;

	// Game Settings variables
	var gameWidth;
	var gameHeight;
	var spf;		// seconds per frame
	var updateInterval;

	// a Card object has an individual widthScale and heightScale used for animation.
	// These two variables are global scaling variables, used as the
	// original scales for all images at initialization
	var widthScale;
	var heightScale;

	// future: double array for board cards, stores either card or enemyCard index
	// future: array to store pixel locations of placements (player/enemy hand, board)
	var row0; // row 1 in hand, row 1 on board
	var row1; // row 2 in hand
	var row2; // row 3 in hand, row 2 on board
	var row3; // row 4 in hand
	var row4; // row 5 in hand, row 3 on board

	var col0;
	var col1;
	var col2;
	var col3;
	var col4;

	var tradeRow0;
	var tradeRow1;
	var tradeCol0;
	var tradeCol4;

	var boardCards;

	var lastKey;
	var isEnterKey;
	var isSpacebarKey;
	var isUpKey;
	var isRightKey;
	var isDownKey;
	var isLeftKey;

	var turn;
	var playerTurn;
	var enemyTurn;
	var isGameOver;
	var animating;
	var needCheck;
	
	// Variables sent to database
	var playerScore;
	var enemyScore;
	var chosenCard;

	// sounds
	var MainTheme;
	var CursorCancel;
	var CursorMove;
	var CursorWrong;
	var DrawPoint;
	var SavePoint;

	var imgBg;

	var imgTradingBg;

	var cardSheet;

	var imgSelector;

	var imgFont;

	var imgEnemyBack;

	var imgPlayerBack;

	var imgSelection;

	var imgGameOver;

	var imgBoxInfo;

	var imgBoxTradeInfo;

	var imgBoxRules;
	
	var imgElements;

	// enum for cards to help create a card object
	// note: each card has a name and 4 corresponding values(top,bottom, left and right)
	// The highest value is represented by a letter A graphically (numerically it's equal to 10)
	// example: to use in game code
	// var mySize = CardEnum.GEEZARD;
	// var myCode = CardEnum.properties[mySize].name; // myCode == "Geezard"
	// OR if mycode = Card.properties[mySize].topValue; // myCode == 1
	var CardEnum;
	// here
	function init(name, data) {
		// initialization function
		deferrer = $.Deferred();
		
		// if name and data and -1, then game is offline
		// so generate data with 'offline' function (just random cards for now)
		if (name == -1 && data == -1) {
			offline = true;
			playerName = "Offline User";
			monsterData = data;
		} else {
			offline = false;
			playerName = name;
			monsterData = data;
		}
		
		// Canvas Variables
		canvasBg = document.getElementById('canvasBg');
		ctxBg = canvasBg.getContext('2d');

		gameState = gameStates.Init;

		// Decks
		playerDeck = [];
		enemyDeck = [];
		CardArray = [];

		// Hand arrays
		playerCards = [];
		enemyCards = [];

		// Game Settings variables
		gameWidth = canvasBg.width;
		gameHeight = canvasBg.height;
		spf = 5;	// seconds per frame
		updateInterval;

		// a Card object has an individual widthScale and heightScale used for animation.
		// These two variables are global scaling variables, used as the
		// original scales for all images at initialization
		widthScale = 2;
		heightScale = 2.5;

		// future: double array for board cards, stores either card or enemyCard index
		// future: array to store pixel locations of placements (player/enemy hand, board)
		row0 = heightScale * 16; // row 1 in hand, row 1 on board
		row1 = heightScale * 48; // row 2 in hand
		row2 = heightScale * 80; // row 3 in hand, row 2 on board
		row3 = heightScale * 112;// row 4 in hand
		row4 = heightScale * 144;// row 5 in hand, row 3 on board

		col0 = widthScale * 24;	
		col1 = widthScale * 96;
		col2 = widthScale * 160;
		col3 = widthScale * 224;
		col4 = widthScale * 296;

		tradeRow0 = row1-(6*heightScale);
		tradeRow1 = row3+(6*heightScale);
		tradeCol0 = col0+(8*widthScale);
		tradeCol4 = col4-(8*widthScale);

		boardCards = [
		[0,0],[0,1],[0,2],
		[1,0],[1,1],[1,2],
		[2,0],[2,1],[2,2],
		];

		lastKey = null;
		isEnterKey = false;
		isSpacebarKey = false;
		isUpKey = false;
		isRightKey = false;
		isDownKey = false;
		isLeftKey = false;

		playerScore = 5;
		enemyScore = 5;
		turn = 1;
		playerTurn = false;
		enemyTurn = false;
		isGameOver = false;
		animating = false;
		needCheck = false;

		// sounds
		MainTheme = new Audio('sounds/ShuffleBoogie.mp3');
		CursorCancel = new Audio('sounds/CursorCancelNew.mp3');
		CursorMove = new Audio('sounds/CursorMoveNew.mp3');
		CursorWrong = new Audio('sounds/CursorWrongNew.mp3');
		DrawPoint = new Audio('sounds/DrawPointNew.mp3');
		SavePoint = new Audio('sounds/SavePointNew2.mp3');

		imgBg = new Image();
		imgBg.src = 'images/board.png';

		imgTradingBg = new Image();
		imgTradingBg.src = 'images/tradingBoard.png';

		cardSheet = new Image();
		cardSheet.src = 'images/cards.png';

		imgSelector = new Image();
		imgSelector.src = 'images/finger.png';

		imgFont = new Image();
		imgFont.src = 'images/fonts.png';

		imgEnemyBack = new Image();
		imgEnemyBack.src = 'images/enemyBack.png';

		imgPlayerBack = new Image();
		imgPlayerBack.src = 'images/playerBack.png';

		imgSelection = new Image();
		imgSelection.src = 'images/selection.png';

		imgGameOver = new Image();
		imgGameOver.src = 'images/gameOverStatesNew.png';

		imgBoxInfo = new Image();
		imgBoxInfo.src = 'images/boxInfo.png';

		imgBoxTradeInfo = new Image();
		imgBoxTradeInfo.src = 'images/boxTradeInfo.png';

		imgBoxRules = new Image();
		imgBoxRules.src = 'images/boxRules.png';
		
		imgElements = new Image();
		imgElements.src = 'images/elements.png';

		// enum for cards to help create a card object
		// note: each card has a name and 4 corresponding values(top,bottom, left and right)
		// The highest value is represented by a letter A graphically (numerically it's equal to 10)
		// example: to use in game code
		// var mySize = CardEnum.GEEZARD;
		// var myCode = CardEnum.properties[mySize].name; // myCode == "Geezard"
		// OR if mycode = Card.properties[mySize].topValue; // myCode == 1
		CardEnum = {
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
				1:{name: "Geezard", topValue: 1, bottomValue: 1, leftValue: 5, rightValue: 4, numCopy: 1, element: elements.none},
				2:{name: "Funguar", topValue: 5, bottomValue: 1, leftValue: 3, rightValue: 1, numCopy: 1, element: elements.none},
				3:{name: "Bite Bug", topValue: 1, bottomValue: 3, leftValue: 5, rightValue: 3, numCopy: 1, element: elements.none},
				4:{name: "Red Bat", topValue: 6, bottomValue: 1, leftValue: 2, rightValue: 1, numCopy: 1, element: elements.none},
				5:{name: "Blobra", topValue: 2, bottomValue: 1, leftValue: 5, rightValue: 3, numCopy: 1, element: elements.none},
				6:{name: "Gayla", topValue: 2, bottomValue: 4, leftValue: 4, rightValue: 1, numCopy: 1, element: elements.lightning},
				7:{name: "Gesper", topValue: 1, bottomValue: 4, leftValue: 1, rightValue: 5, numCopy: 1, element: elements.none},
				8:{name: "Fastitocalon-F", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 5, numCopy: 1, element: elements.earth},
				9:{name: "Blood Soul", topValue: 2, bottomValue: 6, leftValue: 1, rightValue: 1, numCopy: 1, element: elements.none},
				10:{name: "Caterchipillar", topValue: 4, bottomValue: 4, leftValue: 3, rightValue: 2, numCopy: 1, element: elements.none},
				11:{name: "Cockatrice", topValue: 2, bottomValue: 2, leftValue: 6, rightValue: 1, numCopy: 1, element: elements.lightning},
				// level 2 monsters 
				12:{name: "Grat", topValue: 7, bottomValue: 3, leftValue: 1, rightValue: 1, numCopy: 1, element: elements.none},
				13:{name: "Buel", topValue: 6, bottomValue: 2, leftValue: 3, rightValue: 2, numCopy: 1, element: elements.none},
				14:{name: "Mesmerize", topValue: 5, bottomValue: 3, leftValue: 4, rightValue: 3, numCopy: 1, element: elements.none},
				15:{name: "Glacial Eye", topValue: 6, bottomValue: 4, leftValue: 3, rightValue: 1, numCopy: 1, element: elements.ice},
				16:{name: "Belhelmel", topValue: 3, bottomValue: 5, leftValue: 3, rightValue: 4, numCopy: 1, element: elements.none},
				17:{name: "Thrustaevis", topValue: 5, bottomValue: 2, leftValue: 5, rightValue: 3, numCopy: 1, element: elements.wind},
				18:{name: "Anacondaur", topValue: 5, bottomValue: 3, leftValue: 5, rightValue: 1, numCopy: 1, element: elements.poison},
				19:{name: "Creeps", topValue: 5, bottomValue: 5, leftValue: 2, rightValue: 2, numCopy: 1, element: elements.lightning},
				20:{name: "Grendel", topValue: 4, bottomValue: 5, leftValue: 2, rightValue: 4, numCopy: 1, element: elements.lightning},
				21:{name: "Jelleye", topValue: 3, bottomValue: 1, leftValue: 7, rightValue: 2, numCopy: 1, element: elements.none},
				22:{name: "Grand Mantis", topValue: 5, bottomValue: 5, leftValue: 3, rightValue: 2, numCopy: 1, element: elements.none},
				// level 3 monsters 
				23:{name: "Forbidden", topValue: 6, bottomValue: 3, leftValue: 2, rightValue: 6, numCopy: 1, element: elements.none},
				24:{name: "Armadodo", topValue: 6, bottomValue: 1, leftValue: 6, rightValue: 3, numCopy: 1, element: elements.earth},
				25:{name: "Tri-Face", topValue: 3, bottomValue: 5, leftValue: 5, rightValue: 5, numCopy: 1, element: elements.poison},
				26:{name: "Fastitocalon", topValue: 7, bottomValue: 1, leftValue: 3, rightValue: 5, numCopy: 1, element: elements.earth},
				27:{name: "Snow Lion", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 1, numCopy: 1, element: elements.ice},
				28:{name: "Ochu", topValue: 5, bottomValue: 3, leftValue: 3, rightValue: 6, numCopy: 1, element: elements.none},
				29:{name: "SAM08G", topValue: 5, bottomValue: 2, leftValue: 4, rightValue: 6, numCopy: 1, element: elements.fire},
				30:{name: "Death Claw", topValue: 4, bottomValue: 7, leftValue: 2, rightValue: 4, numCopy: 1, element: elements.fire},
				31:{name: "Cactuar", topValue: 6, bottomValue: 6, leftValue: 3, rightValue: 2, numCopy: 1, element: elements.none},
				32:{name: "Tonberry", topValue: 3, bottomValue: 4, leftValue: 4, rightValue: 6, numCopy: 1, element: elements.none},
				33:{name: "Abyss Worm", topValue: 7, bottomValue: 3, leftValue: 5, rightValue: 2, numCopy: 1, element: elements.earth},
				// level 4 monsters 
				34:{name: "Turtapod", topValue: 2, bottomValue: 6, leftValue: 7, rightValue: 3, numCopy: 1, element: elements.none},
				35:{name: "Vysage", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 5, numCopy: 1, element: elements.none},
				36:{name: "T-Rexaur", topValue: 4, bottomValue: 2, leftValue: 7, rightValue: 6, numCopy: 1, element: elements.none},
				37:{name: "Bomb", topValue: 2, bottomValue: 6, leftValue: 3, rightValue: 7, numCopy: 1, element: elements.fire},
				38:{name: "Blitz", topValue: 1, bottomValue: 4, leftValue: 7, rightValue: 6, numCopy: 1, element: elements.lightning},
				39:{name: "Wendigo", topValue: 7, bottomValue: 1, leftValue: 6, rightValue: 3, numCopy: 1, element: elements.none},
				40:{name: "Torama", topValue: 7, bottomValue: 4, leftValue: 4, rightValue: 4, numCopy: 1, element: elements.none},
				41:{name: "Imp", topValue: 3, bottomValue: 3, leftValue: 6, rightValue: 7, numCopy: 1, element: elements.none},
				42:{name: "Blue Dragon", topValue: 6, bottomValue: 7, leftValue: 3, rightValue: 2, numCopy: 1, element: elements.poison},
				43:{name: "Adamantoise", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 5, numCopy: 1, element: elements.earth},
				44:{name: "Hexadragon", topValue: 7, bottomValue: 4, leftValue: 3, rightValue: 5, numCopy: 1, element: elements.fire},
				// level 5 monsters 
				45:{name: "Iron Giant", topValue: 6, bottomValue: 6, leftValue: 5, rightValue: 5, numCopy: 1, element: elements.none},
				46:{name: "Behemoth", topValue: 3, bottomValue: 5, leftValue: 7, rightValue: 6, numCopy: 1, element: elements.none},
				47:{name: "Chimera", topValue: 7, bottomValue: 5, leftValue: 3, rightValue: 6, numCopy: 1, element: elements.water},
				48:{name: "PuPu", topValue: 3, bottomValue: 2, leftValue: 1, rightValue: 10, numCopy: 1, element: elements.none},
				49:{name: "Elastoid", topValue: 6, bottomValue: 6, leftValue: 7, rightValue: 2, numCopy: 1, element: elements.none},
				50:{name: "GIM47N", topValue: 5, bottomValue: 7, leftValue: 4, rightValue: 5, numCopy: 1, element: elements.none},
				51:{name: "Malboro", topValue: 7, bottomValue: 4, leftValue: 2, rightValue: 7, numCopy: 1, element: elements.poison},
				52:{name: "Ruby Dragon", topValue: 7, bottomValue: 7, leftValue: 4, rightValue: 2, numCopy: 1, element: elements.fire},
				53:{name: "Elnoyle", topValue: 5, bottomValue: 7, leftValue: 6, rightValue: 3, numCopy: 1, element: elements.none},
				54:{name: "Tonberry King", topValue: 4, bottomValue: 7, leftValue: 4, rightValue: 6, numCopy: 1, element: elements.none},
				55:{name: "Biggs, Wedge", topValue: 6, bottomValue: 2, leftValue: 7, rightValue: 6, numCopy: 1, element: elements.none},
				// level 6 bosses 
				56:{name: "Fujin, Raijin", topValue: 2, bottomValue: 8, leftValue: 4, rightValue: 8, numCopy: 1, element: elements.none},
				57:{name: "Elvoret", topValue: 7, bottomValue: 3, leftValue: 4, rightValue: 8, numCopy: 1, element: elements.wind},
				58:{name: "X-ATM092", topValue: 4, bottomValue: 7, leftValue: 3, rightValue: 8, numCopy: 1, element: elements.none},
				59:{name: "Granaldo", topValue: 7, bottomValue: 8, leftValue: 5, rightValue: 2, numCopy: 1, element: elements.none},
				60:{name: "Gerogero", topValue: 1, bottomValue: 8, leftValue: 3, rightValue: 8, numCopy: 1, element: elements.poison},
				61:{name: "Iguion", topValue: 8, bottomValue: 8, leftValue: 2, rightValue: 2, numCopy: 1, element: elements.none},
				62:{name: "Abadon", topValue: 6, bottomValue: 4, leftValue: 5, rightValue: 8, numCopy: 1, element: elements.none},
				63:{name: "Trauma", topValue: 4, bottomValue: 5, leftValue: 6, rightValue: 8, numCopy: 1, element: elements.none},
				64:{name: "Oilboyle", topValue: 1, bottomValue: 4, leftValue: 8, rightValue: 8, numCopy: 1, element: elements.none},
				65:{name: "Shumi Tribe", topValue: 6, bottomValue: 8, leftValue: 4, rightValue: 5, numCopy: 1, element: elements.none},
				66:{name: "Krysta", topValue: 7, bottomValue: 8, leftValue: 1, rightValue: 5, numCopy: 1, element: elements.none},
				// level 7 bosses 
				67:{name: "Propagator", topValue: 8, bottomValue: 4, leftValue: 8, rightValue: 4, numCopy: 1, element: elements.none},
				68:{name: "Jumbo Cactuar", topValue: 8, bottomValue: 4, leftValue: 4, rightValue: 8, numCopy: 1, element: elements.none},
				69:{name: "Tri-Point", topValue: 8, bottomValue: 2, leftValue: 8, rightValue: 5, numCopy: 1, element: elements.lightning},
				70:{name: "Gargantua", topValue: 5, bottomValue: 6, leftValue: 8, rightValue: 6, numCopy: 1, element: elements.none},
				71:{name: "Mobile Type 8", topValue: 8, bottomValue: 7, leftValue: 3, rightValue: 6, numCopy: 1, element: elements.none},
				72:{name: "Sphinxara", topValue: 8, bottomValue: 5, leftValue: 8, rightValue: 3, numCopy: 1, element: elements.none},
				73:{name: "Tiamat", topValue: 8, bottomValue: 5, leftValue: 4, rightValue: 8, numCopy: 1, element: elements.none},
				74:{name: "BGH251F2", topValue: 5, bottomValue: 8, leftValue: 5, rightValue: 7, numCopy: 1, element: elements.none},
				75:{name: "Red Giant", topValue: 6, bottomValue: 4, leftValue: 7, rightValue: 8, numCopy: 1, element: elements.none},
				76:{name: "Catoblepas", topValue: 1, bottomValue: 7, leftValue: 7, rightValue: 8, numCopy: 1, element: elements.none},
				77:{name: "Ultima Weapon", topValue: 7, bottomValue: 2, leftValue: 8, rightValue: 7, numCopy: 1, element: elements.none},
				// level 8 guardian forces
				78:{name: "Chubby Chocobo", topValue: 4, bottomValue: 8, leftValue: 9, rightValue: 4, numCopy: 1, element: elements.none},
				79:{name: "Angelo", topValue: 9, bottomValue: 7, leftValue: 3, rightValue: 6, numCopy: 1, element: elements.none},
				80:{name: "Gilgamesh", topValue: 3, bottomValue: 9, leftValue: 6, rightValue: 7, numCopy: 1, element: elements.none},
				81:{name: "MiniMog", topValue: 9, bottomValue: 9, leftValue: 2, rightValue: 3, numCopy: 1, element: elements.none},
				82:{name: "Chocobo", topValue: 9, bottomValue: 8, leftValue: 4, rightValue: 4, numCopy: 1, element: elements.none},
				83:{name: "Quezacotl", topValue: 2, bottomValue: 9, leftValue: 4, rightValue: 9, numCopy: 1, element: elements.lightning},
				84:{name: "Shiva", topValue: 6, bottomValue: 4, leftValue: 9, rightValue: 7, numCopy: 1, element: elements.ice},
				85:{name: "Ifrit", topValue: 9, bottomValue: 2, leftValue: 8, rightValue: 6, numCopy: 1, element: elements.fire},
				86:{name: "Siren", topValue: 8, bottomValue: 6, leftValue: 2, rightValue: 9, numCopy: 1, element: elements.none},
				87:{name: "Sacred", topValue: 5, bottomValue: 9, leftValue: 9, rightValue: 1, numCopy: 1, element: elements.earth},
				88:{name: "Minotaur", topValue: 9, bottomValue: 2, leftValue: 9, rightValue: 5, numCopy: 1, element: elements.earth},
				// level 9 guardian forces 
				89:{name: "Carbuncle", topValue: 8, bottomValue: 10, leftValue: 4, rightValue: 4, numCopy: 1, element: elements.none},
				90:{name: "Diablos", topValue: 5, bottomValue: 8, leftValue: 3, rightValue: 10, numCopy: 1, element: elements.none},
				91:{name: "Leviathan", topValue: 7, bottomValue: 1, leftValue: 7, rightValue: 10, numCopy: 1, element: elements.water},
				92:{name: "Odin", topValue: 8, bottomValue: 3, leftValue: 5, rightValue: 10, numCopy: 1, element: elements.none},
				93:{name: "Pandemona", topValue: 10, bottomValue: 7, leftValue: 7, rightValue: 1, numCopy: 1, element: elements.wind},
				94:{name: "Cerberus", topValue: 7, bottomValue: 6, leftValue: 10, rightValue: 4, numCopy: 1, element: elements.none},
				95:{name: "Alexander", topValue: 9, bottomValue: 4, leftValue: 2, rightValue: 10, numCopy: 1, element: elements.holy},
				96:{name: "Phoenix", topValue: 7, bottomValue: 7, leftValue: 10, rightValue: 2, numCopy: 1, element: elements.fire},
				97:{name: "Bahamut", topValue: 10, bottomValue: 2, leftValue: 6, rightValue: 8, numCopy: 1, element: elements.none},
				98:{name: "Doomtrain", topValue: 3, bottomValue: 10, leftValue: 10, rightValue: 1, numCopy: 1, element: elements.poison},
				99:{name: "Eden", topValue: 4, bottomValue: 9, leftValue: 10, rightValue: 4, numCopy: 1, element: elements.none},
				// level 10 characters
				100:{name: "Ward", topValue: 10, bottomValue: 2, leftValue: 8, rightValue: 7, numCopy: 1, element: elements.none},
				101:{name: "Kiros", topValue: 6, bottomValue: 6, leftValue: 10, rightValue: 7, numCopy: 1, element: elements.none},
				102:{name: "Laguna", topValue: 5, bottomValue: 3, leftValue: 9, rightValue: 10, numCopy: 1, element: elements.none},
				103:{name: "Selphie", topValue: 10, bottomValue: 6, leftValue: 4, rightValue: 8, numCopy: 1, element: elements.none},
				104:{name: "Quistis", topValue: 9, bottomValue: 10, leftValue: 2, rightValue: 6, numCopy: 1, element: elements.none},
				105:{name: "Irvine", topValue: 2, bottomValue: 9, leftValue: 10, rightValue: 6, numCopy: 1, element: elements.none},
				106:{name: "Zell", topValue: 8, bottomValue: 10, leftValue: 6, rightValue: 5, numCopy: 1, element: elements.none},
				107:{name: "Rinoa", topValue: 4, bottomValue: 2, leftValue: 10, rightValue: 10, numCopy: 1, element: elements.none},
				108:{name: "Edea", topValue: 10, bottomValue: 3, leftValue: 3, rightValue: 10, numCopy: 1, element: elements.none},
				109:{name: "Seifer", topValue: 6, bottomValue: 10, leftValue: 4, rightValue: 9, numCopy: 1, element: elements.none},
				110:{name: "Squall", topValue: 10, bottomValue: 6, leftValue: 9, rightValue: 4, numCopy: 1, element: elements.none}
				
			}
	
};
		
		
		
		// Initialize deck object (CardArray global variable)
		TTDeck(CardArray);
	}
	
	function startGame() {
		// Prints out which cards the user has, and how many
		testingFunction();
		
		// Start playing background music
		soundBg();
		
		// Draw background
		drawBg();
		
		// Initialize Selector (finger)
		selector1 = new Selector();
		
		// Event listeners
		document.addEventListener('keydown',checkKeyDown,false);
		document.addEventListener('keyup',checkKeyUp,false);
		
		// Start Updating
		startUpdating();
		
		return $.Deferred(function (def) {
			$.when(deferrer).done(function () {
				def.resolve();
			});
		});
	}
	
	function privateFunction() {
		// this function can't be called from outside this module
	}
	
	function initRuleSelect() {
		drawBg();
		gameState = gameStates.RuleSelect;
		var srcX = 0;
		var srcY = 0;
		var drawX = 112;
		var drawY = 32;
		var width = 160;
		var height = 144;
		ctxBg.drawImage(imgBoxRules,srcX,srcY,width,height,drawX*widthScale,drawY*heightScale,width*widthScale,height*heightScale);
		
		var textPosX = 120;
		var textPosY = 48;
		ctxBg.font="24px Georgia";
		ctxBg.textAlign = "left";
		ctxBg.fillStyle = "white"; 
		ctxBg.strokeStyle = "white"; 
		ctxBg.fillText("Hello " + playerName + "!",	textPosX*widthScale,textPosY*heightScale);
		ctxBg.fillText("Rules:",					textPosX*widthScale,textPosY+52*heightScale);
		ctxBg.fillText("* Random",					textPosX*widthScale,textPosY+64*heightScale);
		ctxBg.fillText("* No Elemental",			textPosX*widthScale,textPosY+76*heightScale);
		ctxBg.fillText("* Trade Rule: One",			textPosX*widthScale,textPosY+88*heightScale);
		ctxBg.fillText("Press Enter to Play!",		textPosX*widthScale,textPosY+112*heightScale);
	}

	function initGame() {
		gameState = gameStates.Game;
		
		// Take cards from deck CardArray and put into hands
		setPlayerHand();
		setEnemyHand();
		
		// Animate cards flowing into hands (later)
		
		// Initialize board drawing coordinates
		drawingCoordinates();
		
		// Determine if player or enemy goes first
		whoGoesFirst();
	}

	function clearGameScreen() {
		ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
		drawTradingBg();
		
		initCardTrade();
	}

	function initCardTrade() {
		gameState = gameStates.CardTrade;
		
		cardTradeDrawingCoordinates();
		
		selector1.select = false;
		selector1.board = false;
		selector1.trading = true;
		selector1.locX = 0;
		selector1.locY = 0;	
		if (playerScore > enemyScore) {
			selector1.playerHand = true;
		} else {
			selector1.playerHand = false;
		}
	}

	function setPlayerHand() {
		// Randomly takes five cards from the main deck
		// and assigns cards to player's hand
		
		/*var max = CardArray.length; max--;
		var rand = Math.floor((Math.random() * max));
		
		for (var i = 0; i < 5; i++) {
			playerCards[i] = TTDraw(rand);
			max--;
			rand = Math.floor((Math.random() * max));
			playerDeck[i] = playerCards[i];
		}*/
		
		//testingFunction();
		if (!offline) {
			var count = 0;
			var stop = false;
			var i = 0;
			
			var card = CardEnum;
			console.log("Player Hand:");
			console.log("");
			
			/*var test = [];
			
			for (var key in monsterData) {
				//test[i] = key;
				test.push(key);
				//Array.push(c);
			}
			
			var i = 0;
			
			console.log(test[1]);
			console.log(test[2]);*/
			
			for (var key in monsterData) {
				if (i > 110 || count > 4) {
					//stop = true;
				} else if (i > 0) {
					console.log("Key: " + key);
					console.log("Key information: " + monsterData[key]);
					console.log("Card " + i + ": " + card.properties[i].name);
					//if (key == card.properties[i].name) {
					if (monsterData[key] > 0) {
						console.log("Add card to hand: " + key);
						count++;
						//playerCards[i] = TTDraw(i-count);
						var temp = TTDraw(i-count);
						playerCards.push(temp);
						//playerDeck[i] = playerCards[i];
						playerDeck.push(temp);
						console.log("End card");
					}
					i++;
				} else { i++; }
			}
			
			console.log("Print final hand:");
			
			for (var i = 0; i < 5; i++) {
				console.log("Card " + i + ": " + playerCards[i].name);
			}
			
			
			/*var card = CardEnum;
			
			// length of enum
			var keys = Object.keys(card);
			// CardArray is a global array
			//var CardArray = [];
			//alert(keys.length);
			for (var i = 1;i<keys.length;i++){
				
				var c = new TTCard(card.properties[i].name,card.properties[i].topValue,card.properties[i].bottomValue,card.properties[i].leftValue,card.properties[i].rightValue, card.properties[i].numCopy, card.properties[i].element,i);
				c.srcCoordinates(i);
				Array.push(c);
			}*/
			
			//monsterData is list of cards
			/*for (var key in monsterData) {
					if (monsterData[key] > 0) {
						console.log(key + ": " + monsterData[key]);
					}
				}*/
			
			/*var stop = false;
			var i = 1;
			while (!stop) {
				if (
			}
			
			playerCards[i] = CardArray[index];
			
			playerCards[i] = 
			
			var card = CardEnum;
			
			// length of enum
			var keys = Object.keys(card);
			// CardArray is a global array
			//var CardArray = [];
			//alert(keys.length);
			for (var i = 1;i<keys.length;i++){
				
				var c = new TTCard(card.properties[i].name,card.properties[i].topValue,card.properties[i].bottomValue,card.properties[i].leftValue,card.properties[i].rightValue, card.properties[i].numCopy, card.properties[i].element,i);
				c.srcCoordinates(i);
				Array.push(c);
			}*/
			
		} else {
			//offline, so make random cards in hands
			
			// took the following lines of code from setEnemyHand, changing booleans to 'true',
			// to just give player a random set of 5
			var max = CardArray.length; max--;
			var rand = Math.floor((Math.random() * max));
			
			for (var i = 0; i < 5; i++) {
				playerCards[i] = TTDraw(rand);
				playerCards[i].player = true;
				playerCards[i].front = true;
				max--;
				rand = Math.floor((Math.random() * max));
				playerDeck[i] = playerCards[i];
				console.log("Player Card " + i + ": " + playerCards[i].name);
			}
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
			enemyDeck[i] = enemyCards[i];
			console.log("Enemy Card " + i + ": " + enemyCards[i].name);
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

	function cardTradeDrawingCoordinates() {
		// Initializes the coordinates for drawing each card

		// player cards
		playerDeck[0].drawX = tradeCol0;
		playerDeck[1].drawX = col1;
		playerDeck[2].drawX = col2;
		playerDeck[3].drawX = col3;
		playerDeck[4].drawX = tradeCol4;
		
		playerDeck[0].drawY = tradeRow1;
		playerDeck[1].drawY = tradeRow1;
		playerDeck[2].drawY = tradeRow1;
		playerDeck[3].drawY = tradeRow1;
		playerDeck[4].drawY = tradeRow1;
		
		for (var i = 0; i < 5; i++) {
			playerDeck[i].origDrawX = playerDeck[i].drawX;
			playerDeck[i].origDrawY = playerDeck[i].drawY;
		}
		
		// enemy cards
		enemyDeck[0].drawX = tradeCol0;
		enemyDeck[1].drawX = col1;
		enemyDeck[2].drawX = col2;
		enemyDeck[3].drawX = col3;
		enemyDeck[4].drawX = tradeCol4;
		
		enemyDeck[0].drawY = tradeRow0;
		enemyDeck[1].drawY = tradeRow0;
		enemyDeck[2].drawY = tradeRow0;
		enemyDeck[3].drawY = tradeRow0;
		enemyDeck[4].drawY = tradeRow0;
		
		for (var i = 0; i < 5; i++) {
			enemyDeck[i].origDrawX = enemyDeck[i].drawX;
			enemyDeck[i].origDrawY = enemyDeck[i].drawY;
			enemyDeck[i].front = true;
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
			} else if (selector1.select && selector1.board && !selector1.playerHand
						&& boardCards[selector1.locX][selector1.locY].index != null) {
				// if selecting a place on the board where there is already a card
				selector1.select = false;
				CursorWrong.play();
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
		var n = Math.floor((Math.random() * 2)); // 0-1
		
		if (n == 0) {
			playerTurn = true;
			enemyTurn = false;
		} else if (n == 1) {
			playerTurn = false;
			enemyTurn = true;
		}
	}

	function offlineFunction() {
		playerName = "OfflineUser";
		monsterData = data;
	}
	
	// end game logic functions






	// TTCard functions

	// card object to represent a monster/character/GF card
	// name = name of card, top,bottom,left,right are the card's strength corresponding to 
	// the 4 values on the card, and numCopy = the number of copies of the same card you have in the deck
	function TTCard(name,top,bottom,left,right,numCopy,element,index){
		this.name = name;
		this.top = top;
		this.bottom = bottom;
		this.left = left;
		this.right = right;
		this.numCopy = numCopy;
		this.element = element;
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
		this.numberScale = 1;
		
		this.player = true; 		// either player or enemy
		this.front = true;			// display front or back of card
		this.flipHori = false;		// horizontal flip
		this.flipVert = false;		// vertical flip
		this.shrink = false;		// used for flipping
		this.fall = false;			// fall onto board
		this.tradeAnim = false;		// trading animations at end of game
	}

	// Deck to hold cards
	// will fix this later. 
	// in the process of testing for iteration through the enum, card object, get name, top,bottom,left, right values
	// array to hold all the cards, so far it seems to work notice the name of the cards and value
	function TTDeck(Array){
		var card = CardEnum;
		
		// length of enum
		var keys = Object.keys(card);
		// CardArray is a global array
		//var CardArray = [];
		//alert(keys.length);
		for (var i = 1;i<keys.length;i++){
			
			var c = new TTCard(card.properties[i].name,card.properties[i].topValue,card.properties[i].bottomValue,card.properties[i].leftValue,card.properties[i].rightValue, card.properties[i].numCopy, card.properties[i].element,i);
			c.srcCoordinates(i);
			Array.push(c);
		}
		//var c = new TTCard(card.properties[1].name,card.properties[1].topValue,card.properties[1].bottomValue,card.properties[1].leftValue,card.properties[1].rightValue);
		//alert("the name of the first card is: " + name.name +", top value: " + name.top + ", bottom value: " + name.bottom + ", left value: "+name.left + ", right value: " + name.right + " the number of copy current: " + name.numCopy );
		//alert("name: " +name.name);
		//alert(CardArray[0].name+" top value: " + CardArray[0].top);// Geezard 1st card
		//alert(CardArray[1].name+" top value: " + CardArray[1].top);// Funguar 2nd card 
		//alert(CardArray[109].name+" top value: " + CardArray[109].top);// Squall last card 
		
		return Array;
		
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
			
			this.drawNumbers();
		} else {
			// Draw card's back
			ctxBg.drawImage(cardSheet,64*26,64*3,this.width,this.height,
						this.drawX,this.drawY,this.width*this.widthScale,this.height*this.heightScale);
		}
		
	};

	TTCard.prototype.drawNumbers = function () {
	
		var scaleX = 13 * widthScale; scaleX *= this.numberScale;
		var scaleY = 10.5 * heightScale; scaleY *= this.numberScale;
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
		
		// Draw Element
		if (this.element != elements.none) {
			x = 0;
			y = 0;
			col1 = this.drawX + (this.widthScale*40);
			row1 = this.drawY + (this.heightScale*2);
			scaleX *= 1.5;
			scaleY *= 2;
			
			if (this.element == elements.earth) {
				x = 0; y = 0;
			} else if (this.element == elements.fire) {
				x = 21; y = 0;
			} else if (this.element == elements.holy) {
				x = 21*2; y = 0;
			} else if (this.element == elements.ice) {
				x = 21*3; y = 0;
			} else if (this.element == elements.lightning) {
				x = 0; y = 21;
			} else if (this.element == elements.poison) {
				x = 21; y = 21;
			} else if (this.element == elements.water) {
				x = 21*2; y = 21;
			} else if (this.element == elements.wind) {
				x = 21*3; y = 21;
			} else {  }
			
			ctxBg.drawImage(imgElements, x, y, 21, 21, col1, row1, scaleX, scaleY);
		}
		
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
			
			//72 * heightScale is slightly longer than card height
			
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
		} else if (this.tradeAnim) {
			// move up off of screen, then down into board
			fallInt = 2 * heightScale;
			animating = true;
			
			//72 * heightScale is slightly longer than card height
			
			if (this.drawY > -(72 * heightScale) && this.fall == false) {
				this.drawY -= fallInt;
				if (this.drawY <= -(72 * heightScale)) {
				
					// double size and center on screen
					this.widthScale*=2;
					this.heightScale*=2;
					this.numberScale*=2;
					this.drawX = gameWidth/2 - this.width*widthScale;
					this.fall = true;
					this.player = !this.player;
				}
			} else if (this.fall == true) {
				this.drawY += fallInt;
				if (this.drawY >= (gameHeight/2 - this.height*heightScale)) {
					this.drawY = gameHeight/2 - this.height*heightScale;
					this.fall = false;
					this.tradeAnim = false;
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
					SavePoint.play();
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
					SavePoint.play();
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
					SavePoint.play();
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
					SavePoint.play();
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
		this.element	= card.element;
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

		if (gameState == gameStates.Init) {
			// game initialized, go to select rules
			initRuleSelect();
		} else if (gameState == gameStates.RuleSelect) {
			if (isEnterKey) {
				initGame();
				isEnterKey = false;
			}
		} else if (gameState == gameStates.Game) {
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
			}
			
			if (!animating && isGameOver) {
				drawGameOver();
				if (isEnterKey) {
					clearGameScreen();
				}
			}
		} else if (gameState == gameStates.CardTrade) {
			ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
			
			drawTradingBg();
			
			drawTradeCards();
			
			if (playerScore > enemyScore) {
			
				selector1.draw();
				
				checkKeys();
				
				if (selector1.select) {
					chosenCard = enemyDeck[selector1.locX];
					selector1.trading = false;
					chosenCard.tradeAnim = true;
					drawAcquireCardBox(chosenCard);
					updateTradeCards();
					gameState = gameStates.Finish;
				}
			} else if (enemyScore > playerScore) {
				var selection = Math.floor((Math.random() * 5)); // 0-4
				chosenCard = playerDeck[selection];
				chosenCard.tradeAnim = true;
				drawAcquireCardBox(chosenCard);
				updateTradeCards();
				gameState = gameStates.Finish;
			} else {
				gameState = gameStates.Finish;
			}
		} else if (gameState == gameStates.Finish) {
			// GAME ENDS HERE
			
			// if tie, do NOTHIN 
			
			
				ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
				
				drawTradingBg();
			
			if (playerScore == enemyScore) {
				
			} else {
				
				drawAcquireCardBox(chosenCard);
				
				updateTradeCards();
			}
			if (!animating) {
				deferrer.resolve();
			}
		} else {}
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

	function drawTradeCards() {
		for (i = 0; i < playerDeck.length; i++) {
			playerDeck[i].draw();
		}
		for (i = 0; i < enemyDeck.length; i++) {
			enemyDeck[i].draw();
		}
	}

	function updateTradeCards() {
		for (i = 0; i < playerDeck.length; i++) {
			if (playerDeck[i] != null) {
				playerDeck[i].draw();
				playerDeck[i].update();
			}
		}
		
		for (i = 0; i < enemyDeck.length; i++) {
			if (enemyDeck[i] != null) {
				enemyDeck[i].draw();
				enemyDeck[i].update();
			}
		}
		
		chosenCard.draw();
		chosenCard.update();
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

	function drawTradingBg() {
		var srcX = 0;
		var srcY = 0;
		var drawX = 0;
		var drawY = 0;
		ctxBg.drawImage(imgTradingBg,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth*widthScale,gameHeight*heightScale);
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

	function drawInfoBoxBottom(text) {
		// Draws info box at bottom of screen,
		// shows card name
		var srcX = 0;
		var srcY = 0;
		var drawX = 104;
		var drawY = 184;
		var width = 176;
		var height = 32;
		
		ctxBg.drawImage(imgBoxInfo,srcX,srcY,width,height,drawX*widthScale,drawY*heightScale,width*widthScale,height*heightScale);
		
		ctxBg.font="32px Georgia";
		ctxBg.textAlign = "center";
		ctxBg.fillStyle = "white"; 
		ctxBg.strokeStyle = "white"; 
		ctxBg.fillText(text,192*widthScale,204*heightScale);
	}

	function drawInfoBoxTop(text) {
		// Draws info box at top of screen,
		// shows card name
		var srcX = 0;
		var srcY = 0;
		var drawX = 76;
		var drawY = 8;
		var width = 232;
		var height = 32;
		
		ctxBg.drawImage(imgBoxTradeInfo,srcX,srcY,width,height,drawX*widthScale,drawY*heightScale,width*widthScale,height*heightScale);
		
		ctxBg.font="32px Georgia";
		ctxBg.textAlign = "center";
		ctxBg.fillStyle = "white"; 
		ctxBg.strokeStyle = "white"; 
		ctxBg.fillText(text,192*widthScale,28*heightScale);
	}

	function drawAcquireCardBox(card) {
		drawInfoBoxTop(card.name + " Card acquired");
	}
	
	function drawGameOver() {
		var srcX = 0;
		var srcY = 0;
		var width = 256;
		var height = 50;
		var drawX = width/4;
		var drawY = height*2;
		
		//alert('game over');
		if (playerScore > enemyScore) {
			//alert('Player won!');
			srcY = 0;
		} else if (playerScore < enemyScore){
			//alert('Enemy won!');
			srcY = 50;
		} else {
			//alert('Tie game!');
			srcY = 100;
		}
		
		//imgGameOver
		if (!animating) {
			ctxBg.drawImage(imgGameOver,srcX,srcY,width,height,drawX*widthScale,drawY*widthScale,width*widthScale,height*heightScale);
		}
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
		this.trading = false;
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
		} else if (this.trading) {
			// draw selection square beside selector
			selX = enemyDeck[this.locX].drawX; selX -= (4 * widthScale);
			selY = enemyDeck[this.locY].drawY; selY -= (4 * heightScale);
			ctxBg.drawImage(imgSelection,this.srcX,this.srcY,gameWidth,gameHeight,
						selX,selY,gameWidth*widthScale,gameHeight*heightScale);
		}
	}

	Selector.prototype.hoverboard = function() {
		// hover selector above board, move with arrow keys, select place for card
		
		if (this.playerHand && !this.trading ) {
			// just up and down keys
			//locX = 0
			//locY = 0 to 5
			
			this.drawX = col4 - (32 * widthScale);
			
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
				drawInfoBoxBottom(playerCards[this.locY].name);
			}
			
		} else if (this.board) {
			
			// X location
			if (this.locX == 0) {
				this.drawX = col1 - (32 * widthScale);
			} else if (this.locX == 1) {
				this.drawX = col2 - (32 * widthScale);
			} else if (this.locX == 2) {
				this.drawX = col3 - (32 * widthScale);
			} else {}
			
			// Y location
			if (this.locY == 0) {
				this.drawY = row0 + (16 * heightScale);
			} else if (this.locY == 1) {
				this.drawY = row2 + (16 * heightScale);
			} else if (this.locY == 2) {
				this.drawY = row4 + (16 * heightScale);
			} else {}
			
		} else if (this.trading && this.playerHand) {
			//during trading at end of game
			
			this.drawY = tradeRow0+(16*heightScale);
			
			// X location
			if (this.locX == 0) {
				this.drawX = tradeCol0-(30*widthScale);
			} else if (this.locX == 1) {
				this.drawX = col1-(30*widthScale);
			} else if (this.locX == 2) {
				this.drawX = col2-(30*widthScale);
			} else if (this.locX == 3) {
				this.drawX = col3-(30*widthScale);
			} else if (this.locX == 4) {
				this.drawX = tradeCol4-(30*widthScale);
			}
			
			drawInfoBoxBottom(enemyDeck[this.locX].name);
			drawInfoBoxTop("Select 1 card you want");
			
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
		if (this.playerHand && !this.trading) {
			if (this.locY < 4) {
				this.locY++;
			}
		} else if (this.board) {
			if (this.locY < 2) {
				this.locY++;
			}
		} else if (this.trading) {
			
		}
	}

	Selector.prototype.moveLeft = function() {
		if (this.board || this.trading) {
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
		} else if (this.trading) {
			if (this.locX < 4) {
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
		if (isEnterKey) {
			//isEnterKey = false;
		}
		if (isSpacebarKey) {
			selector1.select = true;
			isSpacebarKey = false;
		}
		if (isUpKey) {
			selector1.moveUp();
			CursorMove.play();
			isUpKey = false;
		} 
		if (isRightKey) {
			selector1.moveRight();
			CursorMove.play();
			isRightKey = false;
		}
		if (isDownKey) {
			selector1.moveDown();
			CursorMove.play();
			isDownKey = false;
		}
		if (isLeftKey) {
			selector1.moveLeft();
			CursorMove.play();
			isLeftKey = false;
		}
	}

	function checkKeyDown(e) {
		var keyID = e.keyCode || e.which;
		if (lastKey && lastKey.keyCode == e.keyCode) {
			return;
		}
		if (keyID === 13 && animating == false) { // Enter
			isEnterKey = true;
			lastKey = e;
			e.preventDefault();
		}
		if (keyID === 32 && animating == false) { // spacebar
			isSpacebarKey = true;
			lastKey = e;
			e.preventDefault();
		}
		if (keyID === 38 && animating == false) { // up arrow
			//alert('up arrow was pressed');
			isUpKey = true;
			lastKey = e;
			e.preventDefault();
		}
		if (keyID === 39 && animating == false) { // right arrow
			isRightKey = true;
			lastKey = e;
			e.preventDefault();
		}
		if (keyID === 40 && animating == false) { // down arrow 
			isDownKey = true;
			lastKey = e;
			e.preventDefault();
		}
		if (keyID === 37 && animating == false) { // left arrow
			isLeftKey = true;
			lastKey = e;
			e.preventDefault();
		}
	}

	function checkKeyUp(e) {
		var keyID = e.keyCode || e.which;
		if (keyID === 13) { // Enter
			isEnterKey = false;
			lastKey = null;
			e.preventDefault();
		}if (keyID === 32) { // spacebar
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


	
	
	// Any functions and/or variables
	
	function getPlayerScore() { return playerScore; }
	function getEnemyScore() { return enemyScore; }
	function getChosenCard() { return chosenCard; }
	
	function testcom(){
		var card = [];
		TTDeck(card);
		return card;
	}
	
	function getCardArray() {
		return CardArray;
	}
	
	function getRandomSet(n) {
		//returns a list of names of random cards to give to a new user
		//n is number of random cards
		randomSet = [];
		randomCards = [];
		
		for (var i = 1; i < 111; i++) {
			randomSet.push(i);
		}
		
		shuffle(randomSet);
		for (var i = 0;i<n;i++){
			randomCards[i] = CardEnum.properties[randomSet.pop()].name;
		}
		
		return randomCards;
		
	}
	
	function shuffle(v) {
		for(var j, x, i = v.length; i; j = parseInt(Math.random() * i),
		x = v[--i], v[i] = v[j], v[j] = x);
		return v;
	};
	
	function testingFunction() {
			console.log("Printing from game.js");
			console.log("Cards that " + playerName + ", userID of " + monsterData.userID + " currently has:");
			//console.log("userID:   " + data.userID);
			//console.log("Geezard:  " + data.Geezard);
			//console.log(data);
			/*for (var key in data) {
			  console.log(key);
			}*/
			for (var key in monsterData) {
				if (monsterData[key] > 0) {
					console.log(key + ": " + monsterData[key]);
				}
			}
		}
	
	var exported = {
		"init":init,
		"startGame": startGame,
		"getPlayerScore": getPlayerScore,
		"getEnemyScore": getEnemyScore,
		"getChosenCard": getChosenCard,
		"testcom" : testcom,
		"getCardArray" : getCardArray,
		"getRandomSet" : getRandomSet
	};
	
	return exported;
};

