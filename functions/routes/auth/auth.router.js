const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor');
const logger = require('../../middlewares/logger');
const { verifyPassword, verifyVendor, generateToken } = require('../../middlewares/authentication');
const { passwordValidator, phoneNumberValidator } = require('../../middlewares/validators');

const registerGetHandler = (req, res) => {
  console.log('Handler Function: Register Get')
  res.render('auth/register', {type: null, message: null});
}

const registerPostHandler = async (req, res) => {
  console.log('Handler Function: Register Post');

  const phoneNumber = req.body.phoneNumber;
  const vendorName = req.body.vendorName;
  const password = req.body.password;

  // console.log(`Phone Number: ${phoneNumber}`);
  const vendorObj = {
    phoneNumber: phoneNumber,
    name: vendorName,
    password: password,
  }
  const newVendor = new Vendor(vendorObj);
  newVendor.save().then(() => {
    console.log(`${newVendor.name} saved to database`);
  }).catch(err => {
    console.log(err);
  });
  const context = {
    type: 'success',
    message: 'User created successfully! Login to Enter Dashboard.'
  }
  res.render('auth/login', context);
}

const loginGetHandler = (req, res) => {
  console.log('Handler Function: Login Get');
  const context = {
    type: null,
    message: null,
  }
  res.render('auth/login', context);
}

const loginPostHandler = (req, res) => {
  console.log('Handler Function: Login Post');
  try {
    const token = req.vendor.token;
    req.session.token = token;
    req.session.message = 'Login Successful';
    req.session.vendor = req.vendor;
    console.log(req.session)
    const context = {
      type: 'success',
      message: 'Login Successful',
    }
    res.redirect(`/vendor/${req.vendor.name}`);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send('Internal Server Error');
  }
}


const logoutGetHandler = (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.redirect('/auth/login');
}

router.route('/register')
.get(logger, registerGetHandler)
.post(logger, phoneNumberValidator, passwordValidator, registerPostHandler);

router.route('/login')
.get(logger, loginGetHandler)
.post(logger, verifyVendor, verifyPassword, generateToken, loginPostHandler);

router.get('/logout', logoutGetHandler);

module.exports = router;
