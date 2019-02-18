let express = require('express');
let bodyParser = require('body-parser');
let exphbs  = require('express-handlebars');
let app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
    	json: function( obj ) {

    		return JSON.stringify(obj)
    	},
        for: function(from, to, incr, block) {

		    var accum = '';
		    for(var i = from; i < to; i += incr)
		        accum += block.fn(i);
		    return accum;
		}
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



//////Define host and port
let host = "localhost";
let port = "8081";

//////Define sudoku settings
let rows = 9;
let cols = 9;
let box_rows = 3;
let box_cols = 3;
let limit = 9;


let getIndexArray = function( range ) {

	let arr = [];
	for( let i=0; i<range; i++ ) {

		arr.push(i);
	}

	return arr;
}

app.get('/', function(req, res){

	res.render('home', {

		rows: getIndexArray(rows),
		cols: getIndexArray(cols)
	});
});

app.post('/', function( req, res ) {

	let sudoku = req.body.cells;
	
	let sudoku_helper = require('./helpers/sudoku_helper');
	let solved_sudoku = sudoku_helper.solve( sudoku, rows, cols, box_rows, box_cols, limit );

	//console.log(solved_sudoku);
	res.render('solved', {

		sudoku: sudoku,
		solution: solved_sudoku
	});
})

app.listen(port, host);
console.log("Server is running on http://" + host + ":" + port);