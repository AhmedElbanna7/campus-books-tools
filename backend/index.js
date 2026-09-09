const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require("dotenv").config();
const cors = require('cors');
const usersRouter = require('./router/users_router.js');
const listingsRouter = require('./router/listings_router.js');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/', usersRouter);
app.use('/', listingsRouter);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
