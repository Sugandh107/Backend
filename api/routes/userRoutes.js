const express = require('express')
const router = express.Router();
const userController = require('../controller/userController');
const token=require("../middleware/verifyToken")
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', token, userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id' , token,verifyAdmin,userController.deleteUser);
router.get('/admin/:email',token, userController.getAdmin);
router.patch('/admin/:id' ,token, userController.makeAdmin);

module.exports = router;    