const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor');
const Order = require('../../models/Order');
const logger = require('../../middlewares/logger');
const { isAuthenticated } = require('../../middlewares/authentication');


const vendorDashboardGetHandler = async (req, res) => {
    console.log('Function Name: Vendor Dashboard Get')
    const message = req.session.message;
    const token = req.session.token;
    const vendor = req.session.vendor;
    const isLoggedIn = req.session?.isLoggedIn;
    const allorders = await Order.find({})
    console.log('allorders', allorders)

    let context = {
        message: message,
        token: token,
        vendor: vendor,
        isLoggedIn: isLoggedIn,
        orders: allorders,
    };
    
    console.log(context);
    res.render('dashboard', context);
}


const orderDetailGetHandler = (req, res) => {
    console.log('Function Name: Order Detail Get Handler');
    res.render('orderDetail')
}

router.route('/:vendorName')
.get(logger, isAuthenticated, vendorDashboardGetHandler);

router.route('/order-detail')
.get(logger, orderDetailGetHandler)


module.exports = router;
