const User = require('../models/M-user');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
} = require('../utils/index');

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
        await User.create({ name, email, password });
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
    if (!user) res.status(404).json({ Message: "Account doesn't Exist!" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) res.status(401).json({ Message: 'Email/Password incorrect!' });
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

  // const user = users.find(
  //   (u) => u.username === username && u.password === password
  // );
};

module.exports = { Signup, Login };
