import express, { urlencoded } from "express";
import {__filename, __dirname} from "./utils.js";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js";

const app = express();
let messages = [];

app.use(urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log("Server Listening - Port 8080");
});

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
    console.log("New Client Connected");

    //IDENTIFICA "ARRAY MENSAJE" Y LO GUARDA EN "OBJETO MENSAJES"
    socket.on("message", (data) => {
        messages.push(data);
        socketServer.emit("messages", messages);
    });

    socket.on("newUser", (username) => {
        socket.emit("messages", messages);
        socket.broadcast.emit("newUser", username);
    });
});