var express = require('express');
var app = express();
var router = express.Router();
var BlogService = require('./services/blog-service');
var MongoClient = require('mongodb').MongoClient;
var urlMongo = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');

app.use(( req, res, next) => {
    MongoClient.connect(urlMongo, (err, db) =>{
    if(err) throw err;
    var dbo = db.db("blog");
    console.log('Hi ',dbo);
    req.dbo = dbo;
    next();
    
});
});

app.use(express.static('./views/assests'));
app.use('/', router);

router.get('/', (req, res) => {
    var blogService = new BlogService(req.dbo);
    blogService.getPost((result) =>{
        res.render('index', {post:result});
    }
);
});

router.get('/post/:id', (req, res) => {
    var blogService = new BlogService(req.dbo);
    blogService.getPostById(req.params.id, function(result){
        res.render('post', {post:result});
    });
});

router.get('/signin', function(req, res) {
    res.render('signin');
})


function checkSignIn(req, res){
    if(req.session.user){
       next();     
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  
    }
 }

 app.get('/protected_page', checkSignIn, function(req, res){
    res.render('protected_page', {id: "1"})
 });

app.post('/signin/auth', function(req, res){
    if(!req.query.id || !req.query.password){
       res.render('signin', {message: "Please enter both id and password"});
    } else {
        if("chintu" === req.query.id && "chintu" === req.query.password){
            req.session.user = {user:"chintu"};
            res.redirect('/protected_page');
         }
       res.render('login', {message: "Invalid credentials!"});
    }
 });
 
 

app.listen(3000);