require('dotenv').config();
const User = require('../models/M-user');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const { generateAccessToken, generateRefreshToken } = require('../utils/index');

let refreshTokens = [];

// ? @Description    Fetch all users except current user
// ? @Route          GET /api/users/except/:userId
// ? @Access         Private / Authorized
const fetchUsersExceptCurrentUser = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.userId },
      isAdmin: false,
    });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ Message: `User not found in the DB` });
    }
  } catch (error) {
    console.log('WTFfff?');
    console.log(`Error fetching users in DB. Error: ${error}`);
  }
};

// ? @Description    Fetch one user
// ? @Route          GET /api/users/
// ? @Access         Private / Authorized
const fetchUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      'accountabilityPartner'
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ Message: `User not found in the DB` });
    }
  } catch (error) {
    console.log('WTFzzzz?');
    console.log(`Error fetching user in DB. Error: ${error}`);
  }
};
// app.get('/api/users/except/:userId', async (req, res) => {
//   try {
//     const users = await User.find({ _id: {$ne: req.params.userId} });
//     if (users) {
//       res.status(200).json(users);
//     } else {
//       res.status(400).json({ Message: `User not found in the DB` });
//     }
//   } catch (error) {
//     console.log(`Error fetching users in DB. Error: ${error}`);
//   }
// });

// ? @Description    UPDATE accountability partner
// ? @Route          PATCH /api/users/partner
// ? @Access         Private / Authorized
const setAccountabilityPartner = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.updateOne(
      { _id: req.body.userId },
      { $set: { accountabilityPartner: req.body.contactId } },
      { new: true }
    );
    if (user) {
      console.log('VOVOKA', user);
      res.status(200).json(user);
    } else {
      res.status(400).json({ Message: `User not found in the DB` });
    }
  } catch (error) {
    console.log(`Error updating accountability partner in DB. Error: ${error}`);
  }
};

// ? @Description    UPDATE user profile
// ? @Route          PATCH /api/users/profile
// ? @Access         Private / Authorized
const updateUserProfile = async (req, res) => {
  console.log('ATAY KA!')
  console.log(req.files.data.data);
  const { userId, name, email, address, github, linkedIn } = req.body;

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
    console.log('wwwtf', data);
    // try {
    //   await Post.create({
    //     user,
    //     title,
    //     todayText,
    //     tomorrowText,
    //     blockersText,
    //     datePosted: today,
    //     image: data.Location,
    //   });
    // } catch (error) {
    //   console.log(`Error uploading image ${error}`);
    // }
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name,
            email,
            address,
            github,
            linkedIn,
            image: data.Location,
          },
        },
        { new: true }
      );
      if (user) {
        //! Generate an access token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        console.log('VOVOKA', user);
        res.status(200).json({ user, accessToken, refreshToken });
      } else {
        res.status(400).json({ Message: `User not found in the DB` });
      }
    } catch (error) {
      console.log(`Error updating user in DB. Error: ${error}`);
    }
    // res.send({
    //   response_code: 200,
    //   response_message: 'Success',
    //   response_data: data,
    // });
  });
};

// ? @Description    CREATE new user
// ? @Route          POST /api/users/signup
// ? @Access         Private / Authorized
const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ! Check if user already exists!
    const user = await User.findOne({ email });

    if (user) {
      console.log('Email exists!');
      res.status(409).json({ message: 'Email already exists!' });
    } else {
      try {
        //! Insert new user to DB
        const user = await User.create({ name, email, password });
        //! Generate an access token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.status(200).json({
          Message: `Successfully created account`,
          accessToken,
          refreshToken,
        });
      } catch (error) {
        console.log(`Error inserting new user in DB. ErrorMessage:${error}`);
      }
    }
  } catch (error) {
    console.log(`Error finding user in DB. Error: ${error}`);
  }
};

// ? @Description    Authenticate user
// ? @Route          POST /api/users/login
// ? @Access         PUBLIC
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    // if (!user) res.status(404).json({ Message: "Account doesn't Exist!" });
    // if (!match) res.status(401).json({ Message: 'Email/Password incorrect!' });
    if (!user || !match) {
      res.status(404).json({ Message: 'Email/Password incorrect!' });
    }
    if (match) {
      //! Generate an access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.status(200).json({
        Message: `Logged in successfully`,
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(500).json(`Error finding user in DB. ErrorMessage:${error}`);
  }
};

const Logout = (req, res) => {
  let refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json('Logged out successfully!');
};

module.exports = {
  Signup,
  Login,
  Logout,
  fetchUsersExceptCurrentUser,
  setAccountabilityPartner,
  fetchUser,
  updateUserProfile,
};
