require('dotenv').config();
const Comment = require('../models/M-comment');
const Post = require('../models/M-post');
const Reply = require('../models/M-reply');

// ? @Description    CREATE a reply to a comment
// ? @Route          POST /api/reply/
// ? @Access         PRIVATE
const createReply = async (req, res) => {
  const { userId, commentId, text } = req.body;

  //! Insert new reply in DB
  try {
    const newReply = await Reply.create({
      user: userId,
      text,
    });
    console.log('NEW REPLY', newReply);
    try {
      const comment = await Comment.findById(commentId);
      if (comment) {
        comment.replies.push(newReply._id);
        await comment.save();
        res
          .status(200)
          .json({ Message: `Successfully created a reply`, newReply });
      }
    } catch (error) {
      console.log(`Error Inserting a new reply to a comment. ${error}`);
    }
  } catch (error) {
    console.log(`Error creating a reply from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    DELETE a comment
// ? @Route          DEL /api/comments/:postId/:commentId
// ? @Access         PRIVATE
const deleteReply = async (req, res) => {
  const { commentId, replyId } = req.params;
  console.log(req.body);
  try {
    await Reply.deleteOne({
      _id: replyId,
    });
    console.log(`Successfully deleted the reply`);
    try {
      const updatedComment = await Comment.updateOne(
        { _id: commentId },
        { $pull: { replies: replyId } },
        { new: true }
      );
      console.log(
        `Successfully deleted the comment from posts collection`,
        updatedComment
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      console.log(`Error deleting a reply`);
    }
  } catch (error) {
    console.log(`Error deleteing a reply from comments collection: ${error}`);
    res.status(500);
  }
};

// ? @Description    Update a reply
// ? @Route          PATCH /api/replies/
// ? @Access         PUBLIC
const updateReply = async (req, res) => {
  const { replyId, text } = req.body;
  console.log('wtf', req.body.text);
  try {
    const reply = await Reply.updateOne(
      { _id: replyId },
      { $set: { text, isEdited: true, updated: Date.now() } }
    );
    if (reply) {
      res.status(200).json({ Message: `Successfully Updated reply`, reply });
    }
  } catch (error) {
    console.log(`Error Updating reply from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    TOGGLE Like
// ? @Route          PATCH /api/replies/toggleLike
// ? @Access         PRIVATE
const toggleLike = async (req, res) => {
  console.log(req.body)
  try {
    const reply = await Reply.findById(req.body.replyId);
    //* check if the post already been liked
    // if (reply.likes[0] === req.body.userId) {
    // }
    if (reply.likes.includes(req.body.userId)) {
      let updatedLikes = reply.likes.filter(
        (like) => like !== req.body.userId
      );
      reply.likes = updatedLikes;
      await reply.save();
      res.json({ like: 1 });
    } else {
      reply.likes.unshift(req.body.userId);
      await reply.save();
      res.json({ like: 0 });
    }
  } catch (error) {
    res.status(500).send('Error updating like for reply');
  }
};

// // ? @Description    FETCH a comment
// // ? @Route          GET /api/comments/:commentId
// // ? @Access         PRIVATE
// const getComment = async (req, res) => {
//   try {
//     const comment = await Comment.findOne({
//       _id: req.params.commentId,
//     }).populate('user');
//     if (comment) {
//       res.status(200).json(comment);
//     }
//   } catch (error) {
//     console.log(`Error retrieving comment from DB: ${error}`);
//     res.status(500);
//   }
// };

// // ? @Description    Update a post
// // ? @Route          PATCH /api/posts/
// // ? @Access         PUBLIC
// const updateComment = async (req, res) => {
//   const { commentId, text } = req.body;
//   try {
//     const comment = await Comment.updateOne(
//       { _id: commentId },
//       { $set: { text, isEdited: true } }
//     );
//     if (comment) {
//       res
//         .status(200)
//         .json({ Message: `Successfully Updated comment`, comment });
//     }
//   } catch (error) {
//     console.log(`Error Updating comment from DB: ${error}`);
//     res.status(500);
//   }
// };

module.exports = { createReply, deleteReply, updateReply, toggleLike };
