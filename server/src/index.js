const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')
const router = require('./routes/router');
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

    socket.on('disconnect', () => {
        console.log('user left connection!!!')
    })
})

httpServer.listen(PORT, () => console.log('app is listening on port:', PORT))