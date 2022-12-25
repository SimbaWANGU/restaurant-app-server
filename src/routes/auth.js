"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post('/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.userModel.register({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }, req.body.password);
        passport_1.default.authenticate('local')(req, res, () => {
            res.json({
                username: req.body.username,
                message: 'You have created a new account'
            });
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            err
        });
    }
}));
authRouter.post('/auth/login', (req, res) => {
    const user = new User_1.userModel({
        username: req.body.username,
        password: req.body.password
    });
    try {
        req.login(user, () => {
            passport_1.default.authenticate('local')(req, res, () => {
                res.json({
                    username: req.body.username,
                    message: 'You have access',
                    status: 200
                });
            });
        });
    }
    catch (err) {
        res.json({
            lmao: 'You\'re not in'
        });
    }
});
