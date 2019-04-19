const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /orders"
    })
});

router.post('/', (req, res, next) => {
    const order = {
        product_id: req.body.product_id,
        order_quantity: req.body.order_quantity
    };

    res.status(201).json({
        message: "Orders created",
        createdOrder: order
    });
});

router.get('/:order_id', (req, res, next) => {
    const orderId = req.params.order_id;

    if(orderId === "special") {
        res.status(201).json({
            message: "You discovered the special id",
            orderId: orderId
        });
    } else {
        res.status(200).json({
            message: "You passed an ID"
        })
    }
});

router.patch('/:order_id', (req, res, next) => {
    res.status(200).json({
        message: "Product updated!"
    });
});

router.delete('/:order_id', (req, res, next) => {
    res.status(200).json({
        message: "Product deleted!"
    });
});

module.exports = router;