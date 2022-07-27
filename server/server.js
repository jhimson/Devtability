const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const fileUpload = require('express-fileupload');

require('dotenv').config(); // Load ENV Variables
require('./config/database');
const { postChecker } = require('./utils/index');

//! Middlewares
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

// postChecker();

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
