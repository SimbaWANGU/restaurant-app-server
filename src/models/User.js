"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
const userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;
