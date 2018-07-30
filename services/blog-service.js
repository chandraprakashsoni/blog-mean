var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/";
class BlogService{
    
    constructor(dbo){
        this.dbo = dbo;
    }
    uploadPost(post){
        var post = post;
        this.dbo.collection("posts").insertOne(post, (err, res) => {
            if(err) throw err;
            console.log("One inserted");
        })

    }

    getPost(cb){
        this.dbo.collection("posts").find({}).toArray((err, result) => {
            if(err) throw err;
            cb(result);
        })

    }

    getPostById(id, cb){
        console.log('id', id);
        this.dbo.collection("posts").findOne({ _id: ObjectID(id) }, (err, result) => {
            if(err) throw err;
            cb(result);
        })
    }
}

module.exports = BlogService;


