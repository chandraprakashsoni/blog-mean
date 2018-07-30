var MongoClient = require('mongodb').MongoClient;
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

    getPost(){
        this.dbo.collection("posts").find({}).toArray((err, result) => {
            if(err) throw err;
            console.log("getPost")
            console.log(result);
        })

    }

    getPostById(){
        this.dbo.collection("posts").find({} , { title: "hello" }).toArray((err, result) => {
            if(err) throw err;
            console.log("By ID");
            console.log(result);
        })
    }
}


MongoClient.connect(url, (err, db) =>{
    if(err) throw err;
    var post = { title:"hello" , date: 12/12/12 , description: "abcd applet"};
    var dbo = db.db("blog");
    var obj = new BlogService(dbo);
//obj.uploadPost(post);
obj.getPost();
obj.getPostById();

})

