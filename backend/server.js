import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import http from "http"; // Importa el módulo HTTP
import { Server } from "socket.io"; // Importa el servidor de Socket.IO
import clubRouter from './routes/clubRoute.js';
import eventRouter from './routes/eventRoute.js';


// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use('/api/club', clubRouter);
app.use('/api/event', eventRouter);

app.get("/", (req, res) => {
    res.send("API working");
});

// Crea un servidor HTTP con la aplicación de Express
const server = http.createServer(app);

// Crea una instancia de Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Permite todas las solicitudes de origen cruzado (CORS)
    },
});

// Manejo de eventos de conexión de Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Exporta la instancia de Socket.IO para usarla en otros módulos
export { io };

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});