const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('new user', () => {
        //socket.broadcast.emit('new user', 'new user has joined the chat') //sends to all but the initiating socket
        socket.emit('new user', {nickname: null, text: 'hello and welcome to this chat!'}) //send to only the initiating socket
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); //sends to all connected sockets
    });

    socket.on('choose name', (name) => {
        socket.broadcast.emit('new user', {nickname: name, text: 'has joined the chat'}) //sends to all but the initiating socket
        socket.id = name;
    });
    
    socket.on('typing', function(data){
      socket.emit('typing',"")
      socket.broadcast.emit('typing', data) //sends to all but the initiating socket
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', {nickname: socket.id, text: 'has left the chat'}) //sends to all but the initiating socket
    })
});  

server.listen(3000, () => {
  console.log('listening on *:3000');
});

