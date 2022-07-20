// const cors = require('cors');
// const express = require('express');
// const app = express();
// app.use(cors());
const io =require('socket.io')(8000);
const users={}


io.on('connection',socket=>{
    // socket.emit('chat-message','hello user');
    socket.on('new-user',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-connected',name);
    })
    socket.on('send-chat-message',message=>{
        console.log(message)
        socket.broadcast.emit('chat-message',{message: message,name: users[socket.id]})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socketi.id];

    })

});

