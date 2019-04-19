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

// setup cors -- oooo.. crapp
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

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