"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var stockFeedMock =
/*#__PURE__*/
function () {
  function stockFeedMock() {
    (0, _classCallCheck2.default)(this, stockFeedMock);
    this.wList = [];
    this.stocks = [{
      stockCode: "ABS",
      open: 38.87
    }, {
      stockCode: "AGI",
      open: 25.4
    }, {
      stockCode: "MCD",
      open: 97.05
    }, {
      stockCode: "ALI",
      open: 69.45
    }, {
      stockCode: "AP",
      open: 83.24
    }, {
      stockCode: "COL",
      open: 55.76
    }, {
      stockCode: "LC  ",
      open: 76.12
    }, {
      stockCode: "LR",
      open: 61.75
    }, {
      stockCode: "MBT",
      open: 15.84
    }, {
      stockCode: "SMDC",
      open: 154.5
    }];
    this.stocks.forEach(function (stock) {
      stock.last = stock.open;
      stock.high = stock.open;
      stock.low = stock.open;
    });
  }

  (0, _createClass2.default)(stockFeedMock, [{
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this = this;

      setInterval(function () {
        var index = Math.floor(Math.random() * _this.stocks.length);
        var stock = _this.stocks[index];
        var maxChange = stock.open * 0.005;
        var change = maxChange - Math.random() * maxChange * 2;
        var last;
        change = Math.round(change * 100) / 100;
        change = change === 0 ? 0.01 : change;
        last = stock.last + change;

        if (last > stock.open * 1.15 || last < stock.open * 0.85) {
          change = -change;
          last = stock.last + change;
        }

        stock.change = change;
        stock.last = Math.round(last * 100) / 100;

        if (stock.last > stock.high) {
          stock.high = stock.last;
        }

        if (stock.last < stock.low) {
          stock.low = stock.last;
        }

        if (_this.wList.indexOf(stock.stockCode) > -1) {
          callback(stock);
        }
      }, 200);
    }
  }, {
    key: "connect",
    value: function connect(stockCodes) {
      var _this2 = this;

      stockCodes.forEach(function (stockCode) {
        if (_this2.wList.indexOf(stockCode) < 0) {
          _this2.wList.push(stockCode);
        }
      });
    }
  }, {
    key: "disConnect",
    value: function disConnect(stockCode) {
      var index = this.wList.indexOf(stockCode);

      if (index > -1) {
        this.wList.splice(index, 1);
      }
    }
  }]);
  return stockFeedMock;
}(); // const feed = new stockFeedMock();
// feed.watch([
//     "ABS",
//     "AGI",
//     "MCD",
//     "ALI",
//     "AP",
//     "COL",
//     "LC",
//     "LR",
//     "MBT",
//     "SMDC"
//   ]);
// feed.onUpdate(
//     (stock)=> {
//       console.log(stock)
//     }
//   ); 


exports.default = stockFeedMock;