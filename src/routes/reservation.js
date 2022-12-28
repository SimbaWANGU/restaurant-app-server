"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationRouter = void 0;
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const reservationRouter = (0, express_1.Router)();
exports.reservationRouter = reservationRouter;
reservationRouter.post('/create', (req, res) => {
    if (req.isAuthenticated != null) {
        (0, reservationController_1.createReservation)(req, res)
            .then(() => { })
            .catch(() => { });
    }
    else {
        res.json({
            error: 'You need to login'
        });
    }
});
reservationRouter.get('/:username', (req, res) => {
    if (req.isAuthenticated != null) {
        (0, reservationController_1.getReservation)(req, res)
            .then(() => { })
            .catch(() => { });
    }
    else {
        res.json({
            error: 'You need to login'
        });
    }
});
reservationRouter.delete('/:id', (req, res) => {
    if (req.isAuthenticated != null) {
        (0, reservationController_1.deleteReservation)(req, res)
            .then(() => { })
            .catch(() => { });
    }
    else {
        res.json({
            error: 'You need to login'
        });
    }
});
