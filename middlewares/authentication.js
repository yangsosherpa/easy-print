const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');


const TOKEN_SECRET = 'secret';

async function verifyVendor(req, res, next) {
    console.log('Function Name: verifyVendor');
    const vendorNumber = req.body.phoneNumber;
    const password = req.body.password;
    const vendorExists = await Vendor.exists({ phoneNumber: vendorNumber });
    if (!vendorExists) {
        console.log('User does not exist');
        const context = {
            type: 'error',
            message: "User does not exist"
        }
        res.render('auth/login', context);
    }
    const vendor = await Vendor.findOne({ phoneNumber: vendorNumber });
    req.vendor = vendor;
    next();
}

function verifyPassword(req, res, next) {
    console.log('Function Name: verifyPassword');
    try {
        console.log(req.vendor);
        const vendor = req.vendor;
        const isValid = bcrypt.compareSync(
            req.body.password, 
            vendor.password
            );
        if (!isValid) {
            console.log('Password is not valid');
            const context = {
                type: 'error',
                message: "Invalid Password",
            }
            res.render('auth/login', context);
        }
        req.vendor.tokenObj = {
            vendor: vendor,
            isValid: true,
        }
        next();
    }catch(err) {
        console.log(err);
        const context = {
            type: 'error',
            message: "Invalid Password",
        }
        res.render('auth/login', context);
    }
}

async function generateToken(req, res, next) {
    console.log('Function Name: generateToken');
    try {
        console.log(req.vendor.tokenObj)
        const tokenObject = req.vendor.tokenObj;
        if (!tokenObject.isValid) {
            const context = {
                type: 'error',
                message: "Invalid Token"
            }
            res.render('auth/login', context);
        }
        const payload = {
            vendor: tokenObject.vendor,
        };
        const token = jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: 86400,
            } 
        );
        req.vendor.token = token;
        next(); 
        }catch(err) {
            console.log(err);
            res.render('auth/login', {type: 'error', message: 'Invalid Token'});
        }
};

function isAuthenticated (req, res, next) {
    console.log('Function Name: isAuthenticated');
    const token = req.session.token;
    console.log(token);
    if (!token) {
        console.log('Token not found');
        res.redirect('/auth/login');
    } else {
        try {
            const payload = jwt.verify(token, TOKEN_SECRET);
            console.log(payload);
            if (payload.vendor) {
                req.session.isLoggedIn = true;
                next();
            }
            else {
                const context = {
                    type: 'error',
                    message: 'Invalid Token',
                }
                res.render('/auth/login', context);
            }
        } catch (err) {
            console.log(err);
            const context = {
                type: 'error',
                message: 'Some Error Occured'
            }
            res.render('/auth/login', context);
        }
    }
}


module.exports = {verifyPassword, verifyVendor, generateToken, isAuthenticated}