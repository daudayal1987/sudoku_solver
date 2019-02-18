let getEmptyCells = function( sudoku, rows, cols ) {

	var empty_cells = [];
	for( var i=0; i<rows; i++ ) {

		for( var j=0; j<cols; j++ ) {

			if( sudoku[i][j] == 0 || sudoku[i][j] == "" ) {

				empty_cells.push([i,j]);
			}
		}
	}

	return empty_cells;
}

let isValidValue = function( sudoku, rows, cols, box_rows, box_cols, cell_row, cell_col, value ) {
	
	//console.log("isValidValue " + row + " " + column + " " + value );

	//is exists in row
	for( var i=0; i<rows; i++ ){

		if( sudoku[cell_row][i] == value ) {
			
			//console.log("Value "+ value +" found in row " + row + " " + i);
			return false;
		}
	}

	//is exists in column
	for( var i=0; i<cols; i++ ) {

		if( sudoku[i][cell_col] == value ) {

			//console.log("Value "+ value +" found in column " + i + " " + column);
			return false;
		}
	}

	//find valid rect to check
	var rowStart = cell_row - ( cell_row % box_rows),
		rowEnd = rowStart + (box_rows-1),
		colStart = cell_col - ( cell_col % box_cols ),
		colEnd = colStart + (box_cols-1);

	//console.log( "Block " + rowStart + "," + colStart + "," + rowEnd + "," + colEnd );
	for( var i=rowStart; i<=rowEnd; i++ ) {

		for( var j=colStart; j<=colEnd; j++ ) {

			if( sudoku[i][j] == value ) {

				//console.log("Value "+value+" found at " + i + "," + j );
				return false;
			}
		}
	}

	return true;
}

let solve = function( original_sudoku, rows, cols, box_rows, box_cols, limit ) {

	var sudoku = [];
	for( let i=0; i<rows; i++ ) {

		sudoku.push([]);
		for( let j=0; j<cols; j++ ) {

			sudoku[i].push(+original_sudoku[i][j]);
		}
	}

	// console.log(sudoku)
	// console.log( rows, cols, box_rows, box_cols, limit )

	printSudoku(sudoku, rows, cols)

	let empty_cells = getEmptyCells( sudoku, rows, cols );

	//console.log(empty_cells)
	let i=0;

	while( i<empty_cells.length ) {

		var valid_value = false;

		var empty_row = empty_cells[i][0],
			empty_col = empty_cells[i][1];
		
		var value = Number(sudoku[empty_row][empty_col]) + 1;

		while( value<=limit ) {

			if( isValidValue( sudoku, rows, cols, box_rows, box_cols, empty_row, empty_col, value ) ) {

				valid_value = true;
				sudoku[empty_row][empty_col] = value;
				i++;
				break;
			}
			
			value++;	
		}

		if ( value > limit+1 ) {
			//console.log(empty_row, empty_col, value)				
			printSudoku(sudoku, rows, cols)
		}

		if( !valid_value ) {

			//console.log(empty_row, empty_col, value)
			//printSudoku(sudoku, rows, cols)
			sudoku[empty_row][empty_col] = 0;
			i--;
		}

		//printSudoku(sudoku, rows, cols)
	}

	return sudoku;
}

let printSudoku = function (sudoku, rows, cols) {

	for( var i=0; i<rows; i++ ) {

		console.log( sudoku[i].join('\t') );
	}
	console.log("\n\n")
}


module.exports.solve = solve;