require('dotenv').config(); // Load ENV Variables
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


app.get('/', (req, res) => {
    res.status(200).json({Message: 'Hello, World!'})
})


const PORT = process.env.PORT;
const port = 8000;
app.listen(PORT || port, () => console.log(`Now Listening on port ${PORT || port}`));
