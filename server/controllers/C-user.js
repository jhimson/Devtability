require('dotenv').config();
const User = require('../models/M-user');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const crypto = require('crypto');
const {
  generateAccessToken,
  generateRefreshToken,
  sendEmailVerification,
} = require('../utils/index');

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

// ? @Description    Fetch all users except current user
// ? @Route          GET /api/users/search/:userId/:searchText
// ? @Access         Private / Authorized
const searchPerson = async (req, res) => {
  //! Capitalize the first letter of the search text
  if (req.body.searchText !== '') {
    req.body.searchText =
      req.body.searchText.charAt(0).toUpperCase() +
      req.body.searchText.slice(1);
  }
  try {
    const users = await User.find({
      _id: { $ne: req.params.userId },
      name: { $regex: req.body.searchText },
      isAdmin: false,
    });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(200).json([]);
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
  let image = null;
  console.log('ATAY KA!');
  // console.log('wtf',req.files.data.data);
  if (req.files?.data) {
    console.log('ASA KA!');
  } else {
    console.log('GAGO KA!');
  }
  const { userId, name, email, address, github, linkedIn } = req.body;
  const user = await User.findOne({ _id: userId });
  if (user) {
    image = user.image;
  }

  if (req?.files?.data) {
    console.log('AYUUS!');
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
      if (data) {
        try {
          const updatedUser = await User.findOneAndUpdate(
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
          if (updatedUser) {
            //! Generate an access token
            const accessToken = generateAccessToken(updatedUser);
            const refreshToken = generateRefreshToken(updatedUser);
            refreshTokens.push(refreshToken);
            // console.log('VOVOKA', updatedUser);
            res.status(200).json({ updatedUser, accessToken, refreshToken });
          } else {
            res.status(400).json({ Message: `User not found in the DB` });
          }
        } catch (error) {
          console.log(`Error updating user in DB. Error: ${error}`);
        }
      }
    });
  } else {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name,
            email,
            address,
            github,
            linkedIn,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        //! Generate an access token
        const accessToken = generateAccessToken(updatedUser);
        const refreshToken = generateRefreshToken(updatedUser);
        refreshTokens.push(refreshToken);
        // console.log('VOVOKA', updatedUser);
        res.status(200).json({ updatedUser, accessToken, refreshToken });
      } else {
        res.status(400).json({ Message: `User not found in the DB` });
      }
    } catch (error) {
      console.log(`Error updating user in DB. Error: ${error}`);
    }
  }
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
        const user = await User.create({
          name,
          email,
          password,
          emailToken: crypto.randomBytes(64).toString('hex'),
        });
        //! Generate an access token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        if (user) {
          sendEmailVerification(user, req);
          res.status(200).json({
            Message: `Successfully created account`,
            accessToken,
            refreshToken,
          });
        }
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
    if (user.isVerified) {
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
          value: 1,
          accessToken,
          refreshToken,
        });
      }
    } else {
      res
        .status(200)
        .json({ Message: `Please verify your email to login`, value: 0 });
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

const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.send('Successfully verified email. You can close this tab now.');
    } else {
      res.send('Email is not verified');
    }
  } catch (error) {
    console.log(`Error verifying email`);
  }
  // res.send('NICE!')
};

module.exports = {
  Signup,
  Login,
  Logout,
  fetchUsersExceptCurrentUser,
  setAccountabilityPartner,
  fetchUser,
  updateUserProfile,
  verifyEmail,
  searchPerson,
};
