const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor');
const logger = require('../../middlewares/logger');
const { verifyPassword, verifyVendor, generateToken } = require('../../middlewares/authentication');

const registerGetHandler = (req, res) => {
  const message = req.session?.message;
  res.render('auth/register', {message: message});
}

const registerPostHandler = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const vendorName = req.body.vendorName;
  const password = req.body.password;

  console.log(`Phone Number: ${phoneNumber}`);
  userExists = await Vendor.exists({ phoneNumber: phoneNumber });
  if (userExists) {
    const context = { 
      message: "User already exists"
    }
    res.render('auth/register', context);
  }

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
    message: 'User created successfully'
  }
  res.render('auth/register', context);
}

const loginGetHandler = (req, res) => {
  res.render('auth/login');
}

const loginPostHandler = (req, res) => {
  try {
    const token = req.vendor.token;
    req.session.token = token;
    req.session.message = 'Login Successful';
    req.session.vendor = req.vendor;
    console.log(req.session)
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
.post(logger, registerPostHandler);

router.route('/login')
.get(logger, loginGetHandler)
.post(logger, verifyVendor, verifyPassword, generateToken, loginPostHandler);

router.get('/logout', logoutGetHandler);

module.exports = router;