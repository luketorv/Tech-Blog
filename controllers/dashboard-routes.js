const router = require("express").Router();
const { Post } = require("../models/");
​​

router.get("/", (req, res) => {
   Post.findAll({
     where: {
       userId: req.session.userId
     }
   })
     .then(dbPostData => {
       const posts = dbPostData.map((post) => post.get({ plain: true }));
      
       res.render("all-posts-admin", {
	// you can change which layout view by passing in this option, if you’d like touse something other than views/layouts/main.handlebars
         layout: "dashboard",
         posts
       });
     })
     .catch(err => {
       console.log(err);
       res.redirect("login");
    });
});

module.exports = router;