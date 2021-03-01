import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from './../myservice.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { Gservice2Service } from './../gservice2.service';
import { DailychartsService } from '../dailycharts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import * as Highcharts from 'highcharts/highstock';
import { Options } from "highcharts/highstock";
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from "highcharts/indicators/volume-by-price";
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import Data from 'highcharts/modules/data';
import HighchartsMore from "highcharts/highcharts-more";
import { Subscription, Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



IndicatorsCore(Highcharts);
vbp(Highcharts);
HC_exportData(Highcharts);
//HC_exporting(Highcharts);
HighchartsMore(Highcharts);
//Data(Highcharts);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  //@Input() notifications: any ;
  checker: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public ohlc: any = [];
  public volume: any = [];
  public dataLength: any;
  // set the allowed units for data grouping
  public groupingUnits: any = [];
  public tickerdata: any;
  subscription: any;
  public companyDetails: any;
  public data2: any = {};
  public data3: any = {};
  public data4: any;
  public news: any = [];
  public news2: any = [];
  public change: number;
  public changePercent: number;
  public modal_item: any = {};
  public src: any;
  public modalForm: FormGroup;
  public total: number = 0.00;
  public today: any = new Date();
  public timediff: any;
  public isLocalKey: boolean;
  public keys: any = [];
  ch: boolean = false;
  quantity: number;
  isvalid: boolean;
  showloader: boolean = false;
  showloader2: boolean = false;
  showloader3: boolean = false;
  isLoadingResults = true;
  math = Math;
  public date;
  private timer;
  datePriceList: any = [];
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Options;// = 
  chartOptionshist: Options;
  chartOptions1: Options = {

    rangeSelector: {
      selected: 1,
      inputEnabled: false,
      buttonTheme: {
        visibility: 'hidden'
      },
      labelStyle: {
        visibility: 'hidden'
      }
    },
    time: {
      useUTC: false
    },
    title: {
      useHTML: true,
      margin: 0,
      text: ''
    },
    subtitle: {

      style:
      {
        display: 'none'
      }
    },
    xAxis: {
      type: "datetime",
      tickInterval: 3600 * 1000,
      zoomEnabled: true
    },
    yAxis: [{
      title: {
        text: "",
      },
      opposite: true,
    }],
    series: [
      {
        showInLegend: false,


        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2
        }
      }]

  };;
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean; // optional boolean, defaults to false
  runOutsideAngularFlag: boolean = false;
  href: string;
  href2: string;

  constructor(private myservice: MyserviceService, private router: Router, private dservice: DailychartsService,
    private sharingService: Gservice2Service, private formBuilder: FormBuilder, private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute) { }

  addItem(item) {
    //console.log(item);
    this.modal_item = item;
    this.src = item.source.name;
    this.date = new Date(this.modal_item.publishedAt);

  }
  myurl() {
    this.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.modal_item.title) + '&url=' + encodeURIComponent(this.modal_item.url);

  }
  myurl2() {
    this.href2 = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.modal_item.url);

  }
  compute() {
    let itr = 0;
    for (var val of this.data3) {
      if (val.title && val.description && val.url && val.urlToImage && val.source && val.publishedAt) {
        if (itr % 2 == 0) {
          this.news.push(val);

        }
        else {
          this.news2.push(val);

        }
        itr = itr + 1;

      }
      //console.log("itr news",itr);

    }

  }
  findTotal() {
    this.modalForm.valueChanges.subscribe(quan => {
      //console.log("quantity is",quantity.inputnum);
      this.total = quan.inputnum * this.data2.last;
      this.quantity = quan.inputnum;
    },
      err => {
        console.log(err);

      });

  }
  setQuantity() {
    this.modalForm.patchValue({
      inputnum: 0

    });
  }
  buyStock() {

    this.showloader3 = false;
    console.log("inBuyStock");
    //console.log("quantity is",quantity.inputnum);
    //this.total = quantity.inputnum * this.data2.last;
    let bought = {
      "key": this.companyDetails.data.ticker, "name": this.companyDetails.data.name,
      "quantity": this.quantity, "total": this.total, "flag": 0
    };
    var buySucess = this.storage.buyStock(this.companyDetails.data.ticker + '-p', bought);
    if (buySucess) {
      this.showloader3 = true;
    }

    //document.getElementById().value=0;
    //var tmp=(<HTMLInputElement>document.getElementById("inputnum"));
    //tmp.value=0;

  }


  sendTimestap() {
    //  this.subscription = timer(0,0).pipe(
    //  switchMap(() => 
    console.log("chart updated");
    this.dservice.getData(this.companyDetails.data.ticker, this.data2.timestamp).subscribe(res => {
      console.log(res);

      this.data4 = res.data;
      console.log(this.data4);
      var dates = [];
      var prices = [];

      for (let j = 0; j < this.data4.length; j++) {
        let curritem = this.data4[j];

        //let curr_date = curritem.date.split("-");

        //let day = curr_date[2].substring(0, 2);
        let tpdate = Date.parse(curritem.date);
        //Date.UTC(curr_date[0], curr_date[1] - 1, day);
        //console.log("here",tpdate);
        dates.push(tpdate);

        //console.log("date");
        prices.push(curritem['close']);

      }
      this.datePriceList = [];
      for (let i = 0; i < dates.length; i++) {
        this.datePriceList.push([dates[i], prices[i]]);
      }
      var color = 'black';
      if (this.change > 0) {
        color = 'green';
      }
      if (this.change < 0) {
        color = 'red';
      }
      this.chartOptions = {

        rangeSelector: {
          selected: 1,
          inputEnabled: false,
          buttonTheme: {
            visibility: 'hidden'
          },
          labelStyle: {
            visibility: 'hidden'
          }
        },
        time: {
          useUTC: false
        },
        title: {
          useHTML: true,
          margin: 0,
          text: "<br><p class='text-secondary mb-0 pb-0'>" + this.companyDetails?.data.ticker + "</p>"
        },
        subtitle: {

          style:
          {
            display: 'none'
          }
        },
        xAxis: {
          type: "datetime",
          tickInterval: 3600 * 1000,
          zoomEnabled: true
        },
        yAxis: [{
          title: {
            text: "",
          },
          opposite: true,
        }],
        series: [
          {
            showInLegend: false,
            color: color,
            name: this.companyDetails?.data.ticker,
            data: this.datePriceList,
            yAxis: 0,
            type: 'line',
            tooltip: {
              valueDecimals: 2
            }
          }]

      }; // required;
      this.ch = true;
      //Highcharts.stockChart("highc",this.chartOptions);

    }, err => {
      console.log(err);
      //this.isLoadingResults = false;
    });
  }
  isKey() //check if in local storage watchlist
  {
    this.keys = this.storage.keysList();
    if (this.keys.indexOf(this.companyDetails?.data.ticker) !== -1) {
      this.isLocalKey = true;

    }
    else {
      this.isLocalKey = false;
    }
    //console.log("boolean return",this.isLocalKey);
    return this.isLocalKey;
  }
  removeStarFunction() //remove from watclist
  {
    this.showloader = true;
    this.showloader2 = false;
    var success = this.storage.remove(this.companyDetails.data.ticker);
    setTimeout(() => { this.showloader = false; }, 5000);
  }
  public starFunction() //add to watchlist
  {
    this.showloader2 = true;
    this.showloader = false;
    var valueobj =
      { "key": this.companyDetails.data.ticker, "name": this.companyDetails.data.name, "flag": 1 }
    var setsucess = this.storage.set(this.companyDetails.data.ticker, valueobj);
    setTimeout(() => { this.showloader2 = false; }, 5000);
    //.subscribe(res => {
    // console.log("the res in star",res);
    //}, err => {
    //console.log(err);

    //  });
  }
  getStocks() {
    this.myservice.getStocks().subscribe(ans => {
      this.data2 = ans.data[0];
      this.change = Number(this.data2.last) - Number(this.data2.prevClose);
      console.log("15 sec");
      this.changePercent = (Number)(this.change * 100) / Number(this.data2.prevClose);
      var temp: any = new Date(this.data2.timestamp);
      this.today = new Date();
      this.timediff = (this.today - temp) / 1000;
      this.sendTimestap();
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  setHistoric()
  {
    //this.tickerdata = this.myservice.retkey();
    //console.log(this.tickerdata);
    this.myservice.getHist().subscribe(res => {
      //console.log("in hcharts", res);
      var data = res['data']
      this.ohlc = [],
        this.volume = [];
        var dataLength = data.length;
      // set the allowed units for data grouping
      var i = 0;
      for (i; i < dataLength; i += 1) {
        let tpdate = (new Date(data[i].date)).getTime();
        //console.log("data[i] hcharts", data[i]);
       // console.log(tpdate);
        this.ohlc.push([
          tpdate, // the date
          data[i].open, // open
          data[i].high, // high
          data[i].low, // low
          data[i].close // close
        ]);

        this.volume.push([
          tpdate, // the date
          data[i].volume // the volume
        ]);
      }
      this.chartOptionshist = {

        rangeSelector: {
          selected: 2
        },
        title: {
          useHTML:true,
          text: "<span class='text-uppercase'>"+this.companyDetails?.data.ticker+"</span> Historical"
        },
        subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
        },

        yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        tooltip: {
          split: true
        },

        series: [{
          type: 'candlestick',
          name: this.companyDetails?.data.ticker,
          id: this.companyDetails?.data.ticker,
          zIndex: 2,
          data: this.ohlc
        }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.volume,
          yAxis: 1
        }, {
          type: 'vbp',
          linkedTo: this.companyDetails?.data.ticker,
          params: {
            volumeSeriesID: 'volume'
          },
          dataLabels: {
            enabled: false
          },
          zoneLines: {
            enabled: false
          }
        }, {
          type: 'sma',
          linkedTo: this.companyDetails?.data.ticker,
          zIndex: 1,
          marker: {
            enabled: false
          }
        }]
      };
      // this.caller(res['data']);
      //console.log("ohlc",ohlc);
      //console.log("volume",volume);
      //this.updateFromInput = true;
      //this.myflag=true;
    }, err => {
      console.log(err);
      //this.isLoadingResults = false;
    });
  }
  ngOnInit() {
    this.isLoadingResults = true;
    let companyid = this.activatedRoute.snapshot.params.id;
    //console.log("activated route",companyid);
    this.sharingService.currentMessage.subscribe(message => (this.tickerdata = message));
    
    this.myservice.getData(companyid).subscribe(res => {
      console.log(res);
      this.companyDetails = res[0];
      console.log(this.companyDetails);
      var cd = this.companyDetails?.data;
      if ('detail' in cd) {
        console.log("here");
        this.isvalid = false;
        this.isLoadingResults = false;
        return;
      }
      else {
        this.isvalid = true;
        //this.getStocks();
        this.data2 = res[1].data[0];
        this.change = Number(this.data2.last) - Number(this.data2.prevClose);

        this.changePercent = (Number)(this.change * 100) / Number(this.data2.prevClose);
        var temp: any = new Date(this.data2.timestamp);
        this.today = new Date();
        this.timediff = (this.today - temp) / 1000;
        this.data3 = res[2].data.articles; //res[2]
        if (this.timediff < 60) {
          this.subscription = setInterval(() => {
            this.getStocks();
          }, 15000);

        }
       
        this.compute();
        this.sendTimestap();
       
        this.setHistoric();
        this.isLoadingResults = false;

      }

    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
    this.modalForm = this.formBuilder.group({
      inputnum: [0, Validators.required]
    });
    this.findTotal();
    

  };

  ngOnDestroy() {
    if (this.subscription) {
      clearInterval(this.subscription);
    }
  }


}
