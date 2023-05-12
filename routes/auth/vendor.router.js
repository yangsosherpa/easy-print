const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor');
const logger = require('../../middlewares/logger');
const { isAuthenticated } = require('../../middlewares/authentication');


const vendorDashboardGetHandler = (req, res) => {
    const message = req.session.message;
    const token = req.session.token;
    const vendor = req.session.vendor;
    const isLoggedIn = req.session?.isLoggedIn;
    const context = {
        message: message,
        token: token,
        vendor: vendor,
        isLoggedIn: isLoggedIn,
    };
    res.render('dashboard', context);
}

router.route('/:vendorName')
.get(logger, isAuthenticated, vendorDashboardGetHandler);


module.exports = router;