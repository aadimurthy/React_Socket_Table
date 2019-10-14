'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _tradeFeed = _interopRequireDefault(require("./tradeFeed"));

var tradeFeed = new _tradeFeed.default();
var app = (0, _express.default)();

var server = _http.default.Server(app);

var io = new _socket.default(server);
var port = process.env.PORT || 3001;
app.use(_express.default['static'](__dirname + '/../public'));
io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);
  socket.on('join', function (rooms) {
    console.log('Socket %s subscribed to %s', socket.id, rooms);

    if (Array.isArray(rooms)) {
      rooms.forEach(function (room) {
        socket.join(room);
      });
    } else {
      socket.join(rooms);
    }
  });
  socket.on('leave', function (rooms) {
    console.log('Socket %s unsubscribed from %s', socket.id, rooms);

    if (Array.isArray(rooms)) {
      rooms.forEach(function (room) {
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
tradeFeed.start(function (room, type, message) {
  io.to(room).emit(type, message);
});
server.listen(port, function () {
  console.log('listening on: 3001');
});