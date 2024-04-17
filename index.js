import cors from "cors";
import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

// io server create edildi
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// emit degerleri gonderme islemi, on ile alma islemleri yapiliyor.

// io connect saglandi
io.on("connection", (socket) => {
    console.log(socket.id)

    // ilk parametre front tarafından yazılan emit ilk parametre ile match olmalı (room).
    socket.on('room', (data) => {
        console.log(data)
        socket.join(data)   // oda girilmesi saglandi room number eger 2 tarafinda dogru değil ise mesajlasamazlar
    });

    // chat.jsx dosyasinda yazilan deger data olarak consol yazildi.
    
    // socket.broadcast.emit("messageReturn", data):
    
    // ile karsi tarafin ekranına gönderme ve mesajların yayınlanmasi saglanir
    
    // socket.to(data.room).emit("messageReturn", data), room numaraları match ise mesajlasma saglanir
    // data ile verileri aldıktan sonra messageReturn ile veriler gonderiliyor
    // front end tarafinda bu mesajların karsilanmasi saglanir

    
    socket.on('message', (data) => {
        console.log(data, "Gonderilen Mesaj")
        // socket.broadcast.emit("messageReturn", data)
        socket.to(data.room).emit("messageReturn", data)
    });
});

const PORT = 5001;

server.listen(PORT, () => {
    console.log(`Server Is Running On Port: ${PORT}`)
});