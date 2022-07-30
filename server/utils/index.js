const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
let shell = require('shelljs');
const AWS = require('aws-sdk');
require('dotenv').config(); // Load ENV Variables
require('../config/database');

// ! MODEL IMPORTS
const Post = require('../models/M-post');
const User = require('../models/M-user');

const generateAccessToken = (user) => {
  return jwt.sign({ user }, 'mySecretKey', {
    expiresIn: '30d',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, 'myRefreshSecretKey');
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'mySecretKey', (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated');
  }
};

const sendEmail = async (receiverEmail, message) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const response = await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: receiverEmail,
    subject: 'JHIMSON DID NOT POST A STANDUP YESTERDAY! REACH OUT TO HIM!',
    html: `<div> <h1>${message}</h1></div>`,
  });

  console.log(`Email sent`, response);
};

// ? Fetch all users and append userId & accountability email to users array.
const getUsersData = async (usersArray) => {
  try {
    const userList = await User.find({ isAdmin: false }).populate(
      'accountabilityPartner'
    );
    // console.log('this one', response);
    //! Append userId and accountability email to users array.
    if (userList) {
      userList?.map((user) => {
        usersArray.push({
          userId: user._id,
          partnerEmail: user.accountabilityPartner.email,
        });
      });
      // console.log(users);
      return usersArray;
    }
  } catch (error) {
    console.log(`Error fetching users. ErrorMessage:${error}`);
  }
};

const postChecker = (userId) => {
  let users = [];
  cron.schedule('5 * * * * *', async () => {
    // ! GET YESTERDAY'S DATE WITH THIS FORMAT 2022-07-26
    const today = new Date();
    const yesterday = new Date(today);
    const yesterdayDate = new Date(yesterday.setDate(yesterday.getDate() - 1))
      .toISOString()
      .slice(0, 10);

    users = await getUsersData(users);
    //? Looping through each of the userId and partEmail.
    // ? Checking if user posted a standup yesterday, if not send an email to accountability partner
    if (users) {
      // console.log(users);
      users?.map(async ({ userId, partnerEmail }) => {
        try {
          const response = await Post.find({
            user: userId,
            datePosted: yesterdayDate,
          }).populate('user');
          if (!response.length) {
            console.log(response);
            console.log(`JHIMSON DID NOT POST! SEND AN EMAIL NOTIF`);
            // console.log(response[0]?.user?.email);
            sendEmail(partnerEmail, 'HELLOOOO, World!!');
          } else {
            // console.log(moment(new Date(response[0].createdAt)).format('L'));
            console.log('JHIM POSTED!');
            // console.log(response[0]?.user?.email);
            // sendEmail(partnerEmail, 'HELLOOOO!');
          }
        } catch (error) {
          console.log(`Eeeroooor: ${error}`);
        }
      });
    }

    if (shell.exec('dir').code !== 0) {
      console.log('Something went wrong');
    }
  });
};


// GET TODAY'S DATE WITH 2022-07-26 format
// let today = new Date().toISOString().slice(0, 10);
// const postChecker = (userId) => {
//   cron.schedule('5 * * * * *', async () => {
//     // ! GET YESTERDAY'S DATE WITH THIS FORMAT 2022-07-26
//     const today = new Date();
//     const yesterday = new Date(today);
//     const yesterdayDate = new Date(yesterday.setDate(yesterday.getDate() - 1))
//       .toISOString()
//       .slice(0, 10);
//     // console.log('Scheduler running...');
//     try {
//       const response = await Post.find({
//         user: userId,
//         datePosted: yesterdayDate,
//       }).populate('user');
//       if (!response.length) {
//         console.log(response);
//         console.log(`JHIMSON DID NOT POST! SEND AN EMAIL NOTIF`);
//         console.log(response[0]?.user?.email);
//         sendEmail(response[0]?.user?.email, 'HELLOOOO!');
//       } else {
//         // console.log(moment(new Date(response[0].createdAt)).format('L'));
//         console.log('JHIM POSTED!');
//         console.log(response[0]?.user?.email);
//         sendEmail(response[0]?.user?.email, 'HELLOOOO!');
//       }
//     } catch (error) {
//       console.log(`Eeeroooor: ${error}`);
//     }
//     if (shell.exec('dir').code !== 0) {
//       console.log('Something went wrong');
//     }
//   });
// };

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verify,
  sendEmail,
  postChecker,
};
