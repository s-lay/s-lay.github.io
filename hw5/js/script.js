
// Name: Sivly Lay
// Email: Sivly_Lay@student.uml.edu
// Affiliation: Computer Science Student at Umass Lowell in course 91.61 GUI Programming I
// Date: Oct 25, 2020
// Assignment: HW5
// Description: taking inputs from the user and build a dynamic multiplication table 

generateTable(1, 10, 1, 10);

function main() {

	var minCol = document.getElementById("minCol").value;
	var maxCol = document.getElementById("maxCol").value;
	var minRow = document.getElementById("minRow").value;
	var maxRow = document.getElementById("maxRow").value;

	// This section of code is to check valid inpputs
	// https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_number
	// https://www.w3schools.com/jsref/jsref_number.asp
	if (isNaN(minCol) || isNaN(maxCol) || isNaN(minRow) || isNaN(maxRow)) {
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: please enter only integer numbers!";
	} else if(checkRange(minCol) || checkRange(maxCol) || checkRange(minRow) || checkRange(maxRow)){
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: input range has to be between -50 to 50!";
	} else if (isEmptyOrSpaces(minCol) || isEmptyOrSpaces(maxCol) || isEmptyOrSpaces(minRow) || isEmptyOrSpaces(maxRow)) {
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: input value(s) cannot be empty!";
	} else if (Number(minCol) >= Number(maxCol)) {
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: mininum column value can't be greater than or equaled to maximum column value!";
	} else if (Number(minRow) >= Number(maxRow)) {
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: mininum row value can't be greater than or equaled to maximum row value!";
	} else if (!Number.isInteger(Number(minCol)) || !Number.isInteger(Number(maxCol)) || !Number.isInteger(Number(minRow)) || !Number.isInteger(Number(maxRow))) {
		document.getElementById("errorMessage").innerHTML = "INVALID ERROR: input value(s) can only be integer!";
	} else {
		document.getElementById("errorMessage").innerHTML = "";
		generateTable(minCol, maxCol, minRow, maxRow);	
	}

}

//check if the value is empty 
// https://stackoverflow.com/questions/10232366/how-to-check-if-a-variable-is-null-or-empty-string-or-all-whitespace-in-javascri
function isEmptyOrSpaces(inputValue){
	return inputValue === null || inputValue.match(/^ *$/) !== null;
}

//return true if the value is out of bound
function checkRange(inputValue){
	return Number(inputValue) < -50 || 50 < Number(inputValue);
}

//https://www.w3schools.com/jsref/jsref_for.asp
// https://stackoverflow.com/questions/12009545/what-is-the-proper-html-entity-for-the-x-in-a-dimension
// https://codepen.io/blrik/pen/HmLpA
function generateTable(startCol, endCol, startRow, endRow){
	var output = "";
	startCol--;
	startRow--;

	for(var i = startRow; i <= endRow; i++){
		output +="<tr>";

		for (var j = startCol; j <= endCol; j++) {

			if(i == startRow && j == startCol){
				output +="<th>&times;</th>";
			}
			else if(i == startRow && j > startCol){
				output += "<th>" + j + "</th>";
			}
			else if (j == startCol && i > startRow){
				output += "<th>" + i + "</th>";
			}
			else if (i > startRow && j > startCol){
				output+="<td>" + i*j + "</td>";
			}
			
		}
		output+= "</tr>";
		document.getElementById("multTable").innerHTML = output;
	}

}