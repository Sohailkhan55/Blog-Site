//jshint esversion:6

import express from 'express'
import bodyParser from 'body-parser';
import ejs from 'ejs'
import _ from "lodash";

import { dbConnect } from './db.js';
import { PostModel } from './models/postModel.js';

dbConnect();


const homeStartingContent = "At Yours-Blogs, we are passionate about sharing knowledge, inspiring creativity, and fostering a sense of community. Our goal is to provide you with valuable information, insightful stories, and engaging content on a wide range of topics. Whether you're a seasoned expert or just beginning your journey of discovery, our blog is designed to cater to your interests and curiosities.Our team of writers and contributors is dedicated to delivering high-quality, well-researched, and thought-provoking content that informs, entertains, and encourages meaningful conversations. We're here to guide you through the intricacies of various subjects, provide helpful tips and advice, and inspire you to explore new horizons.";
const aboutContent = "Welcome to Yours-Blogs, your go-to source for a wide array of captivating and informative content. Our blog covers everything from travel adventures, lifestyle, and tech trends to health and wellness tips. Join us on a journey of exploration, knowledge sharing, and inspiration as we bring you engaging articles that cater to your diverse interests and curiosities. Whether you're a seasoned enthusiast or a newcomer to the blogging world, Yours-Blogs has something for everyone.";
const contactContent = "We're here to hear from you! Whether you have questions, suggestions, or just want to say hello, don't hesitate to get in touch. Reach out to us at sohail@yours-blogs.com, and we'll do our best to respond promptly. Your feedback matters to us, and we're excited to connect with our readers.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));//tell express our static files are in public folder

//Create Route
app.get("/",async function(req,res){
  try {
    const posts=await PostModel.find({}).sort({createdAt : -1});
    res.render("home" , {startingContent : homeStartingContent ,
      posts :posts});
  }
  catch(error)
  {
    console.log(error);
  }
  
});
//startingContent- variable which we will pass over
app.get("/about",function(req,res){
  res.render("about",{abtContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{cntContent:contactContent});
});

app.post("/",function (req,res) {
  res.redirect("/compose");
})

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",async function(req,res){
  const post = new PostModel({
      title: req.body.postTitle,
      content: req.body.postBody
  });
  await post.save();
  res.redirect("/");
});
//Express Routing parameters
//name of parameter can be postName or postid
app.get("/posts/:postId",async function(req,res){
  
    const requestedPostId = req.params.postId;
    try{
      const post = await PostModel.findById(requestedPostId);
      res.render("post",{
        title : post.title,
        content : post.content
      });
    }
    catch(err)
    {
      console.log(err);
    }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
