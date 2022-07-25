const User = require('../models/M-user');

// ? @Description    CREATE new user
// ? @Route          POST /api/users
// ? @Access         Private / Authorized user
const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    if (newUser)
      res
        .status(200)
        .json({ Message: `Successfully created user`, user: newUser });
  } catch (error) {
    console.log(`Failed to insert/create new user. ErrorMessage: ${error}`);
    res.status(500).json({ Message: error });
  }
};

module.exports = { createNewUser };
