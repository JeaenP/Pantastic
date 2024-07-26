import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "No autorizado, debe logearse" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = token_decode; // Cambiamos de req.body.userId a req.user
        next();
    } catch (error) {
        console.log("JWT Error:", error);
        res.status(401).json({ success: false, message: "Token inválido o expirado" });
    }
};

export default authMiddleware;