/************************

THE SHITTIEST PROTOTYPE:

* Difficulty Slider
* Hit detection

************************/

/////////////////////
// HELPERS //////////
/////////////////////

Math.TAU = Math.PI*2;
function $(query){
	return document.querySelector(query); // the Poor Man's jQuery
}

var SPACE_IS_DOWN = false;
window.onkeydown = function(e){
	if(e.keyCode==32) SPACE_IS_DOWN=true;
};
window.onkeyup = function(e){
	if(e.keyCode==32) SPACE_IS_DOWN=false;
};

/////////////////////
// UI ///////////////
/////////////////////

var difficultySlider = $("#difficulty");
var canvas = $("#canvas");
var ctx = canvas.getContext("2d");
ctx.scale(2,2);

var player = {
	x:100,
	y:200,
	vel:0
};
var PLAYER_SIZE = 10;
var GRAVITY = 0.5;
var BOOST = -GRAVITY*2;
var MAX_VEL = 3;
var X_SPEED = 3;

var obstacles = [];

/////////////////////
// LOOP /////////////
/////////////////////

var skill = 0;
var BEEN_HIT = 0;

function loop(){

	// PLAYER PHYSICS
	player.y += player.vel;
	player.vel += GRAVITY;
	if(SPACE_IS_DOWN){
		player.vel += BOOST;
	}

	if(player.vel<-MAX_VEL) player.vel=-MAX_VEL;
	if(player.vel>MAX_VEL) player.vel=MAX_VEL;
	
	if(player.y < PLAYER_SIZE){
		player.y = PLAYER_SIZE;
		player.vel = 0;
	}
	if(player.y > 400-PLAYER_SIZE){
		player.y = 400-PLAYER_SIZE;
		player.vel = 0;
	}

	// OBSTACLES
	var difficulty = parseFloat(difficultySlider.value);
	if(Math.random() < difficulty*0.25){
		obstacles.push({
			x:400+PLAYER_SIZE,
			y:PLAYER_SIZE + Math.random()*(400-PLAYER_SIZE*2)
		});
	}
	for(var i=obstacles.length-1; i>=0; i--){ // reverse coz deleting
		var o = obstacles[i];
		o.x -= X_SPEED;

		// IF PAST SCREEN, DELETE
		if(o.x<-PLAYER_SIZE){
			obstacles.splice(i,1);
		}

		// IF HIT PLAYER, SHOW IT
		if(o.x-PLAYER_SIZE < player.x+PLAYER_SIZE // my left < player right
			&& player.x-PLAYER_SIZE < o.x+PLAYER_SIZE  // player left < my right
			&& o.y-PLAYER_SIZE < player.y+PLAYER_SIZE // my top < player bottom
			&& player.y-PLAYER_SIZE < o.y+PLAYER_SIZE){  // player top < my bottom
			BEEN_HIT = 1;
		}

	}

	/////////////////////////////////////////
	/////////////////////////////////////////
	/////////////////////////////////////////

	// CLEAR
	ctx.clearRect(0, 0, 400, 400);

	// DRAW BACKGROUND
	ctx.save();
	ctx.globalAlpha = BEEN_HIT;
	BEEN_HIT *= 0.9;
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(0,0,400,400);
	ctx.restore();

	// DRAW PLAYER
	ctx.fillStyle = "#fff";
	ctx.fillRect(player.x-PLAYER_SIZE, player.y-PLAYER_SIZE, PLAYER_SIZE*2, PLAYER_SIZE*2);

	// DRAW OBSTACLES
	for(var i=0; i<obstacles.length; i++){
		var o = obstacles[i];
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(o.x-PLAYER_SIZE, o.y-PLAYER_SIZE, PLAYER_SIZE*2, PLAYER_SIZE*2);
	}

	// loop
	window.requestAnimationFrame(loop);

}
loop();