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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedback = exports.createFeedback = void 0;
const Feedback_1 = require("../models/Feedback");
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username === null || req.body.emoji === null || req.body.feedback === null) {
        res.status(400).json({
            error: 'Incomplete Reservation'
        });
    }
    else {
        yield Feedback_1.FeedbackModel.create({
            username: req.body.username,
            emoji: req.body.emoji,
            feedback: req.body.feedback
        })
            .then(() => {
            res.status(200).json({
                success: 'Feedback has been created'
            });
        })
            .catch(() => {
            res.status(500).json({
                error: 'An error occurred'
            });
        });
    }
});
exports.createFeedback = createFeedback;
const getFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacks = yield Feedback_1.FeedbackModel.find();
    res.status(200).json({
        feedbacks
    });
});
exports.getFeedback = getFeedback;
