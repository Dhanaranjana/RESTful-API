var express = require('express');
var app = express();
var bodyPraser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyPraser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//connect to Mongoose
mongoose.connect('mongodb://localhost/bookStore');
var db = mongoose.connection;

app.get('/', function (req, res) {
	res.send('please connect to the /api/books or api/genres');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);

console.log('Oh yeah running port 3000');