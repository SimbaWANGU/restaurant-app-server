"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const auth_1 = require("./src/routes/auth");
const reservation_1 = require("./src/routes/reservation");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
// initialize app
const app = express();
const port = 3000;
// middleware
const mongoUrl = process.env.MONGODB_URL;
const secret = process.env.SECRET;
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
try {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}
catch (err) {
    console.log(err);
}
// routes
app.use('/', auth_1.authRouter);
app.use('/reserve', reservation_1.reservationRouter);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
