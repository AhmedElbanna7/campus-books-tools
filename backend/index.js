const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const usersRouter = require('./router/users_router.js');

const app = express();

app.use(express.json());

app.use('/', usersRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('database connected');
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
