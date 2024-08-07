const Carts = require("../models/Carts");
//get items
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;  
    const query={email:email};
    const result=await Carts.find(query)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//add item
const addToCart = async(req, res) => {
    const {menuItemId, name, image, price, quantity,email } = req.body;
    // console.log(email)
    try {
        // exiting menu item
        const existingCartItem = await Carts.findOne({email, menuItemId });
        // console.log(existingCartItem)
        if(existingCartItem){
            return res.status(400).json({message: "Item Already in cart . You can add another"});
        }

        const cartItem = await Carts.create({
            menuItemId, name, image, price, quantity,email 
        })

        res.status(201).json(cartItem)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//delete
const deleteCart =  async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message: "Cart Items not found!"})
        }
        res.status(200).json({message: "Cart Item Deleted Successfully!"})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update

const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity,email } = req.body;

    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId, {menuItemId, name, recipe, image, price, quantity,email }, {
                new: true, runValidators: true
            }
        )
        if(!updatedCart){
            return res.status(404).json({ message: "Cart Item not found"})
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart
};
