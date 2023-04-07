require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require("http");
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const { connectSocket } = require('./socket_io/messageHandler');

const PORT = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app);
const io = socketIo(server);

connectSocket(io);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log('Server started on PORT = ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

start();