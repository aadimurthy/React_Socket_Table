'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import TradeFeed from "./tradeFeed";
import bodyParser from 'body-parser';

const tradeFeed = new TradeFeed();


const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3001;

app.use(express['static'](__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection',  (socket)=> {
    console.log('User connected. Socket id %s', socket.id);

    socket.on('join',  (rooms)=> {
        console.log('Socket %s subscribed to %s', socket.id, rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach((room) =>{
                console.log('XXXXXX',room)
                socket.join(room);
            });
        } else {
            socket.join(rooms);
        }
    });

    socket.on('leave',  (rooms)=> {
        console.log('Socket %s unsubscribed from %s', socket.id, rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach((room) =>{
                socket.leave(room);
            });
        } else {
            socket.leave(rooms);
        }
    });

    socket.on('disconnect',  ()=> {
        console.log('User disconnected. %s. Socket id %s', socket.id);
    });
});

tradeFeed.start((room, type, message)=> {
    io.to(room).emit(type, message);
});
 
  
app.get('/api/v1/getStocks', (req, res) => {
    res.status(200).send({
      success: 'true',
      stocks: tradeFeed.getStocks()
    })
  }); 
  
app.post('/api/v1/postStocks', (req, res) => {
   let newStocks = req.body.stocks;
   tradeFeed.loadStocks(newStocks);
    res.status(200).send({
      success: 'true',
    })
});   
 


server.listen(port,  () =>{
    console.log('listening on: 3001');
});
