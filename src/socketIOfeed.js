import io from 'socket.io-client'

export default class socketIOfeed {
  constructor(){
      this.io = io()
      this.connect=(stockCodes)=>{
        this.io.emit('join', stockCodes);
      }
      this.onUpdate= (callback)=>{
          console.log('YYYYYYY')
        this.io.on('stock', callback);
    }
    this.disConnect=(stockCode)=>{
        this.io.emit('leave', stockCode);
    }

}

    
    
    


}