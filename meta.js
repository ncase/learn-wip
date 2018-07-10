/************************

THE SHITTIEST PROTOTYPE:

* Two sliders
* PHASE DIAGRAM

************************/

/////////////////////
// HELPERS //////////
/////////////////////

Math.TAU = Math.PI*2;
function $(query){
	return document.querySelector(query); // the Poor Man's jQuery
}

/////////////////////
// UI ///////////////
/////////////////////

var skillSlider = $("#skill");
var difficultySlider = $("#difficulty");
var flowCanvas = $("#flow");
var ctx = flowCanvas.getContext("2d");

var OPTIMAL_DIFFERENCE = 0.1;
var GROWING_SPEED = 0.001;

// The FLOW ZONE
ctx.fillStyle = "hsla(35, 100%, 70%, 0.5)";
ctx.beginPath();
ctx.moveTo(0, 800);
ctx.lineTo(800, 0);
var zoneWidth = 2*OPTIMAL_DIFFERENCE*800;
ctx.lineTo(800, zoneWidth);
ctx.lineTo(zoneWidth, 800);
ctx.fill();


/////////////////////
// LOOP /////////////
/////////////////////

var skill = 0;

function loop(){

	// Growth?
	var difficulty = parseFloat(difficultySlider.value);
	var d = difficulty - skill;
	d = (d-OPTIMAL_DIFFERENCE)/OPTIMAL_DIFFERENCE; // 0 -> -1, 0D -> 0, 20D -> 1
	var growth = 1 - (d*d); // -1 -> 0, 0 -> 1, 1 -> 0
	if(growth<-1) growth=-1;
	growth = growth*GROWING_SPEED;
	skill += growth;
	if(skill<0) skill=0;
	if(skill>1) skill=1;

	// UI
	skillSlider.value = skill;

	// DRAW ON CANVAS
	var x = difficultySlider.value*800;
	var y = 800 - skillSlider.value*800;
	ctx.fillStyle = "#ff4040";
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.TAU);
	ctx.fill();

	// loop
	window.requestAnimationFrame(loop);

}
loop();