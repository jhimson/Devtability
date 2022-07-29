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

module.exports = { createReply, deleteReply };
