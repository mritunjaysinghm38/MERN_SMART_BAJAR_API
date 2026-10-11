import { Payment } from "../Models/Payment.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config();

// const razorpay = new Razorpay({ key_id: 'cbbbbbbffffff', key_secret: 'mmmmmmmmnnnnnn' })

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })



// export const checkout = async (req, res) => {
//   const { amount, cartItems, userShipping, userId } = req.body
//   let options = {
//     amount: amount * 100,  // Amount is in currency subunits. 
//     currency: "INR",
//     receipt: `receipt_${Date.now()}`
//   };
//   const order = await razorpay.orders.create(options);

//   console.log("gffffffffffffffff")
//   res.json({
//     orderId: order.id,
//     amount: amount,
//     cartItems,
//     userShipping,
//     userId,
//     payStates: "created"
//   })
// }
//checkout
export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    console.log("Received amount:", amount);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    console.log("Creating Razorpay order...");

    const order = await razorpay.orders.create(options);

    console.log("Razorpay order created:", order.id);

    res.status(200).json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStates: "created"
    });

  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//verify
export const verify = async (req, res) => {
  const { orderId,
    payment_id,
    signature,
    qty,
    amount,
    orderItems,
    userId,
    userShipping } = req.body

  let orderConfirm = await Payment.create(
    {
      orderId,
      payment_id,
      signature,
      qty,
      amount,
      orderItems,
      userId,
      userShipping,
      paystatus: "paid"
    });
  res.json({ message: "order2 added", orderConfirm, success: true });

}

//userSpecificOrder
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString()
  let orders = await Payment.find({ userId }).sort({ orderDate: -1 })
  res.json(orders)

}

//all orders (for admin) 
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 })
  res.json(orders)
}








// const razorpay = new Razorpay({ key_id: 'rzp_test_Tiy5lmZyjH0qha', key_secret: 'gWBObUmL0uPrtzHnDpqnJmR9' })