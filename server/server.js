const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const bodyParser = require('body-parser');

//body parser
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('build'));
// app.use(express.static(path.join(__dirname, '../../build')));

// app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));
// io.configure(() => {
//     io.set("transports", ["xhr-polling"]);
//     io.set("polling duration", 10);
// })
//app set
const PORT = process.env.PORT || 5000;


io.on('connection', socket => {
    io.sockets.emit('hello', {message: 'hello from server!'});
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.socket.reconnect();
    });
    socket.on('sendExpression', (expression) => {
        console.log('expression received:', expression);
        io.sockets.emit('sendExpression', expression);
    })
    socket.on('message', (data) => {
        console.log('server got a web socket message:', data);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
})

//listen
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})