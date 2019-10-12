export default class stockFeedMock {
    constructor(){
        this.wList = [];
        this.stocks = [
            { stockCode: "ABS", open: 38.87 },
            { stockCode: "AGI", open: 25.4 },
            { stockCode: "MCD", open: 97.05 },
            { stockCode: "ALI", open: 69.45 },
            { stockCode: "AP", open: 83.24 },
            { stockCode: "COL", open: 55.76 },
            { stockCode: "LC  ", open: 76.12 },
            { stockCode: "LR", open: 61.75 },
            { stockCode: "MBT", open: 15.84 },
            { stockCode: "SMDC", open: 154.5 }
          ];
        
        this.stocks.forEach((stock) => {
            stock.last = stock.open;
            stock.high = stock.open;
            stock.low = stock.open;
          });       
        } 
    
    onUpdate(callback){
        setInterval(() => {
            let index = Math.floor(Math.random() * this.stocks.length);
            let stock = this.stocks[index];
            let maxChange = stock.open * 0.005;
            let change = maxChange - Math.random() * maxChange * 2;
            let last;
    
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
            if (this.wList.indexOf(stock.stockCode) > -1) {
              callback(stock);
            }
          }, 200);

    }

    connect(stockCodes) {
        
        stockCodes.forEach((stockCode)=> {
          if ((this.wList).indexOf(stockCode) < 0) {
            this.wList.push(stockCode);
          }
        });
      }
    
    disConnect(stockCode) {
        let index = this.wList.indexOf(stockCode);
        if (index > -1) {
          this.wList.splice(index, 1);
        }
      }


 
}

// const feed = new stockFeedMock();
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

