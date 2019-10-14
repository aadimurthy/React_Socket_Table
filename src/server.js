'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import TradeFeed from "./tradeFeed";

const tradeFeed = new TradeFeed();


let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = process.env.PORT || 3001;

app.use(express['static'](__dirname + '/../public'));

io.on('connection', function (socket) {
    console.log('User connected. Socket id %s', socket.id);

    socket.on('join', function (rooms) {
        console.log('Socket %s subscribed to %s', socket.id, rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach(function(room) {
                socket.join(room);
            });
        } else {
            socket.join(rooms);
        }
    });

    socket.on('leave', function (rooms) {
        console.log('Socket %s unsubscribed from %s', socket.id, rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach(function(room) {
                socket.leave(room);
            });
        } else {
            socket.leave(rooms);
        }
    });

    socket.on('disconnect', function () {
        console.log('User disconnected. %s. Socket id %s', socket.id);
    });
});

tradeFeed.start((room, type, message)=> {
    io.to(room).emit(type, message);
});

server.listen(port, function () {
    console.log('listening on: 3001');
});
