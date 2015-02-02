var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var clearCanvasBtn = document.getElementById('clearCanvasBtn');
var restoreCanvasBtn = document.getElementById('restoreCanvasBtn');
clearCanvasBtn.addEventListener('click',clearCanvas,false);
restoreCanvasBtn.addEventListener('click',restoreCanvas,false);

var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;

var imgSprite = new Image();
imgSprite.src = 'images/TTBOARD.png';
imgSprite.addEventListener('load',drawBg,false);
// srcX and srcY are the initial coordinates of the background image, usually (0,0)
// the background will be drawn from srcX and srcY to gameWidth and gameHeight
// this is the dimension of the background image
// drawX and drawY are coordinates to tell where to begin to the sprite and gameWidth and gameHeight
// are coordinates where it will end.  
function drawBg(){
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	ctxBg.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}

function clearCanvas(){
	ctxBg.clearRect(0,0,722,762);
}

function restoreCanvas() {
	var srcX = 0;
	var srcY = 0;
	var drawX = 0;
	var drawY = 0;
	ctxBg.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}