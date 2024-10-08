import express from 'express';
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import upload from '../config/s3.js';

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), upload.single('paymentImage'), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
