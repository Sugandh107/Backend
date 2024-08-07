const express = require('express');
const Payment = require('../models/Payment');
const Carts = require('../models/Carts');
const router = express.Router();
const mongoose =require('mongoose')
const Menu =require('../models/Menu')
const User =require('../models/User')

router.get('/',async(req,res)=>{
    try {
        const user=await User.countDocuments();
        const menuItems= await Menu.countDocuments();
        const payment= await Payment.countDocuments();

        const result=await Payment.aggregate([{
            $group:{
                _id:null,
                totalRevenue:{
                    $sum:'$price'
                }
            }
        }])
        const revenue =result.length >0?result[0].totalRevenue : 0;
        res.status(200).json({
            user,menuItems,payment,revenue
        })
        
    } catch (error) {
        res.status(500).json({message:error})
    }
})
module.exports=router;