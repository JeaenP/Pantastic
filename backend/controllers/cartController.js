import userModel from "../models/userModel.js";

// Añadir artículos al carrito
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.user.id, { cartData });
        res.json({ success: true, message: "Agregado al carrito" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Quitar artículos del carrito
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.user.id, { cartData });
        res.json({ success: true, message: "Quitado del carrito" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Obtener datos del carrito del usuario
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user.id);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };