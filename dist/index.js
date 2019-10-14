"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _socketIOfeed = _interopRequireDefault(require("./socketIOfeed"));

require("./styles.css");

//import Stream from "./stockFeedMock";
var stream = new _socketIOfeed.default();

var ObserveStock =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ObserveStock, _React$Component);

  function ObserveStock() {
    var _this;

    (0, _classCallCheck2.default)(this, ObserveStock);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObserveStock).call(this));

    _this.observerStock = function () {
      _this.props.onserveStockHandler(_this.state.stockCode);

      _this.setState({
        stockCode: ""
      });
    };

    _this.handleChange = function (event) {
      _this.setState({
        stockCode: event.target.value
      });
    };

    _this.state = {
      stockCode: ""
    };
    return _this;
  }

  (0, _createClass2.default)(ObserveStock, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("p", null, "Available stocks for demo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL1, JPM"), _react.default.createElement("div", {
        className: "input-group"
      }, _react.default.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Comma separated list of stocks to watch...",
        value: this.state.stockCode,
        onChange: this.handleChange
      }), _react.default.createElement("span", {
        className: "input-group-btn"
      }, _react.default.createElement("button", {
        className: "btn btn-default",
        type: "button",
        onClick: this.observeStock
      }, _react.default.createElement("span", {
        className: "glyphicon glyphicon-eye-open",
        "aria-hidden": "true"
      }), " ", "Watch"))));
    }
  }]);
  return ObserveStock;
}(_react.default.Component);

var StockRow =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(StockRow, _React$Component2);

  function StockRow() {
    var _this2;

    (0, _classCallCheck2.default)(this, StockRow);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StockRow).call(this));

    _this2.unwatch = function () {
      _this2.props.unwatchStockHandler(_this2.props.stock.stockCode);
    };

    _this2.state = {
      items: []
    };
    return _this2;
  }

  (0, _createClass2.default)(StockRow, [{
    key: "render",
    value: function render() {
      var lastClass = "";
      var changeClass = "change-positive";
      var iconClass = "glyphicon glyphicon-triangle-top";

      if (this.props.stock === this.props.last) {
        lastClass = this.props.stock.change < 0 ? "last-negative" : "last-positive";
      }

      if (this.props.stock.change < 0) {
        changeClass = "change-negative";
        iconClass = "glyphicon glyphicon-triangle-bottom";
      }

      return _react.default.createElement("tr", null, _react.default.createElement("td", null, "\"buy|sell\""), _react.default.createElement("td", null, this.props.stock.stockCode), _react.default.createElement("td", null, this.props.stock.open), _react.default.createElement("td", {
        className: lastClass
      }, this.props.stock.last), _react.default.createElement("td", {
        className: changeClass
      }, this.props.stock.change, " ", _react.default.createElement("span", {
        className: iconClass,
        "aria-hidden": "true"
      })), _react.default.createElement("td", null, this.props.stock.high), _react.default.createElement("td", null, this.props.stock.low), _react.default.createElement("td", null, _react.default.createElement("button", {
        type: "button",
        className: "btn btn-default btn-sm",
        onClick: this.unwatch
      }, _react.default.createElement("span", {
        className: "glyphicon glyphicon-eye-close",
        "aria-hidden": "true"
      }))));
    }
  }]);
  return StockRow;
}(_react.default.Component);

var StockTable =
/*#__PURE__*/
function (_React$Component3) {
  (0, _inherits2.default)(StockTable, _React$Component3);

  function StockTable() {
    var _this3;

    (0, _classCallCheck2.default)(this, StockTable);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StockTable).call(this));
    _this3.state = {
      items: []
    };
    return _this3;
  }

  (0, _createClass2.default)(StockTable, [{
    key: "render",
    value: function render() {
      var items = [];

      for (var stockCode in this.props.stocks) {
        var stock = this.props.stocks[stockCode];
        items.push(_react.default.createElement(StockRow, {
          lable: "ACTION | BUY",
          key: stock.stockCode,
          stock: stock,
          last: this.props.last,
          unwatchStockHandler: this.props.unwatchStockHandler
        }));
      }

      return _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("table", {
        className: "table-hover"
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Action"), _react.default.createElement("th", null, "stockCode"), _react.default.createElement("th", null, "Open"), _react.default.createElement("th", null, "Last"), _react.default.createElement("th", null, "Change"), _react.default.createElement("th", null, "High"), _react.default.createElement("th", null, "Low"), _react.default.createElement("th", null, "Unwatch"))), _react.default.createElement("tbody", null, items)));
    }
  }]);
  return StockTable;
}(_react.default.Component);

var App =
/*#__PURE__*/
function (_React$Component4) {
  (0, _inherits2.default)(App, _React$Component4);

  function App() {
    var _this4;

    (0, _classCallCheck2.default)(this, App);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this));
    var stocks = {};
    stream.connect(["ABS", "AGI", "MCD", "ALI", "AP", "COL", "LC", "LR", "MBT", "SMDC"]);
    stream.onUpdate(function (stock) {
      stocks[stock.stockCode] = stock;

      _this4.setState({
        stocks: stocks,
        last: stock
      });
    });

    _this4.observestock = function (stockCodes) {
      stockCodes = stockCodes.replace(/ /g, "");
      var arr = stockCodes.split(",");
      stream.connect(arr);
    };

    _this4.unwatchStock = function (stockCode) {
      stream.disConnect(stockCode);
      var stocks = _this4.state.stocks;
      delete stocks[stockCode];

      _this4.setState({
        stocks: stocks
      });
    };

    _this4.state = {
      stocks: stocks
    };
    return _this4;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(ObserveStock, {
        ObserveStockHandler: this.observeStock
      }), _react.default.createElement(StockTable, {
        stocks: this.state.stocks,
        last: this.state.last,
        unwatchStockHandler: this.unwatchStock
      }));
    }
  }]);
  return App;
}(_react.default.Component);

var rootElement = document.getElementById("root");

_reactDom.default.render(_react.default.createElement(App, null), rootElement);