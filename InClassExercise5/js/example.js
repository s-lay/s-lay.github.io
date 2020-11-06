var ul = document.querySelector('ul');

// ADD NEW ITEM TO END OF LIST
var newItem = document.createElement('li');
newItem.textContent = 'cream';
ul.appendChild(newItem);

// ADD NEW ITEM START OF LIST
var newItem = document.createElement('li');
newItem.textContent = 'kale';
ul.insertBefore(newItem, ul.firstElementChild);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var list = document.getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
  list[i].className = list[i].className + "cool";
}
// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header = document.querySelector("h2");
var counter = document.createElement('span');
counter.textContent = list.length;
header.appendChild(counter);
