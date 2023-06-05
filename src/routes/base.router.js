const express = require('express');
const router = express.Router();
const Vendors = require('../models/Vendor')
const Orders = require('../models/Order')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
/*
 * Used diskstorage for uploads
*/
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        console.log('Saving file in storage');
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20,  // max-size of upload is 20MB
    },
});


const indexGetHandler = (req, res) => {
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

};

const printFormGetHandler = async (req, res) => {
    console.log('View Handler Print Form');
    const vendors = await Vendors.find()
    if (req.session?.isLoggedIn) {
        const context = {
            isLoggedIn: true,
            vendor: req.session.vendor,
            vendors: vendors,
        }
        res.render('print-form', context);
        return
    } else {
        const context = {
            isLoggedIn: false,
            vendors: vendors,
            msg: null,
            err: null,
        }
        res.render('print-form', context);
    };

};

const printFormPostHandler = async (req, res) => {
    console.log('View Handler Print Form Post');

    const vendors = await Vendors.find()
    const dropPoint = req.body.droppoint;  // destination for the files to be delivered
    const vendorid = req.body.vendorid;  // id of the vendor
    const files = req.files.map(file => {
        return {
            originalname: file.originalname,
            filename: file.filename,
            contentType: file.mimetype,
            data: fs.readFileSync(file.path),
        }
    })

    console.log(Array.isArray(files));


    // save file in schema
    const newOrder = Orders({
        files: files,
        dropPoint: dropPoint
    })
    newOrder.save();

    const context = {
        isLoggedIn: false,
        vendors: vendors,
        msg: "Files successfully uploaded",
        err: null,
    }

    const vendor = await Vendors.findOne({_id: vendorid});
    vendor.orders.push(newOrder._id);
    vendor.save(); 
    console.log(vendor.orders)
    console.log(context.msg)


    res.render('print-form', context);
}


router.get('/', indexGetHandler);

router.route('/print-form')
.get(printFormGetHandler)
.post(upload.array('files', 5), printFormPostHandler)

module.exports = router;
