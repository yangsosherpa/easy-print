const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});


router.get('/print-form', (req, res)=>{
    res.render('print-form');
})



module.exports = router;