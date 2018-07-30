var express = require('express');
var app = express();
var router = express.Router();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {
        pageTitle: 'Home',
        pageID: 'home'
    });
});

app.get('/blog', (req, res) => {
    res.send("UnderBLog");
});

app.listen(3000);