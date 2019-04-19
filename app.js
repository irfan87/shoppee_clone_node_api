const express = require('express');
const morgan = require('morgan');
const app = express();

// import products query from products.js
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;