const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4500;

const users = {};

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>hello its working</h1>");
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
    console.log("new connection");

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
    });

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id });
    });

    socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
            console.log(`${users[socket.id]} has left`);
            delete users[socket.id];
        }
    });
});

server.listen(port, () => {
    console.log(`server is ready on http://localhost:${port}`);
});
