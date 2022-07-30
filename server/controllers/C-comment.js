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
          currentPost.comments.unshift(newComment._id);
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
    const comment = await Comment.findOne({
      _id: req.params.commentId,
    })
      .populate('user')
      .populate('replies');
    if (comment) {
      res.status(200).json(comment);
    }
  } catch (error) {
    console.log(`Error retrieving comment from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    DELETE a comment
// ? @Route          DEL /api/comments/:postId/:commentId
// ? @Access         PRIVATE
const deleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  try {
    await Comment.deleteOne({
      _id: commentId,
    });
    console.log(`Successfully deleted the comment from comments collection`);
    try {
      const updatedPost = await Post.updateOne(
        { _id: postId },
        { $pull: { comments: commentId } },
        { new: true }
      );
      console.log(
        `Successfully deleted the comment from posts collection`,
        updatedPost
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      console.log(`Error deleting a comment from posts collection`);
    }
  } catch (error) {
    console.log(`Error deleteing a comment from comments collection: ${error}`);
    res.status(500);
  }
};

// ? @Description    Update a comment
// ? @Route          PATCH /api/comments/
// ? @Access         PRIVATE
const updateComment = async (req, res) => {
  const { commentId, text } = req.body;
  try {
    const comment = await Comment.updateOne(
      { _id: commentId },
      { $set: { text, isEdited: true, updated: Date.now() } }
    );
    if (comment) {
      res
        .status(200)
        .json({ Message: `Successfully Updated comment`, comment });
    }
  } catch (error) {
    console.log(`Error Updating comment from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    Update a comment
// ? @Route          PATCH /api/comments/toggleLike
// ? @Access         PRIVATE
const toggleLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.body.commentId);
    //* check if the post already been liked
    if (comment.likes[0] === req.body.userId) {
    }
    if (comment.likes.includes(req.body.userId)) {
      let updatedLikes = comment.likes.filter(
        (like) => like !== req.body.userId
      );
      comment.likes = updatedLikes;
      await comment.save();
      res.json({ like: 1 });
    } else {
      comment.likes.unshift(req.body.userId);
      await comment.save();
      res.json({ like: 0 });
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createComment,
  deleteComment,
  getComment,
  updateComment,
  toggleLike,
};
