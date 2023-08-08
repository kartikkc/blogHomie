const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// app.set("views", "views");
app.set("views", __dirname + "/views");
let date = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
let day = date.toLocaleDateString("en-US", options)
let posts = [{
    title: "New Day",
    body: "This is my blog site and I have been working on it since last 6 days!"
}];
let messages =[];
app.get("/", (req, res) => {
    res.render("home", { dateAndDay: day, postContent: posts });
})

app.get("/about", (req, res) => {
    res.render("about", { dateAndDay: day });
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.title,
        body: req.body.content
    }
    posts.push(post);
    console.log(posts);
    res.redirect("/");
})

app.post("/contact", (req, res) => {
    const message = {
        name : req.body.name,
        email: req.body.email,
        message : req.body.message
    }
    messages.push(message);
    console.log(messages);
    res.redirect("sucess");
})
app.get("/post", (req, res) => {
    res.render("post", { postContent: posts, dateAndDay: day });
})

app.get("/post/:title", (req, res) => {
    const postTitle = req.params.title;
    const lowerCasePostTitle = lodash.lowerCase(postTitle);
    posts.forEach((post) => {
        const storedTitle = lodash.lowerCase(post.title);

        if (storedTitle === lowerCasePostTitle) {
            console.log("[Search] Success-200 : Match Found");
            res.render("post", { postTitle: post.title, postBody: post.body, dateAndDay: day });
        }
    })
})

app.listen(process.env.PORT ||3000, () => {
    console.log("[Status] The server is running on port: 3000");
})
