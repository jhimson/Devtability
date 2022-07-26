require('dotenv').config();
const AWS = require('aws-sdk');
const Post = require('../models/M-post');

const { generateAccessToken, generateRefreshToken } = require('../utils/index');

// ? @Description    CREATE new post
// ? @Route          POST /api/posts/
// ? @Access         PUBLIC
const CreatePost = async (req, res) => {
  const { user, title, todayText, tomorrowText, blockersText } = req.body;
  console.log('AAAAAAWWWWL', req.files);
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  });
  const s3 = new AWS.S3();
  const fileContent = Buffer.from(req.files.data.data, 'binary');

  const params = {
    Bucket: 'catcollector-with-toys-and-pics1',
    Key: req.files.data.name,
    Body: fileContent,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    try {
      await Post.create({
        user,
        title,
        todayText,
        tomorrowText,
        blockersText,
        image: data.Location,
      });
    } catch (error) {
      console.log(`Error uploading image ${error}`);
    }
    res.send({
      response_code: 200,
      response_message: 'Success',
      response_data: data,
    });
  });
};

// ? @Description    Fetch posts
// ? @Route          GET /api/posts/:userId
// ? @Access         PUBLIC
const fetchUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user');
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.log(`Error retrieving post from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    Fetch all posts
// ? @Route          GET /api/posts/
// ? @Access         PUBLIC
const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    console.log(`Error retrieving Posts from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    Delete a post
// ? @Route          DEL /api/posts/
// ? @Access         PUBLIC
const DeletePost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.deleteOne({ _id: req.body.postId });
    if (post) {
      res.status(200).json({ Message: `Successfully deleted post`, post });
    }
  } catch (error) {
    console.log(`Error deleting post from DB: ${error}`);
    res.status(500);
  }
};

// ? @Description    Update a post
// ? @Route          PATCH /api/posts/
// ? @Access         PUBLIC
const UpdatePost = async (req, res) => {
  const { _id, title, todayText, tomorrowText, blockersText } = req.body;
  try {
    const post = await Post.updateOne(
      { _id },
      { $set: { title, todayText, tomorrowText, blockersText } }
    );
    if (post) {
      res.status(200).json({ Message: `Successfully Updated post`, post });
    }
  } catch (error) {
    console.log(`Error Updating post from DB: ${error}`);
    res.status(500);
  }
};

module.exports = {
  CreatePost,
  fetchUserPosts,
  fetchAllPosts,
  DeletePost,
  UpdatePost,
};
