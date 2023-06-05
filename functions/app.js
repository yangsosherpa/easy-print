const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const path = require('path');
const port = 3000;
const serverless = require('serverless-http');

const BaseRouter = require('./routes/base.router');
const AuthRouter = require('./routes/auth/auth.router');
const VendorRouter = require('./routes/auth/vendor.router');

const db = require('./models');

// Connection to database
mongoose.connect('mongodb://localhost:27017/easyprint', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB');
    process.exit();
});

const static_files = path.join(__dirname, 'static');

// BuiltIn Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_files));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Using Routers
app.use('/.netlify/functions/app', BaseRouter);
app.use('/auth', AuthRouter);
app.use('/vendor', VendorRouter);


// Main Server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});


module.exports = app;
module.exports.handler = serverless(app);