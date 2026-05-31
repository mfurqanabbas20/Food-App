const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order from frontend

const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5174";
  try {
    const newOrder = {
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    };
    const order = await orderModel.create(newOrder);
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Payment

    const line_items = req.body.items.map((item, index) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2*100*80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to Perform Task" });
  }
};

const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if(success == "true"){
      await orderModel.findByIdAndUpdate(orderId, {payment: true})
      res.json({success: true, message: 'Paid'})
    }
    else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success: false, message: 'Not Paid'})
    }
  } catch (error) {
    console.log(error);
    res.json({success: false, message: 'Error'})
  }
}
// user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId: req.body.userId})
    res.json({success: true, data: orders})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: 'Error'})
    
  }
}

// Listing order for admin panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success: true, data: orders})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: 'Error'})
    
  }
}


// for updating status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
    res.json({success: true, message: 'Updated Successfully'})
  } catch (error) {
    console.log(error);
    res.json({success: true, message: 'Error'})
    
  }
}

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};

// Web Hooks
