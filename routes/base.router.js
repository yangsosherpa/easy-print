const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('View Handler Index');
    console.log(req.session);
    /* 
    If the user is not logged out the isLoggedIn is set to true
    If the user is logged out session has not isLoggedIn property
     */
    if (req.session?.isLoggedIn) {
        const context = {
            isLoggedIn: true,
            vendor: req.session.vendor,
        }
        res.render('index', context);
        return
    }
    res.render('index', { isLoggedIn: false });
});


router.get('/print-form', (req, res)=>{
    console.log('View Handler Print Form');
    if (req.session?.isLoggedIn) {
        const context = {
            isLoggedIn: true,
            vendor: req.session.vendor,
        }
        res.render('print-form', context);
        return
    } else {
        res.render('print-form', {isLoggedIn: false});
    };
});



module.exports = router;