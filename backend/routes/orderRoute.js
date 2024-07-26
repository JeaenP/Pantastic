import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listPendingOrders, listCompletedOrders, completeOrder, updateStatus } from "../controllers/orderController.js";
import upload from '../config/s3.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, upload.single('paymentImage'), placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/pending", listPendingOrders);
orderRouter.get("/listCompletedOrders", listCompletedOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/complete", completeOrder);


export default orderRouter;
