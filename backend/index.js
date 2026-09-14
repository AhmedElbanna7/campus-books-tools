const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require("dotenv").config();
const cors = require('cors');
const multer = require('multer');
const usersRouter = require('./router/users_router.js');
const listingsRouter = require('./router/listings_router.js');
const favoritesRouter = require('./router/favorites_router.js');
const adminRouter = require('./router/admin_router.js');

const app = express();
app.use(express.json());

const allowedOrigins = [
  // "https://your-app.vercel.app",
  "http://localhost:5173",
];
app.use(cors({
  origin: function (origin, callback) {

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use('/', usersRouter);
app.use('/', listingsRouter);
app.use('/', favoritesRouter);
app.use('/admin', adminRouter);
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only JPG')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong'
  });
});
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
