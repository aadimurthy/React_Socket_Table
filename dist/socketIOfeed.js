"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _socket = _interopRequireDefault(require("socket.io-client"));

var socketIOfeed = function socketIOfeed() {
  var _this = this;

  (0, _classCallCheck2.default)(this, socketIOfeed);
  this.io = (0, _socket.default)();

  this.connect = function (stockCodes) {
    _this.io.emit('join', stockCodes);
  };

  this.onUpdate = function (callback) {
    console.log('YYYYYYY');

    _this.io.on('stock', callback);
  };

  this.disConnect = function (stockCode) {
    _this.io.emit('leave', stockCode);
  };
};

exports.default = socketIOfeed;