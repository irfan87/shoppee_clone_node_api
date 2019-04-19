const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    })
});

router.post('/', (req, res, next) => {
    const product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
    };

    res.status(200).json({
        message: "Handling POST request to /products",
        createdProduct: product
    });
});

router.get('/:product_id', (req, res, next) => {
    const id = req.params.product_id;

    if(id === "special") {
        res.status(201).json({
            message: "You discovered the special id",
            id: id
        });
    } else {
        res.status(200).json({
            message: "You passed an ID"
        })
    }
});

router.patch('/:product_id', (req, res, next) => {
    res.status(200).json({
        message: "Product updated!"
    });
});

router.delete('/:product_id', (req, res, next) => {
    res.status(200).json({
        message: "Product deleted!"
    });
});

module.exports = router;