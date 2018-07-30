var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db) =>{
    if(err) throw err;
    var dbo = db.db("blog");
    dbo.createCollection("posts", (err, res) => {
        if(err) throw err;
        console.log("created");
        db.close();
    })
    //if(err) throw err;
    //console.log("Database Created");
    //db.close();
})