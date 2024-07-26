import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  progress: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  cartData: { type: Object, default: {} },
  googleId: { type: String },
  imageUrl: { type: String },
  clubs: [clubSchema] // Nuevo campo para almacenar los clubes a los que pertenece el usuario
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;