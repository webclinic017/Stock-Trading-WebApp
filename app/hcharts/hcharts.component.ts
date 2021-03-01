import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import * as Highcharts from 'highcharts/highstock';
import { Options } from "highcharts/highstock";
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from "highcharts/indicators/volume-by-price";
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import Data from 'highcharts/modules/data';
import HC_stock from 'highcharts/modules/stock';
import addMore from 'highcharts/highcharts-more';




HC_stock(Highcharts);
IndicatorsCore(Highcharts);
vbp(Highcharts);
addMore(Highcharts);
//HC_exporting(Highcharts);
Data(Highcharts);



@Component({
  selector: 'app-hcharts',
  templateUrl: './hcharts.component.html',
  styleUrls: ['./hcharts.component.css']
})
export class HchartsComponent implements OnInit {
  //public ohlc: any = [];
  //public volume: any = [];
  //public dataLength: any;
  @Input() recchartOptions;

  //tickerdata: any;
  updateFlag: boolean =false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  updateFromInput = true;
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  
  chartOptions: Options;
  myflag:boolean=false;
  constructor(private myservice: MyserviceService, private router: Router) { }


  ngOnInit(): void {
    //this.sharingService.currentMessage.subscribe(message => (this.tickerdata = message));
   this.chartOptions=this.recchartOptions;
   this.updateFromInput = true;
   this.myflag=true;
    // this.tickerdata = this.myservice.retkey();
    // //console.log(this.tickerdata);
    // this.myservice.getHist().subscribe(res => {
    //   //console.log("in hcharts", res);
    //   var data = res['data']
    //   var ohlc = [],
    //     volume = [],
    //     dataLength = data.length;
    //   // set the allowed units for data grouping
    //   var i = 0;
    //   for (i; i < dataLength; i += 1) {
    //     let tpdate = (new Date(data[i].date)).getTime();
    //     //console.log("data[i] hcharts", data[i]);
    //    // console.log(tpdate);
    //     ohlc.push([
    //       tpdate, // the date
    //       data[i].open, // open
    //       data[i].high, // high
    //       data[i].low, // low
    //       data[i].close // close
    //     ]);

    //     volume.push([
    //       tpdate, // the date
    //       data[i].volume // the volume
    //     ]);
    //   }
    //   this.chartOptions = {

    //     rangeSelector: {
    //       selected: 2
    //     },
    //     title: {
    //       useHTML:true,
    //       text: "<span class='text-uppercase'>"+this.tickerdata+"</span> Historical"
    //     },
    //     subtitle: {
    //       text: 'With SMA and Volume by Price technical indicators'
    //     },

    //     yAxis: [{
    //       startOnTick: false,
    //       endOnTick: false,
    //       labels: {
    //         align: 'right',
    //         x: -3
    //       },
    //       title: {
    //         text: 'OHLC'
    //       },
    //       height: '60%',
    //       lineWidth: 2,
    //       resize: {
    //         enabled: true
    //       }
    //     }, {
    //       labels: {
    //         align: 'right',
    //         x: -3
    //       },
    //       title: {
    //         text: 'Volume'
    //       },
    //       top: '65%',
    //       height: '35%',
    //       offset: 0,
    //       lineWidth: 2
    //     }],
    //     tooltip: {
    //       split: true
    //     },

    //     series: [{
    //       type: 'candlestick',
    //       name: this.tickerdata.toUpperCase(),
    //       id: this.tickerdata,
    //       zIndex: 2,
    //       data: ohlc
    //     }, {
    //       type: 'column',
    //       name: 'Volume',
    //       id: 'volume',
    //       data: volume,
    //       yAxis: 1
    //     }, {
    //       type: 'vbp',
    //       linkedTo: this.tickerdata,
    //       params: {
    //         volumeSeriesID: 'volume'
    //       },
    //       dataLabels: {
    //         enabled: false
    //       },
    //       zoneLines: {
    //         enabled: false
    //       }
    //     }, {
    //       type: 'sma',
    //       linkedTo: this.tickerdata,
    //       zIndex: 1,
    //       marker: {
    //         enabled: false
    //       }
    //     }]
    //   };
      // this.caller(res['data']);
      //console.log("ohlc",ohlc);
      //console.log("volume",volume);
    
    // }, err => {
    //   console.log(err);
    //   //this.isLoadingResults = false;
    // });
  }
}







