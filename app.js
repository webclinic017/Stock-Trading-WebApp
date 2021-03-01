const express = require('express');
var cors = require('cors')
const fetch   = require('node-fetch');
const bodyParser=require("body-parser");
const app = express();

const router = express.Router();

//app.use(cors())

const corsOptions={
    "origin": "*"
}
app.use(cors(corsOptions));




app.get('/news/:id', function (req, res) {
    var ticker_name=req.params.id;
    var newsurl = "https://newsapi.org/v2/everything?apiKey=0f834ceaf0c5464087ad8d450e67daf9&q="+ticker_name+"&pageSize=20";
    fetch(newsurl)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/auto/:id', function (req, res) {
    var options=req.params.id;
    var autourl ="https://api.tiingo.com/tiingo/utilities/search?query="+options+"&token=f18511783e1cce638f841728d49fc80cd0749058";
    fetch(autourl)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/stock/:tickername', function (req, res) {
    var tickername=req.params.tickername;
    console.log(tickername);
    var stockurl = "https://api.tiingo.com/iex?tickers="+tickername+"&token=f18511783e1cce638f841728d49fc80cd0749058";
    fetch(stockurl)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/detail/:name', function (req, res) {
    var ticker=req.params.name;
    var url = "https://api.tiingo.com/tiingo/daily/"+ticker+"?token=f18511783e1cce638f841728d49fc80cd0749058";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/charts/:name', function (req, res) {
    var ticker4=req.params.name;
    var today=new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear()-2;
    if(day <10)
    {
       day='0'+day;
    }
    if(month<10){
        month="0"+month;
    }
    var set_date = year+'-'+month+'-'+day;
    //console.log(day);
    //console.log(set_date);
    var histurl = "https://api.tiingo.com/tiingo/daily/"+ticker4+"/prices?startDate="+set_date+"&resampleFreq=daily&token=f18511783e1cce638f841728d49fc80cd0749058";
    fetch(histurl)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

app.get('/dailycharts/:name/:date', function (req, res) {
    var ticker5=req.params.name;
    var tempdate=req.params.date;
    console.log(tempdate);
    var today=new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    if(day <10)
    {
       day='0'+day;
    }
    if(month<10){
        month="0"+month;
    }
    var current_date = year+'-'+month+'-'+day;
    //console.log(day);
    //console.log(current_date);
    var histurl = "https://api.tiingo.com/iex/"+ticker5+"/prices?startDate="+tempdate+"&resampleFreq=4min&columns=open,high,low,close,volume&token=f18511783e1cce638f841728d49fc80cd0749058";
    fetch(histurl)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});
//app.use('/static', express.static(path.join(__dirname + 'public')));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd()+"/public/angular10app/"));
app.get('*', (req,res) => {
    res.sendFile(process.cwd()+"/public/angular10app/")
  });
const port = process.env.PORT || 8088
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})