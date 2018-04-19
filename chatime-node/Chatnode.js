/**
 * Created by Jaypee on 4/17/2018.
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let users = [];
let connections = [];
let messages = [];

server.listen(8081);

console.log('Chat server is running ...');

io.on('connection', (socket) => {
    connections.push(socket);
console.log('Connected: %s sockets connected', connections.length);
io.sockets.connected[socket.conn.id].emit('userUniqueId', {
    id: socket.conn.id,
});

// Disconnect
socket.on('disconnect', (data) => {
    if(socket.username) {
    let user_index = users.findIndex(user => user.name === socket.username);
    users.splice(user_index, 1);
    updateUsernames();
    userExitChat();
}
connections.splice(connections.indexOf(socket), 1);
console.log('Connected: %s sockets connected', connections.length);
});

// Send Message
socket.on('send_message', (data) => {
    let every_mess = {
        id: socket.conn.id,
        name: socket.username,
        message: data.message,
        user_join: false,
        user_out: false
    };

messages.push(every_mess);

io.sockets.emit('newMessage', {
    id: socket.conn.id,
    name: socket.username,
    message: data.message,
    user_join: false,
    user_out: false
})
});

//New User
socket.on('new_user', (data, callback) => {
    callback(true);
socket.username = data.nickname;
let user_arr = {
    name: socket.username,
    id: socket.conn.id,
    connect: true
}
users.push(user_arr);
updateUsernames();
userJoinChat();
getMessages();
})

let updateUsernames = () => {
    io.sockets.emit('getUsers', users);
}

let getMessages = () => {
    io.sockets.connected[socket.conn.id].emit('retrieveMessages', messages);
}

let userJoinChat = () => {
    let user_join_arr = {
        id: socket.conn.id,
        name: socket.username,
        message: `${socket.username} joined the room`,
        user_join: true,
        user_out: false
    };

    messages.push(user_join_arr);

    io.sockets.emit('newMessage', {
        id: socket.conn.id,
        name: socket.username,
        message: `${socket.username} joined the room`,
        user_join: true,
        user_out: false
    })
}

let userExitChat = () => {
    let user_exit_arr = {
        id: socket.conn.id,
        name: socket.username,
        message: `${socket.username} left the room`,
        user_out: true,
        user_join: false
    };

    messages.push(user_exit_arr);

    io.sockets.emit('newMessage', {
        id: socket.conn.id,
        name: socket.username,
        message: `${socket.username} left the room`,
        user_out: true,
        user_join: false
    })
}
});


