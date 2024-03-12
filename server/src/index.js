const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')
const router = require('./routes/router');
const app = express()
const PORT = 3000

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.json())
app.use(cors())
app.use(router)


httpServer.listen(PORT, () => console.log('app is listening on port:', PORT))