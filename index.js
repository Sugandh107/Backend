const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const stripe = require('stripe')('sk_test_51PagEySCLk0NHLSaIdF5QZXb28SgysnqPXQuwiuXspri6Krm3PPg2qqJgu0mQoU2z20I2JZa7zXCCbAZqv103JZd00zLPcz3MR');

const port = 3000;

app.use(cors());
app.use(express.json());
// mongodb+srv://riderghost10791:Ft5YSDIKsiNFXXY6@rest-database.zgxw9ce.mongodb.net/rest-database?retryWrites=true&w=majority&appName=rest-database

mongoose.connect('mongodb+srv://riderghost10791:Ft5YSDIKsiNFXXY6@rest-database.zgxw9ce.mongodb.net/rest-database?retryWrites=true&w=majority&appName=rest-database')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "8cb3920556475ac0e1e9bc1a3500d43910ec491e041d709068257a55af51733df079d058a17731eac45189fa4d2dc93dfe59922d1ba4ea784e483d67cb0b740a", {
    expiresIn: '1hr'
  });
  res.send({ token });
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, "8cb3920556475ac0e1e9bc1a3500d43910ec491e041d709068257a55af51733df079d058a17731eac45189fa4d2dc93dfe59922d1ba4ea784e483d67cb0b740a", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const usePayment = require('./api/routes/paymentRoutes');
const useadmin = require('./api/routes/adminRoutes');
const Razorpay = require('razorpay');

app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/payment', usePayment);
app.use('/adminstat', useadmin);


// Payment endpoint stripe
// app.post("/create-payment-intent", async (req, res) => {
//   const { price, description } = req.body;
//   const amount = Math.round(price * 100); // Convert to cents

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       description: description || "Export transaction",
//       payment_method_types: ["card"],
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Stripe payment intent creation error:', error);
//     res.status(500).send({ error: 'Payment Intent creation failed' });
//   }
// });

// app.post("/create-setup-intent", async (req, res) => {
//   try {
//     const setupIntent = await stripe.setupIntents.create({
//       payment_method_types: ["card"],
//     });

//     res.send({
//       clientSecret: setupIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Stripe setup intent creation error:', error);
//     res.status(500).send({ error: 'Setup Intent creation failed' });
//   }
// });


const MIN_AMOUNT =20
//razor pay
app.post('/order',async (req,res)=>{
 
  try{
  const razorpay=new Razorpay({
    key_id:'rzp_test_Rl1KSRpOp7Zj5Y',
    key_secret:'ejqYzBswfGqyvZNyBNN0udRt'
  })
  const options=req.body;
  console.log(options);
  const order=await razorpay.orders.create(options)
  if(!order){
    return res.status(500).send("error");
  }
  res.json(order)
}catch(error){
  console.log(error);
}
})


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
