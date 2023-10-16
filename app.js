//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
let posts = [];

const homeStartingContent = "At Yours-Blogs, we are passionate about sharing knowledge, inspiring creativity, and fostering a sense of community. Our goal is to provide you with valuable information, insightful stories, and engaging content on a wide range of topics. Whether you're a seasoned expert or just beginning your journey of discovery, our blog is designed to cater to your interests and curiosities.Our team of writers and contributors is dedicated to delivering high-quality, well-researched, and thought-provoking content that informs, entertains, and encourages meaningful conversations. We're here to guide you through the intricacies of various subjects, provide helpful tips and advice, and inspire you to explore new horizons.";
const aboutContent = "Welcome to Yours-Blogs, your go-to source for a wide array of captivating and informative content. Our blog covers everything from travel adventures, lifestyle, and tech trends to health and wellness tips. Join us on a journey of exploration, knowledge sharing, and inspiration as we bring you engaging articles that cater to your diverse interests and curiosities. Whether you're a seasoned enthusiast or a newcomer to the blogging world, Yours-Blogs has something for everyone.";
const contactContent = "We're here to hear from you! Whether you have questions, suggestions, or just want to say hello, don't hesitate to get in touch. Reach out to us at sohail@yours-blogs.com, and we'll do our best to respond promptly. Your feedback matters to us, and we're excited to connect with our readers.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home" , {startingContent : homeStartingContent ,
    posts :posts});
  
});

app.get("/about",function(req,res){
  res.render("about",{abtContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{cntContent:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
  const post = {
      title: req.body.postTitle,
      content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName",function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
      if(storedTitle === requestedTitle)
      {
        res.render("post" , {
          title: post.title,
          content: post.content
        });
      }
      

    })
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
