const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require("dotenv").config();
const usersRouter = require('./router/users_router.js');

const app = express();


app.use(express.json());

app.use('/', usersRouter);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
