const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        product_name: req.body.product_name,
        product_price: req.body.product_price
    });

    product.save().then(result => {
        console.log(result);

        res.status(200).json({
            message: "Handling POST request to /products",
            createdProduct: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.get('/:product_id', (req, res, next) => {
    const id = req.params.product_id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);

        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Invalid entry found for provided ID"
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.patch('/:product_id', (req, res, next) => {
    const id = req.params.product_id;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({
        _id: id
    }, {
        $set: updateOps
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.delete('/:product_id', (req, res, next) => {
    const id = req.params.product_id;

    Product.deleteOne({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;