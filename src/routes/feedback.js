"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const express_1 = require("express");
const feedbackController_1 = require("../controllers/feedbackController");
const feedbackRouter = (0, express_1.Router)();
exports.feedbackRouter = feedbackRouter;
feedbackRouter.post('/create', (req, res) => {
    if (req.isAuthenticated != null) {
        (0, feedbackController_1.createFeedback)(req, res)
            .then(() => { })
            .catch(() => { });
    }
    else {
        res.status(401).json({
            error: 'You need to login'
        });
    }
});
feedbackRouter.get('/', (req, res) => {
    (0, feedbackController_1.getFeedback)(req, res)
        .then(() => { })
        .catch(() => { });
});
