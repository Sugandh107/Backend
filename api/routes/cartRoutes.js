const express = require('express')
const router =express.Router()
const Cart = require("../models/Carts");
const cartControllers = require('../controller/cartControllers');
const token=require("../middleware/verifyToken")


router.get('/',cartControllers.getCartByEmail);
router.post('/',cartControllers.addToCart)
router.delete('/:id',cartControllers.deleteCart)
router.put('/:id', cartControllers.updateCart)

module.exports=router;
    