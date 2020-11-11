
// Name: Sivly Lay
// Email: Sivly_Lay@student.uml.edu
// Affiliation: Computer Science Student at Umass Lowell in course 91.61 GUI Programming I
// Date: Nov 5, 2020
// Assignment: HW6
// Description: enhance hw6 to use jQuery validation plugin by taking inputs from the user and build a dynamic multiplication table  


// https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
	generateTable(1, 10, 1, 10);

	jQuery.validator.setDefaults({
  	success: "valid"
	});

	// https://jqueryvalidation.org/range-method/
	// https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
	// https://jqueryvalidation.org/number-method/?__cf_chl_jschl_tk__=d97ce2d1e6d6b63e75aa790d434cd784202a7344-1605061117-0-AcDjIGdGtabToh5KLSrdKHnVdm5iXF_-26L5Xf6YEASqcf74I28vusBNcBi60TAbpKZcQiLW89eVf82Jpje4wglIeJQy-mIXrEbiZms-jxna1wYZwHqtHyxAb8RlmtfPKlqsMi5p8gPRmIibGqh2D4KgUridJWvSv8XPNwfDwddQj4J2c9dMsgURrq1gokEOWYp5IX7qqDPmvEMWn_xbNcKos_7gBJ_oJfVViwWyXy0vUg5rK_ZUWDYr-coK1DLpRXuOnfLfYwWuCtS2qf1cP7a1_xQzbf_q4XHkPEK-Bf_R
	$( "#inputForm" ).validate({
  	rules: {
	    minCol:{
	      required: true,
	      number: true,
	      range:[-50,50],
	      greaterThan: "#maxCol",
	    },
	    maxCol: {
	      required: true,
	      number: true,
	      range:[-50,50],
	      lessThan: "#minCol"
	    },
	    minRow: {
	      required: true,
	      number: true,
	      range:[-50,50],
	      greaterThan: "#maxRow"
	    },
	    maxRow: {
	      required: true,
	      number: true,
	      range:[-50,50],
	      lessThan: "#minRow"
	    }
	},
	messages: {
		minCol: {
			greaterThan: "The minimun column value must be less than the maximun column value."
		},
		maxCol: {
			lessThan: "The maximun column value must be greater than the minimun column value."
		},
		minRow: {
			greaterThan: "The minimun row value must be less than the maximun row value."
		},
		maxRow: {
			lessThan: "The maximun row value must be greater than the minimun row value."
		}
	}});


	// https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
	jQuery.validator.addMethod("greaterThan", function(value, element, param) {
		if(!isEmptyOrSpaces($(param).val())){
			return this.optional(element) || parseInt(value) <= parseInt($(param).val());

		}
		return true;
	});
	// https://stackoverflow.com/questions/1260984/jquery-validate-less-than
	jQuery.validator.addMethod("lessThan", function(value, element, param) {
		if(!isEmptyOrSpaces($(param).val())){
			return this.optional(element) ||  parseInt($(param).val()) <= parseInt(value);
		}
		return true;
	});

	// https://jqueryvalidation.org/valid/?__cf_chl_jschl_tk__=4cc49ad728ca1aecce3cb6094ffe3d0e2905060b-1605063430-0-Ab0AUuUjUuHNCFU-tr6IBm2CFr2QHfXXBvlBsXy8aHEenM_2aJ-NaeHWCkv0pk8ImfJf1o5vFyUobH-I-KMLwaH_OEI5vCmzVTYZvnb1PW2ftpFZ7kzllEGA6_7Th-itl-uu-uF-xNrUp0DZGsT2BwfJ69s7xC3mY9Trd9Ky06_D8yi_w5VUVduZhqM4c_IgXAtjxPbI6IO9uAhGWdC5HudseB8h-X1vC1Zo9pTWVwmqIiF9rAWXylouRf1TAMcojo1BXWxyBGOTim48wNqrte8
	var formStatus = $("#inputForm");
	formStatus.validate();
	$( "button" ).click(function() {
  		if(formStatus.valid()){
  			var minCol = parseInt(document.getElementById("minCol").value);
			var maxCol = parseInt(document.getElementById("maxCol").value);
			var minRow = parseInt(document.getElementById("minRow").value);
			var maxRow = parseInt(document.getElementById("maxRow").value);

			generateTable(minCol, maxCol, minRow, maxRow);	
  		}
	});

});

//check if the value is empty 
// https://stackoverflow.com/questions/10232366/how-to-check-if-a-variable-is-null-or-empty-string-or-all-whitespace-in-javascri
function isEmptyOrSpaces(inputValue){
  return inputValue === null || inputValue.match(/^ *$/) !== null;
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
