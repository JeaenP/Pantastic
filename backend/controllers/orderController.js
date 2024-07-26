import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
import { io } from "../server.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://pantastic-frontend.onrender.com";
  try {
    const address = typeof req.body.address === 'string' ? JSON.parse(req.body.address) : req.body.address;
    const items = typeof req.body.items === 'string' ? JSON.parse(req.body.items) : req.body.items;

    if (!address || !items || !req.body.amount || !req.body.paymentMethod) {
      return res.status(400).json({ success: false, message: "Datos incompletos" });
    }

    const newOrder = new orderModel({
      userId: req.user.id, // Usamos req.user.id
      items: items,
      amount: req.body.amount,
      address: address,
      paymentMethod: req.body.paymentMethod
    });

    if (req.body.paymentMethod === 'ahorita') {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No se ha subido ninguna imagen" });
      }
      newOrder.paymentImage = req.file.location;
    }

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    if (req.body.paymentMethod === 'tarjeta') {
      const line_items = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity
      }));
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Costo de envio"
          },
          unit_amount: 200
        },
        quantity: 1
      });

      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
      });

      res.json({ success: true, session_url: session.url });
    } else if (req.body.paymentMethod === 'ahorita') {
      res.json({ success: true, message: "Pedido creado con éxito. Adjunta la imagen del pago." });
    }
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Pagado" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "No Pagado" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user order for frontend 
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });

    // Separate pending and completed orders
    const pendingOrders = orders.filter(order => order.status !== "Completado");
    const completedOrders = orders.filter(order => order.status === "Completado").sort((a, b) => b.date - a.date);

    // Limit completed orders to 5 and delete the rest
    const excessCompletedOrders = completedOrders.slice(5);
    const limitedCompletedOrders = completedOrders.slice(0, 5);

    // Delete excess completed orders from database
    for (const order of excessCompletedOrders) {
      await orderModel.findByIdAndDelete(order._id);
    }

    res.json({ success: true, data: { pendingOrders, limitedCompletedOrders } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// listing order for admin panel 
const listPendingOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: { $ne: "Completado" } });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await orderModel.find({ status: "Completado" }).sort({ date: -1 }).limit(5);
    res.json({ success: true, data: completedOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status 
const updateStatus = async (req, res) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status }, { new: true });
    io.emit('orderStatusUpdated', updatedOrder); // Emite el evento de actualización de estado
    res.json({ success: true, message: "Estado Actualizado" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const completeOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: "Completado" });
    res.json({ success: true, message: "Pedido Completado" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error al completar el pedido" });
  }
};

export { placeOrder, verifyOrder, userOrders, updateStatus, listCompletedOrders ,  listPendingOrders, completeOrder  }
