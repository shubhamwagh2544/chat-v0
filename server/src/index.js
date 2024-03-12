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
    console.log('we have a new connection!!!')

    socket.on('join', ({ name, room }, callback) => {
        //console.log(name, room)
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) {
            return callback(error)
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room: ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room)
        callback()
    })

    socket.on('disconnect', () => {
        console.log('user left connection!!!')
    })
})

httpServer.listen(PORT, () => console.log('app is listening on port:', PORT))