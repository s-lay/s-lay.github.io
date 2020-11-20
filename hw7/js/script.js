// Name: Sivly Lay
// Email: Sivly_Lay@student.uml.edu
// Affiliation: Computer Science Student at Umass Lowell in course 91.61 GUI Programming I
// Date: Nov 10, 2020
// Assignment: HW7
// Description: update with slider and tabs by taking inputs from the user and build a dynamic multiplication table  

//use to create tab id
var tabCount = 1;

// https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {	
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

	//min Col 
	$("#minColSlider").slider({
		value: -50,
		min: -50,
		max: 50,
		step: 1
	});
	// https://jqueryvalidation.org/valid/?__cf_chl_jschl_tk__=4cc49ad728ca1aecce3cb6094ffe3d0e2905060b-1605063430-0-Ab0AUuUjUuHNCFU-tr6IBm2CFr2QHfXXBvlBsXy8aHEenM_2aJ-NaeHWCkv0pk8ImfJf1o5vFyUobH-I-KMLwaH_OEI5vCmzVTYZvnb1PW2ftpFZ7kzllEGA6_7Th-itl-uu-uF-xNrUp0DZGsT2BwfJ69s7xC3mY9Trd9Ky06_D8yi_w5VUVduZhqM4c_IgXAtjxPbI6IO9uAhGWdC5HudseB8h-X1vC1Zo9pTWVwmqIiF9rAWXylouRf1TAMcojo1BXWxyBGOTim48wNqrte8
	// https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field
	$("#minColSlider").change(function(){
		$("#errorDeleteTab").html("<p></p>");
		$("#minCol").val($(this).val());
		formStatus.validate();
		if(formStatus.valid()){
			regenerateTable();	
  		}

	});

	//max Col
	$("#maxColSlider").slider({
		value: -50,
		min: -50,
		max: 50,
		step: 1
	});
	$("#maxColSlider").change(function(){
		$("#errorDeleteTab").html("<p></p>");
		$("#maxCol").val($(this).val());
		formStatus.validate();
		if(formStatus.valid()){
			regenerateTable();	
  		}
	});

	//min Row
	$("#minRowSlider").slider({
		value: -50,
		min: -50,
		max: 50,
		step: 1
	});
	$("#minRowSlider").change(function(){
		$("#errorDeleteTab").html("<p></p>");
		$("#minRow").val($(this).val());
		formStatus.validate();
		if(formStatus.valid()){
			regenerateTable();	
  		}
	});

	//max Row
	$("#maxRowSlider").slider({
		value: -50,
		min: -50,
		max: 50,
		step: 1
	});
	$("#maxRowSlider").change(function(){
		$("#errorDeleteTab").html("<p></p>");
		$("#maxRow").val($(this).val());
		formStatus.validate();
		if(formStatus.valid()){
			regenerateTable();
  		}
	});

	//http://www.tutorialspark.com/jqueryUI/jQuery_UI_Tabs_Methods_Adding_Removing_Tabs.php
	$("#tab").tabs();
	createNewTab();


});

// https://www.w3schools.com/jsref/event_onchange.asp
function inputBoxUpdate(){
	var formStatus = $("#inputForm");
	formStatus.validate();
	if(formStatus.valid()){
		regenerateTable();	
	}
}

// https://api.jqueryui.com/tabs/#option-classes
// https://api.jquery.com/append/
// https://stackoverflow.com/questions/5059596/jquery-css-remove-add-displaynone
//https://stackoverflow.com/questions/3105984/how-to-get-an-element-by-its-href-in-jquery/11265841
function createNewTab() {
	$("#errorDeleteTab").html("<p></p>");
	var formStatus = $("#inputForm");
	formStatus.validate();
	if(formStatus.valid()){
		var tabId = "tab" + tabCount;
		var tabContentId = "tabContent" + tabCount;
		var index = $("#tab a[href='#"+ tabContentId +"']").parent().index();
		var tabTitle = createTabTitle(); 

		$("#tab > #tabContent").append("<div id='" + tabContentId + "'></div>");
		$("#tab ul").append("<li id='" + tabId + "''><a href='#" + tabContentId + "'><div>" + tabTitle + "</div></a><input class='deleteCheckBox ui-icon' type='checkbox'></li>");
		$("#tab").tabs("refresh");
		$("#" + tabContentId).empty();
		$("#" + tabContentId).append(generateTable());
		$("#" + tabContentId).css('display', 'block');
		$("#tab").tabs("option", "active", index);
		++tabCount;
	}
}

function createTabTitle() {
	var startCol = parseInt(document.getElementById("minCol").value);
	var endCol = parseInt(document.getElementById("maxCol").value);
	var startRow = parseInt(document.getElementById("minRow").value);
	var endRow = parseInt(document.getElementById("maxRow").value);

	return "[" + startCol + "," + endCol + "] &times; " + " [" + startRow + "," + endRow + "]";
}

// https://www.w3schools.com/jquery/html_remove.asp
// https://www.tutorialrepublic.com/faq/how-to-check-a-checkbox-is-checked-or-not-using-jquery.php
// https://stackoverflow.com/questions/6017309/jquery-each-getting-li-elements-inside-an-ul
function deleteTab() {
	var countCheckbox = 0;

	$("#tab ul li").each(function() {
		var tabId = $(this).attr("id");
		if ( $("#" + tabId + " .deleteCheckBox").prop("checked")) {
			countCheckbox++;
			var tabContentId = $(this).remove().attr("aria-controls");
			$("#" + tabContentId).remove();
			$("#tab").tabs("refresh");
		}
	});

	if(countCheckbox == 0){
		$("#errorDeleteTab").html("<p>Please select at least one tab to to be deleted.</p>");
	} else {
		$("#errorDeleteTab").html("<p></p>");
	}
}


//check if the value is empty 
// https://stackoverflow.com/questions/10232366/how-to-check-if-a-variable-is-null-or-empty-string-or-all-whitespace-in-javascri
function isEmptyOrSpaces(inputValue) {
  return inputValue === null || inputValue.match(/^ *$/) !== null;
}

// https://api.jqueryui.com/tabs/#option-classes
// https://www.w3schools.com/jsref/jsref_slice_string.asp
// https://api.jquery.com/eq/
// https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_empty
//https://stackoverflow.com/questions/7139208/change-content-of-div-jquery
function regenerateTable() {

	var indexActiveTab = $("#tab").tabs("option", "active");
	var tabId = $("#tab ul li").eq(indexActiveTab).attr("id");
	var tabContentId ="tabContent" + tabId.slice(3);

	$("#" + tabId + " div").html(createTabTitle());
	$("#" + tabContentId).empty();
	$("#" + tabContentId).append(generateTable());

}

//https://www.w3schools.com/jsref/jsref_for.asp
// https://stackoverflow.com/questions/12009545/what-is-the-proper-html-entity-for-the-x-in-a-dimension
// https://codepen.io/blrik/pen/HmLpA
function generateTable() {
	var startCol = parseInt(document.getElementById("minCol").value);
	var endCol = parseInt(document.getElementById("maxCol").value);
	var startRow = parseInt(document.getElementById("minRow").value);
	var endRow = parseInt(document.getElementById("maxRow").value);
	var output = "";

	startCol--;
	startRow--;

	output += "<table class='multTable'>";

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
	}

	output += "</table>";

	return output;
 	
}




