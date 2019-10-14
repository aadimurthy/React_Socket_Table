export default class tradeFeed {
    constructor(){
        this.interval = 0;
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
            let ranDate = this.randomDate(new Date(2012, 0, 1), new Date());
            let dd = ranDate.getDate();
            let mm=ranDate.getMonth()+1;
            let yyyy = ranDate.getFullYear();
            if (dd < 10) {
              dd = '0' + dd;
             } 
           if (mm < 10) {
            mm = '0' + mm;
            } 
            stock.date =  dd + '/' + mm + '/' + yyyy;
          });       
        } 

    randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }    
    simulator(callback){
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
            callback(stock.stockCode, 'stock', stock);
   }

   start(callback){
    this.interval = setInterval(()=>{this.simulator(callback)}, 200);
   }

   stop(){
    clearInterval(this.interval);
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

