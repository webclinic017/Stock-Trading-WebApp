import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { WserviceService } from '../wservice.service';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchList: any = [];
  result: any = {};
  result2: any = {};
  items: any = [];
  flag: boolean = undefined;
  isLoadingResults = true;
  constructor(private router: Router, private storage: LocalStorageService, private wservice: WserviceService) { }
  removeStarFunction(key_ticker) {
    var success = this.storage.remove(key_ticker);
    //*ngIf="curr['change'] >0;" style="color:green;"
    this.display();
  }
  returnlen() {
    return this.flag;
  }
  display() {
    var listt = [];
    this.result = this.storage.allStorage();
    var reskey = this.storage.keysList();
    var len = 0;
    if (reskey.length!=0) 
    {
      this.wservice.getStockData(reskey).subscribe(res => {
        // console.log("res w",res);
        this.result2 = res.data;
        reskey.sort();
        //console.log(reskey);
        for (let j = 0; j < reskey.length; j++) {
          if (parseInt(this.result[j].flag) == 1) {
            len = len + 1;
            let curr = this.result2.find(item => item.ticker === reskey[j]);
            let last = curr.last;
            let prevClose = curr.prevClose;
            let change = Number(last) - Number(prevClose);
            let changePercent = (Number)(change * 100) / Number(prevClose);
            let current = {
              "key": reskey[j],
              "name": this.result[j].name,
              "last": last,
              "change": change,
              "changePercent": changePercent
            }

            console.log(current, "updated");
            listt.push(current);

          }
          
        }
        if (len > 0) { this.flag = true; }
          else {
            this.flag = false;
          }
        this.items = listt;
        console.log("items", this.items);

      }, err => {
        console.log(err);

      });
    }
    else { this.flag = false };
  }
  ngOnInit(): void {
    this.isLoadingResults = true;
    this.result = this.storage.allStorage();
    var reskey = this.storage.keysList();
    var len = 0;
    if (reskey.length!=0) {
      this.wservice.getStockData(reskey).subscribe(res => {
        // console.log("res w",res);
        this.result2 = res.data;
        reskey.sort();
        //console.log(reskey);
        for (let j = 0; j < reskey.length; j++) {
          if (parseInt(this.result[j].flag) == 1) {
            len = len + 1;
            let curr = this.result2.find(item => item.ticker === reskey[j]);
            //console.log("key",reskey[j]);
            //console.log("curr",curr);
            //console.log(reskey[j].name);
            let last = curr.last;
            let prevClose = curr.prevClose;
            let change = Number(last) - Number(prevClose);
            let changePercent = (Number)(change * 100) / Number(prevClose);
            let current = {
              "key": reskey[j],
              "name": this.result[j].name,
              "last": last,
              "change": change,
              "changePercent": changePercent
            }

            console.log(current);
            this.items.push(current);
          }
          
        }
        if (len > 0) { this.flag = true; }
          else {
            this.flag = false;
          }
        //console.log("items", this.items);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);

      });
    }
    else { this.flag = false ;
      this.isLoadingResults = false;};



  }

}
