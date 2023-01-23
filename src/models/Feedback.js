"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModel = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});
const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);
exports.FeedbackModel = FeedbackModel;
