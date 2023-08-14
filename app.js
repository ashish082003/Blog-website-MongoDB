//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Discover a world of inspiration, knowledge, and innovation right here. We're thrilled to have you visit our online home. Whether you're seeking valuable insights, creative ideas, or simply a place to connect with like-minded individuals, you've come to the right place. Our website is a vibrant hub where ideas flourish and communities thrive. Dive into thought-provoking articles, explore exciting resources, and engage with a community passionate about growth and discovery. From the curious minds to the seasoned experts, everyone is welcome here. Join us on this journey as we explore, learn, and create together. Get ready to embark on an enriching experience that's all about expanding horizons and making meaningful connections. Welcome aboard!";
const aboutContent = "Welcome to our journal website! We are passionate about sharing knowledge and promoting intellectual discourse. Our mission is to provide a platform for researchers, scholars, and enthusiasts from diverse fields to publish their findings and engage in meaningful conversations. Whether you're a scientist pushing the boundaries of knowledge or a curious reader seeking insights, our journal is designed to be a hub of thought-provoking articles and rigorous research. We believe in the power of information to shape the world, and we're committed to fostering a community that values critical thinking and the exchange of ideas. Join us on this exciting journey of exploration and enlightenment.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true},{useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", async function(req, res) {
  try {
    const posts = await Post.find({});
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  } catch (err) {
    console.error(err);
    
  }
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  res.redirect("/");

  post.save();
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}).then(function(post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }).catch((err)=>{
    console.log(err);
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
