import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    }
  },
  status: { type: String, default: "Verificando Pago" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true },
  paymentImage: { type: String }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
