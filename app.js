var volleyball = require('volleyball')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var express = require('express')
var models = require('./models')
var wikiRouter = require('./routes/wiki.js');


var app = express()

var env = nunjucks.configure('views', {noCache: true});


app.use('/wiki', wikiRouter);
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function(){
    var server = app.listen(1337, function() {
        console.log('listening on port 1337')
    })
})
.catch(console.error)
