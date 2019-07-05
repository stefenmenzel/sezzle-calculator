const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const bodyParser = require('body-parser');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('build'));

server.listen(PORT, () => console.log("server is running on:", PORT));

io.sockets.on('connection', socket => {
    // io.emit('hello', {message: 'hello from server!'});
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');        
    });
    socket.on('sendExpression', (expression) => {
        console.log('expression received:', expression);
        io.emit('sendExpression', expression);
    })
})