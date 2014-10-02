// Selection timeout is to make searching faster, no selecting and backspace needed after a search
var selection_timeOut;

function filter_pokemon() {
	// Clear the current selection timeout if it exists -- to make sure text does not get selected while typing.
	if(selection_timeOut) {
		window.clearTimeout(selection_timeOut);
	}

	var table_body = document.getElementById('pokemangs').children[0];
	var input = document.getElementById('pokemang_search').value.toLowerCase();

	// Put stuff in arrays first while calculating, after that hide and show
	// Note: Doing this in place is a massive performance hit.
	var to_hide = new Array();
	var to_display = new Array();

	if(input == "") {
		for(var i=1; i < table_body.children.length; i++) {
			var row = table_body.children[i];
			to_display.push(row);
		}
	} else {
		for(var i=1; i < table_body.children.length; i++) {
			var row = table_body.rows[i];
			var pokemon = row.children[0].children[1].textContent.toLowerCase();
			var dex_num = row.children[0].children[0].textContent;

			if(pokemon.indexOf(input) !== -1 || dex_num.indexOf(input) !== -1) {
				to_display.push(row);
			} else {
				to_hide.push(row);
			}
		}
	}

	// Note: Doing this in place (up there) is a massive performance hit.
	change_display_styles(to_display, 'table-row');
	change_display_styles(to_hide, 'none');

	// Start the selection timeout
	selection_timeOut = setTimeout(function() {document.getElementById('pokemang_search').select()}, 3000);
}

// Iterates over the given array of rows, and changes their display value to the given display value
function change_display_styles(row_array, display) {
	for(var i=0; i < row_array.length; i++) {
		row_array[i].style.display = display;
	}
}

// Toggles advanced search dialog
function toggle_adv_search() {
	var adv_search = document.getElementById('adv_search');
	if(adv_search.style.display == 'none') {
		adv_search.style.display = 'block';
	} else {
		adv_search.style.display = 'none';
	}
}