const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')
const router = require('./routes/router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./db/users')
const app = express()
const PORT = 3000

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET'],
        credentials: true
    }
});

app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    methods: ['GET']
}))
app.use(router)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
})

httpServer.listen(PORT, () => console.log('app is listening on port:', PORT))

// emit: triggers event
// on: register listener to triggered event