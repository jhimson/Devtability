require('dotenv').config();
const Comment = require('../models/M-comment');
const Post = require('../models/M-post');

// ? @Description    CREATE a comment
// ? @Route          POST /api/comments/
// ? @Access         PRIVATE
const createComment = async (req, res) => {
  console.log(req.body);
  const { postId, userId, text } = req.body;
  console.log('uid', userId);
  //! Insert new comment in DB
  try {
    const newComment = await Comment.create({
      user: userId,
      text,
    });
    console.log('NEW COMMENT', newComment);

    if (newComment) {
      //! Append the new comment to the post
      try {
        const currentPost = await Post.findOne({ _id: postId });
        if (currentPost) {
          currentPost.comments.push(newComment._id);
          currentPost.save();
        }
        // const updatedPost = await Post.updateOne({ _id: postId }, {$set: {}});
      } catch (error) {
        console.log(`Error fetching a post. ErrorMessage:${error}`);
      }
      res
        .status(200)
        .json({ Message: `Successfully created a comment`, newComment });
    }
  } catch (error) {
    console.log(`Error creating a comment from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    FETCH a comment
// ? @Route          GET /api/comments/:commentId
// ? @Access         PRIVATE
const getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId }).populate(
      'user'
    );
    if (comment) {
      res.status(200).json(comment);
    }
  } catch (error) {
    console.log(`Error retrieving comment from DB: ${error}`);
    res.status(500);
  }
};

module.exports = { createComment, getComment };
