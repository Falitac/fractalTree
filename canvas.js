'use strict'
var canvas = document.querySelector('.cnv');
var context = canvas.getContext('2d');
var lengthSlider = document.querySelector('#length');
var angleSlider1 = document.querySelector('#angle-diff1');
var angleSlider2 = document.querySelector('#angle-diff2');

var length;
var angleDiff1;
var angleDiff2;
function drawLine(x1, y1, x2, y2) {
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
}

function drawTree(size, x, y, angle) {
	if(size>0.5)
	{
		var x2 = x+size*Math.cos(angle);
		var y2 = y+size*Math.sin(angle);
		context.strokeStyle = 'hsl('+100+', 70%, 60%)'
		drawLine(x, y, x2, y2);
		drawTree(size*0.67, x2, y2, angle-angleDiff1);
		drawTree(size*0.67, x2, y2, angle+angleDiff2);
	}
}

function mainLoop() {
  context.clearRect(0,0,canvas.width, canvas.height);
  draw();
  requestAnimationFrame(mainLoop);
}

function init() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	context.lineWidth = 1;
}


function draw() {
	length = lengthSlider.value/10;
	angleDiff1 = angleSlider1.value*Math.PI/1800;
	angleDiff2 = angleSlider2.value*Math.PI/1800;
	context.beginPath();
	drawTree(length, canvas.width/2, canvas.height, -Math.PI/2);
	context.closePath();
	context.stroke();
}

init();
mainLoop();