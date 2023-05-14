const Vendor = require('../models/Vendor');

const passwordValidator = (req, res, next) => {
    console.log('Function Name: passwordValidator');
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password.length < 8) {
        console.log('Password length is less than 8 characters');
        const context = {
            type: 'error',
            message: 'Password length is less than 8 characters',
        }
        res.render('auth/register', context);
    } else if (password !== confirmPassword) {
        console.log('Passwords do not match');
        const context = {
            type: 'error',
            message: 'Passwords do not match',
        };
        res.render('auth/register', context);
    } else {
        next();
    }
    
}
const phoneNumberValidator = async (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    const vendorExists = await Vendor.exists({ phoneNumber: phoneNumber });
    if (vendorExists) {
        const context = {
            type: 'error',
            message: 'User already exists',
        }
        res.render('auth/register', context);
    }
    if (phoneNumber.toString().length !== 10) {
        console.log('Invalid Phone Number');
        const context = {
            type: 'error',
            message: 'Invalid Phone Number',
        };
        res.render('auth/register', context);
    }
    next();
}

module.exports = {passwordValidator, phoneNumberValidator};