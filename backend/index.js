const cors = require('cors');
const express = require('express');
const http = require('http'); // Add http module
const socketIO = require('socket.io');
const connectToMongo = require('./db');

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app); // Create an HTTP server

const io = socketIO(server); // Initialize Socket.io

app.use(cors());
app.use(express.json());

connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/', require('./routes/task'))

io.on('connection', (socket) => {
  console.log('A user connected');
  // Additional logic for handling specific events or actions from clients
});

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
