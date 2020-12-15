// Name: Sivly Lay
// Email: Sivly_Lay@student.uml.edu
// Affiliation: Computer Science Student at Umass Lowell in course 91.61 GUI Programming I
// Date: Dec 7, 2020
// Assignment: HW8
// Description: implementing part of the Scrabble Game with Drag and Drop Jquery 

// copied and modify from Blackboard json file provided by the hw8
pieces = [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":6},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1},
	{"letter":"_", "value":0, "amount":2}
];

//global variables
var remainingTiles = 100; // total of tiles from beginning is 100
var totalScore = 0; // keep track of total score after each round
var allGeneratedTiles = new Array(); //store all the generated tiles
var tileIdCount = 0; //number of tiles have been generated used for adding to id

// https://learn.jquery.com/using-jquery-core/selecting-elements/
// https://api.jquery.com/attribute-starts-with-selector/
// https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates
// https://jqueryui.com/droppable/
$(document).ready(function() {

	//set up the board and the rack to be droppable 
	$("[id^='tileBoard']").droppable({
        drop: function( event, ui) {
          $("#"+ui.draggable.attr("id")).css({top: $(this).position().top, left: $(this).position().left, position:'absolute'});;
        },
    });
    $(".rack").droppable();

    // generate 7 tiles to the rack at the start of the game
    for(var i= 0; i < 7; i++) {
    	var letter = generateRandomTile();
    	allGeneratedTiles.push(letter);
    }


});


// Generate random tile based on the amount of letters left 
// https://www.w3schools.com/jsref/met_loc_reload.asp
// https://www.w3schools.com/jsref/jsref_random.asp
function generateRandomTile() {

	// randomly select a number between 0 to 26
	var indexLetter = Math.floor(Math.random() * 26) + 0;

	// remainingTiles has to been greater than 6 
	// in order to regenerate tiles bc
	// tile starts generate from i=0 to i=6 
	// and remainingTiles starts from 1 and forward
	if(remainingTiles >= 7) {

		// check if the letter got picked has amount of letter left
		// else recusively call itself again till it finds a letter with amount left
		if(pieces[indexLetter].amount > 0){
			pieces[indexLetter].amount--;
			addTile(pieces[indexLetter]);
			$("#remainingTiles").text(remainingTiles);
			return pieces[indexLetter];
		} else { 
			return generateRandomTile();
		}
	} else if( remainingTiles == 0 ){

		// there are no more tiles left to play, 
		// show the dialog with the total score and the game will restart 
		$("#dialogContent").html("Total Score: " + totalScore + "<br>The game will restart!");

		$("#dialog").dialog({
			title: "Game Over",
			dialogClass: "no-close",
			show: true,
			modal: true,
			buttons: {
				Ok: function() {
					location.reload();
				}
			}

		});
	}


}

// add the tile that got generated to the rack
// https://jqueryui.com/draggable/
function addTile(tile) {

	if (tile.letter == "_") {
    	$('div.rack').append("<span id='tile" + tileIdCount + "'> <img src='images/Scrabble_Tiles/Scrabble_Tile_Blank.jpg' width='75px' height='75px'></span>");
  	}
  	else{
    	$('div.rack').append("<span id='tile" + tileIdCount + "'> <img src='images/Scrabble_Tiles/Scrabble_Tile_" + tile.letter + ".jpg' width='75px' height='75px'></span>");
  	}

  	// make the tile adds to the rack draggable
  	// when it stop dragging, try to calculate the score
  	$('#tile'+tileIdCount).draggable({
  		snap: "[id^='tileBoard']",
  		revert: "invalid",
  		snapTolerance: 5,
  		stop: function(event, ui) {
  			calculateScore();
  		}
	});

	tileIdCount++;
}


// calculate the score on the current board
function calculateScore() {
	var currentScore = 0;

	// check for all tiles that generated if the position is
	// correctly in the board tile, then add the score 
	for(var i in allGeneratedTiles) {
		var tileId = $("#tile" + i);

		if(checkTilePosition(tileId)) {

			// if the tile placed correctly on the board, it can't move afterward
			tileId.draggable({disabled: true});

			// check if the tile is placed in the bonus board tile
			if(checkDoubleScore(tileId)) {
				currentScore += allGeneratedTiles[i].value * 2;
			} else {
				currentScore += allGeneratedTiles[i].value;
			}
		}
	}

	// update the score that is currently accumulating based on this round
	$("#score").text("+" + currentScore);

}

//check if the tile is in the bonus position board
function checkDoubleScore(tile) {

	// there are only two spots with bonus point on the board with tileBoard2 and tileBoard4
	var differenceDoubleBoard1 = $("#tileBoard2").position().left - tile.position().left;
	var differenceDoubleBoard2 = $("#tileBoard4").position().left - tile.position().left;

	if(differenceDoubleBoard1 == 0 || differenceDoubleBoard2 == 0) {
		return true;
	}
	return false;
}


// return true if the tile is placed in the board position 
// https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
function checkTilePosition(tileId) {

	// check for underfined since after each round, the previous 
	// tiles placed in the board correctly are removed from html
	if(tileId.position() != undefined) {

		for(var i = 0; i < 7; i++) {
			var tileBoardId = $("#tileBoard" + i);
			var topPositionDifference = tileBoardId.position().top - tileId.position().top;
			if(topPositionDifference == 0) {
				return true;
			}
		}
	}
	return false;
}

// setup the board and the rack for the next round 
// https://stackoverflow.com/questions/20688678/copy-to-new-array-and-remove-element
// https://stackoverflow.com/questions/1921342/how-do-i-get-a-value-of-a-span-using-jquery
function setupNextWord() {

	//update total score and reset score
	totalScore += parseInt($("#score").text());
	$("#totalScore").text(totalScore);
	$("#score").text("+0");

	// if the tile is in the board position, remove the tile
	// generate new tile to the rack if are more tiles left to be generated 
	for(var i in allGeneratedTiles) {
		var tileId = $("#tile" + i);

		if(checkTilePosition(tileId)) {
			tileId.remove();
			remainingTiles--; // subtract remaining tiles after remove
			var letter = generateRandomTile();
			allGeneratedTiles.push(letter);

		}
	}

	// update the value of remaining tiles 
	// https://www.w3schools.com/jquery/html_text.asp
	$("#remainingTiles").text(remainingTiles);

}

// when the button restart clicks, show the dialog 
// https://www.w3schools.com/jsref/met_loc_reload.asp 
// https://api.jqueryui.com/dialog/
// https://www.youtube.com/watch?v=obhdJ4MFffc
function restartGame() {

	// add content to the dialog 
	$("#dialogContent").html("Are you are you want to restart the game?");

	// dialog verifies if the player wants to restart the game
	$("#dialog").dialog({
			title: "Restarting the Game!",
			show: true,
			modal: true,
			buttons: {
				Cancel: function() {
					$(this).dialog("close");	
				},
				Ok: function() {
					location.reload();
				}
			}

	});

}

