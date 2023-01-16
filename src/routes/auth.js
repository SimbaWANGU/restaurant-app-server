"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
// initialize router
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
passport_1.default.use(User_1.userModel.createStrategy());
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    try {
        const user = User_1.userModel.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
authRouter.post('/auth/register', (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email
    };
    User_1.userModel.register(new User_1.userModel(user), req.body.password, (err, user) => {
        if (err instanceof Error) {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
        passport_1.default.authenticate('local')(req, res, () => {
            res.status(200).json({
                username: req.body.username,
                message: 'You have created a new account'
            });
        });
    });
});
authRouter.post('/auth/login', (req, res) => {
    const user = new User_1.userModel({
        username: req.body.username,
        password: req.body.password
    });
    try {
        req.login(user, () => {
            passport_1.default.authenticate('local')(req, res, () => {
                res.status(200).json({
                    username: req.body.username,
                    message: 'You have access'
                });
            });
        });
    }
    catch (err) {
        res.status(500).json({
            lmao: 'An error occurred'
        });
    }
});
