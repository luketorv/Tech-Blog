// import router and models
const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
 
router.get("/", (req, res) => {
 //for the homepage root path, find all Posts
 Post.findAll({
   include: [User],
 })
   .then((dbPostData) => {
     const posts = dbPostData.map((post) => post.get({ plain: true }));
	// pass in all posts data into the ‘all-posts’ template
    //  res.render("all-posts", { posts });
    res.json(posts);
   })
   .catch((err) => {
     res.status(500).json(err);
   });
});

// router.get("/post/:id", (req, res) => {
//     //follow a similar pattern to the homepage route. 
//     //get the data using the id in params, then pass it into the ‘single-post’ view
//    Post.findByPk(req.params.id, { })  
//    res.render("single-post", { post });
//   })
  
//   router.get("/login", (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect("/");
//       return;
//     }
    
//     res.render("login");
//    });

   module.exports = router;
   