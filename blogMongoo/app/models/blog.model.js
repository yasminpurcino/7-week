const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Blog');

const schemaUser = new mongoose.Schema({
    email: 'string',
    name: 'string',
    password: 'string',
});
const User = mongoose.model('User', schemaUser);


const schemaPost = new mongoose.Schema({
    image: 'string',
    text: 'string',
    title: 'string',
    user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});
const Post = mongoose.model('Post', schemaPost);

const schemaComment = new mongoose.Schema({
    comment: 'string',
    date: Date,
    post: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});
const Comment = mongoose.model('Comment', schemaComment);

module.exports = {
    user: User,
    post: Post,
    comment: Comment
};
