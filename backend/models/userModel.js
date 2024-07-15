import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    cartData: { type: Object, default: {} },
    googleId: { type: String }, // Nuevo campo para almacenar el ID de Google
    imageUrl: { type: String }, // Nuevo campo para almacenar la URL de la imagen de perfil
},{ minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;