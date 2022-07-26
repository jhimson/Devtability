const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const app = express();
const fileUpload = require('express-fileupload');
const moment = require('moment');

const Post = require('./models/M-post');
const cron = require('node-cron');
let shell = require('shelljs');

// GET TODAY'S DATE WITH 2022-07-26 format
// let today = new Date().toISOString().slice(0, 10);
// ! GET YESTERDAY'S DATE WITH THIS FORMAT 2022-07-26
const today = new Date()
const yesterday = new Date(today)
const yesterdayDate = new Date(yesterday.setDate(yesterday.getDate() - 1)).toISOString().slice(0, 10)
cron.schedule('5 * * * * *', async () => {
  // console.log('Scheduler running...');
  try {
    const response = await Post.find({
      user: '62de9f7720c24e70732d2629',
      datePosted: yesterdayDate,
    });
    if (!response.length) {
      console.log(response);
      console.log(`JHIMSON DID NOT POST! SEND AN EMAIL NOTIF`);
    } else {
      // console.log(moment(new Date(response[0].createdAt)).format('L'));
      console.log('JHIM POSTED!')
      console.log(response[0].title);
    }
  } catch (error) {
    console.log(`Eeeroooor: ${error}`);
  }
  if (shell.exec('dir').code !== 0) {
    console.log('Something went wrong');
  }
});

require('dotenv').config(); // Load ENV Variables
require('./config/database');

//! Middlewares
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ Message: 'Hello, World!' });
});

//! Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/R-user'));
app.use('/api/posts', require('./routes/R-post'));
app.use('/api/contacts', require('./routes/R-contact'));

const PORT = process.env.PORT;
const port = 8000;
app.listen(PORT || port, () =>
  console.log(`Now Listening on port ${PORT || port}`)
);
