const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// import products query from products.js
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// handle the available routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// handling the error if page not found
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;