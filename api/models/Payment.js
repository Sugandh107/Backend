const mongoose =require('mongoose')
const {Schema}= mongoose

const paymentSchema =new Schema({
        email:String,
        transactionId:String,
        price:Number,
        quantity:Number,
        status:String,
        itemName:Array,
        cartitems:Array,
        menuItems:Array,
        itemImage:Array,
        createdAt: {
            type: Date,
            default: Date.now
        }
})
const Payment = mongoose.model('Payment',paymentSchema)

module.exports=Payment