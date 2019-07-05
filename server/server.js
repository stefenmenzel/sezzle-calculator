const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const bodyParser = require('body-parser');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
// app.use(express.static('build'));
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// server.listen(PORT, () => console.log("server is running on:", PORT));


// const server = express()
//     .use((req, res) => res.sendFile(INDEX))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));
// io.configure(() => {
//     io.set("transports", ["xhr-polling"]);
//     io.set("polling duration", 10);
// })
//app set

// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//     .use((req, res) => res.sendFile(INDEX))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new SocketServer({server});

// wss.on('connection', (ws) => {
//     console.log('user connected:');
//     ws.on('message', (data) => {
//         console.log('received message:', data);
//         wss.clients.forEach((client) => {
//             if(client.readyState === WebSocket.OPEN){
//                 console.log('sending back');
//                 client.send(data);
//             }
//         })
//     })    
//     ws.on('close', () => {
//         console.log('user disconnected');
//     })
// });
//listen
// server.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}`);
// })

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
    // socket.on('message', (data) => {
    //     console.log('server got a web socket message:', data);
    //     wss.clients.forEach((client) => {
    //         if (client !== ws && client.readyState === WebSocket.OPEN) {
    //             client.send(data);
    //         }
    //     })
    // })
})


// setInterval(() => {
//     io.emit('time', new Date().toTimeString())
// }, 1000);