## React_Socket_Table

This repo deals with the dynamic Stock Trade table(eg: https://www.colfinancial.com/ape/Final2/home/online_trading.asp) populating through the websockets (SOCKET.IO) using express and React.

Please note that this is very basic implementation not a production grade code. 

#### How to test: 

```
1) npm install   (My Node version is  10.15.2)
```

This pulls the required dependencies 
```
2) npm run start 
```

This starts the express server on localhost port 3001 to serve the mocked periodical SOCKET communication and REST end points 

##### Now Open a new Terminal and run below command to run react components seperately 

```
3) npm run front 
```

 This is an create-react-app starter pack. This start and sets up the development environment and starts a server, as well as hot module reloading.This uses localhost port 3000 and opens a webpage in default browser which shows the dynamic table as below 
 
 ![Screenshot](https://raw.githubusercontent.com/aadimurthy/React_Socket_Table/master/Screenshot%20from%202019-10-14%2010-33-50.png)
 
 

 
 
 
I have configured the proxy to port 3001 in package.json file. so all requests will be redirect to react server to express. 


#### REST END POINTS

GET Request  to get stocks:
```
curl -X GET http://localhost:3001/api/v1/getStocks 
```

GET Response:
```
{
    "success": "true",
    "stocks": [
        {
            "stockCode": "ABS",
            "open": 38.87,
            "last": 39.13,
            "high": 39.13,
            "low": 38.87,
            "date": "13/04/2019",
            "change": 0.11
        },
        ........
    ]
}
``` 

Post Request for update Stocks: 
```
curl -X POST   http://localhost:3001/api/v1/postStocks   -H 'content-type: application/json'   -d '{"stocks":[{ "stockCode": "XXX", "open": 38.87 },
{ "stockCode": "YYY", "open": 25.4 },
{ "stockCode": "ZZZ", "open": 97.05 }]}'
```

Post response: 
```
{"success":"true"}
```





 
 
 







