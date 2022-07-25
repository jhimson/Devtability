const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const app = express();



//! Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cors());



app.listen(8000, () => console.log('Backend server is running on port 8000'));
