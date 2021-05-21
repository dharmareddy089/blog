//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _=require("lodash");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
const leader="This message Reflect in home page";
const mongoose = require('mongoose');
mongoose.connect(process.env.SERVER, {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var postSchema=new mongoose.Schema({
  title:String,
  content:String
});
var Post=mongoose.model("Post",postSchema);
app.get("/",function(req,res){
  Post.find({},function(error,post){
    res.render("home",{
      jack:homeStartingContent,
      lol:post
    });
  });

});
app.get("/abouts",function(req,res){
  res.render("about",{king:aboutContent});
});
app.get("/contacts",function(req,res){
  res.render("contact",{can:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose",{gang:leader});
});
app.post("/compose",function(req,res){
 const post=new Post({
   title:req.body.posttitle,
   content:req.body.post
 });
 post.save(function(error){
   if(error){
     console.log(error);
   }else {
     res.redirect("/");
   }
 });
});
app.get("/posts/:postname",function(req,res){
    const reqtitle=_.lowerCase(req.params.postname);
    p.forEach(function(post){
      var k=_.lowerCase(post.title);
     var l=post.body;
      if(k===reqtitle){
      res.render("post",
      {
        ping:reqtitle,
        uma:l
      });      }
    });
});
app.get("*",function(req,res){
  res.send("404 error code");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
