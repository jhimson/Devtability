const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const fileUpload = require('express-fileupload');

require('dotenv').config(); // Load ENV Variables
require('./config/database');
const { postChecker } = require('./utils/index');

const corsOptions = {
	origin: "https://devtability.netlify.app"
};

//! Middlewares
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

postChecker();

app.get('/', (req, res) => {
  res.status(200).json({ Message: 'Hello, World!' });
});

//! Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/R-user'));
app.use('/api/posts', require('./routes/R-post'));
app.use('/api/contacts', require('./routes/R-contact'));
app.use('/api/comments', require('./routes/R-comment'));
app.use('/api/replies', require('./routes/R-reply'));
app.use('/api/conversations', require('./routes/R-conversation'));
app.use('/api/messages', require('./routes/R-message'));

const PORT = process.env.PORT;
const port = 8000;
app.listen(PORT || port, () =>
  console.log(`Now Listening on port ${PORT || port}`)
);
