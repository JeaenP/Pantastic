import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// login 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Usuario no existe" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Datos incorrectos" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // verificando si el usuario ya existe
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "El usuario ya existe" });
        }
        // verificando el formato del email y contraseña lo suficientemente segura
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email invalido" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "La contraseña debe tener el menos 8 caracteres" });
        }
        // hashing 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Google login
const googleLogin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({
                name,
                email,
                password: '',
                googleId: payload.sub,
                imageUrl: picture, 
            });
            await user.save();
        }

        const token = createToken(user._id);

        res.json({ success: true, token, profileImageUrl: picture }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error en la autenticación con Google" });
    }
};

export { loginUser, registerUser, googleLogin };
