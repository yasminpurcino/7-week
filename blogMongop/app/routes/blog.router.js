module.exports = app =>{
    const blogController = require("../controllers/blog.controller.js")

    var router = require("express").Router();

    // Post
    // Create a new
    router.post("/post/", blogController.postCreate);
    // FIND all
    router.get("/post/", blogController.postFindAll);
    // FIND a single from id
    router.get("/post/:id", blogController.postFindOne);
    // Update
    router.put("/post/:id", blogController.postUpdate);
    // Delete
    router.delete("/post/:id", blogController.postDelete);

    // User
    // Create a new
    router.post("/user/", blogController.userCreate);
    // FIND all
    router.get("/user/", blogController.userFindAll);
    // FIND a single from id
    router.get("/user/:id", blogController.userFindOne);
    // Update
    router.put("/user/:id", blogController.userUpdate);
    // Delete
    router.delete("/user/:id", blogController.userDelete);

    // Comment
    // Create a new
    router.post("/comment/", blogController.commentCreate);
    // FIND all
    router.get("/comment/", blogController.commentFindAll);
    // FIND a single from id
    router.get("/comment/:id", blogController.commentFindOne);
    // Update
    router.put("/comment/:id", blogController.commentUpdate);
    // Delete
    router.delete("/comment/:id", blogController.commentDelete);


    app.use("/api/", router);
}
