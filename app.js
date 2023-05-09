const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const BaseRouter = require('./routes/base-router');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('static'));

// Using Base Router
app.use('/', BaseRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});