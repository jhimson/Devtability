const User = require('../models/M-user');
const bcrypt = require('bcrypt');
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
// ? @Access         PUBLIC
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

// ? @Description    CREATE new user
// ? @Route          POST /api/users/signup
// ? @Access         PUBLIC
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
};
