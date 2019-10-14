import React from "react";
import ReactDOM from "react-dom";
//import Stream from "./stockFeedMock";
import Stream from "./socketIOfeed";

import "./styles.css";

const stream = new Stream()

class ObserveStock extends React.Component {
  constructor() {
    super();
    this.observeStock = ()=> {
      this.props.ObserveStockHandler(this.state.stockCode);
      this.setState({ stockCode: '' });
    };
    this.handleChange = (event) =>{
      this.setState({ stockCode: event.target.value });
    };
    this.state = {
      stockCode: ""
    };
  }
  render() {
    return (
      <div className="row">
          <h1>STOCK TRADE TABLE </h1>
        <p>
          Available stocks for demo: ABS, AGI, MCD, ALI, AP, COL, LC, LR, MBT, SMDC
        </p>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Comma separated list of stocks to watch..."
            value={this.state.stockCode}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="button"
              onClick={this.observeStock}
            >
              <span
                className="glyphicon glyphicon-eye-open"
                aria-hidden="true"
              />{" "}
              Watch
            </button>
          </span>
        </div>
      </div>
    );
  }
}

class StockRow extends React.Component {
  constructor() {
    super();
    this.unwatch = () => {
      this.props.unwatchStockHandler(this.props.stock.stockCode);
    };
    this.state = {
      items: []
    };
  }

  render() {
    let lastClass = "";
    let changeClass = "change-positive";
    let iconClass = "glyphicon glyphicon-triangle-top";
    if (this.props.stock === this.props.last) {
      lastClass =
        this.props.stock.change < 0 ? "last-negative" : "last-positive";
    }
    if (this.props.stock.change < 0) {
      changeClass = "change-negative";
      iconClass = "glyphicon glyphicon-triangle-bottom";
    }
    return (
      <tr>
        <td>"buy|sell"</td>
        <td>{this.props.stock.stockCode}</td>
        <td>{this.props.stock.open}</td>
        <td className={lastClass}>{this.props.stock.last}</td>
        <td className={changeClass}>
          {this.props.stock.change}{" "}
          <span className={iconClass} aria-hidden="true" />
        </td>
        <td>{this.props.stock.high}</td>
        <td>{this.props.stock.low}</td>
        <td>
          <button
            type="button"
            className="btn btn-default btn-sm"
            onClick={this.unwatch}
          >
            <span
              className="glyphicon glyphicon-eye-close"
              aria-hidden="true"
            />
          </button>
        </td>
      </tr>
    );
  }
}
class StockTable extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  render() {
    let items = [];
    for (let stockCode in this.props.stocks) {
      let stock = this.props.stocks[stockCode];
      items.push(
        <StockRow
          lable="ACTION | BUY"
          key={stock.stockCode}
          stock={stock}
          last={this.props.last}
          unwatchStockHandler={this.props.unwatchStockHandler}
        />
      );
    }
    return (
      <div className="row">
        <table className="table-hover">
          <thead>
            <tr>
              <th>Action</th>
              <th>stockCode</th>
              <th>Open</th>
              <th>Last</th>
              <th>Change</th>
              <th>High</th>
              <th>Low</th>
              <th>Unwatch</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    const stocks = {};
    stream.connect([
      "ABS",
      "AGI",
      "MCD",
      "ALI",
      "AP",
      "COL",
      "LC",
      "LR",
      "MBT",
      "SMDC"
    ]);

    stream.onUpdate(
       (stock)=> {
        stocks[stock.stockCode] = stock;
        this.setState({ stocks: stocks, last: stock });
      }
    );

    this.observeStock = (stockCodes) =>{
      stockCodes = stockCodes.replace(/ /g, "");
      let arr = stockCodes.split(",");
      stream.connect(arr);
    };

    this.unwatchStock = (stockCode) =>{
      stream.disConnect(stockCode);
      let stocks = this.state.stocks;
      delete stocks[stockCode];
      this.setState({ stocks: stocks });
    };

    this.state = {
      stocks: stocks
    };
  }
  render() {
    return (
      <div>
        <ObserveStock ObserveStockHandler={this.observeStock} />
        <StockTable
          stocks={this.state.stocks}
          last={this.state.last}
          unwatchStockHandler={this.unwatchStock }
        />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
