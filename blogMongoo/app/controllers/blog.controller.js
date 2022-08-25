const blog = require("../models/blog.model")

//Create
function create(model, req, res) {
    model
        .save(model)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating."
            });
        });
}

//FindAll
function findAll(model, req, res) {
    model.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
}

function findOne(model, req, res) {
    const id = req.params.id;

    model.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
}

function update(model, req, res) {
    const id = req.params.id;

    model.findByIdAndUpdate(id, req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorial."
            });
        });
}

function deleteOne(model, req, res) {
    const id = req.params.id;

    model.findByIdAndDelete(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorial."
            });
        });

}

// Find
exports.userFindOne = (req, res) => {
    findOne(blog.user, req, res)
}
exports.postFindOne = (req, res) => {
    findOne(blog.post, req, res)
}
exports.commentFindOne = (req, res) => {
    findOne(blog.comment, req, res)
}

// Find All
exports.userFindAll = (req, res) => {
    findAll(blog.user, req, res)
}
exports.postFindAll = (req, res) => {
    findAll(blog.post, req, res)
}
exports.commentFindAll = (req, res) => {
    findAll(blog.comment, req, res)
}

// Create
exports.userCreate = (req, res) => {
    create(blog.user, req, res)
}
exports.postCreate = (req, res) => {
    create(blog.post, req, res)
}
exports.commentCreate = (req, res) => {
    create(blog.comment, req, res)
}

// Update
exports.userUpdate = (req, res) => {
    update(blog.user, req, res)
}
exports.postUpdate = (req, res) => {
    update(blog.post, req, res)
}
exports.commentUpdate = (req, res) => {
    update(blog.comment, req, res)
}

// Delete
exports.userDelete = (req, res) => {
    deleteOne(blog.user, req, res)
}
exports.postDelete = (req, res) => {
    deleteOne(blog.post, req, res)
}
exports.commentDelete = (req, res) => {
    deleteOne(blog.comment, req, res)
}


