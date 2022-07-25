const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const app = express();
const fileUpload = require('express-fileupload');


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


const PORT = process.env.PORT;
const port = 8000;
app.listen(PORT || port, () =>
  console.log(`Now Listening on port ${PORT || port}`)
);
