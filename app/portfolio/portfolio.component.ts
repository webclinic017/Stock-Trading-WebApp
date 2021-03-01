import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { WserviceService } from '../wservice.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  //result:any=[];
  //presult:any;
  //constructor(private router: Router, private storage: LocalStorageService ) { }

  //ngOnInit(): void {
  watchList: any = [];
  result: any={};
  result2: any = {};
  items: any = [];
  updated:any=[];
  public total: number = 0.00;
  public total2: number = 0.00;
  flag: boolean = false;
  public modalForm: FormGroup;
  public modalForm2: FormGroup;
  isLoadingResults = true;
  quantity: number = 0.00;
  quantity2: number = 0.00;
  public modal_item: any = {};
  public modal_item2: any = {};
  constructor(private router: Router, private formBuilder: FormBuilder, private storage: LocalStorageService, private wservice: WserviceService) { }
  additem(item) {
    this.modal_item = item;
    this.modalForm.patchValue({
      inputnum:0
     
    });
  }
  additem2(item2) {
    this.modal_item2 = item2;
    this.modalForm2.patchValue({
      inputnum2:0
     
    });
  }
  removeStarFunction(key_ticker) {
    var success = this.storage.remove(key_ticker + "-p");
    
    //*ngIf="curr['change'] >0;" style="color:green;"
  }
  returnlen() {
    return this.flag;
  }
  findTotal() {
    this.modalForm.valueChanges.subscribe(quan => {
      // console.log("modal_item is",this.modal_item);
      this.total = quan.inputnum * this.modal_item.last;
      this.quantity = quan.inputnum;

    },
      err => {
        console.log(err);

      });

  }
  findTotal2() {
    this.modalForm2.valueChanges.subscribe(quan => {
      // console.log("modal_item is",this.modal_item);
      this.total2 = quan.inputnum2 * this.modal_item2.last;
      this.quantity2 = quan.inputnum2;

    },
      err => {
        console.log(err);

      });

  }
  display() {
    this.result = this.storage.allStorage();
        var reskey = this.storage.keysList();
        var len = 0;
        this.updated=[];
        console.log("display reskey",reskey);
      if(reskey.length!=0)
      {
        this.wservice.getStockData(reskey).subscribe(res => {
          this.result2 = res.data;
          reskey.sort();
          for (let j = 0; j < reskey.length; j++) {
            if (parseInt(this.result[j].flag) == 0) {
             
              let curr: any = {};
              //console.log("key cmp",this.result[j].key);
              curr = this.result2?.find(item => item.ticker === this.result[j].key);
              if (this.result[j].quantity == 0) {
                let t = this.storage.remove(reskey[j]);
                continue;
              }
              len = len + 1;
              let last = curr.last;
              let total = this.result[j].total;
              let quantity = this.result[j].quantity;
              //(Total Cost / Quantity)
              let avgcost = total / quantity;
              //Change=(current price - Average cost per share)
              let change = Number(last) - avgcost;
              //let changePercent = (Number)(change * 100) / Number(prevClose);
              //(Current Price * Qty)
              let mktval = Number(last) * quantity;
              let current = {
                "key": this.result[j].key,
                "name": this.result[j].name,
                "quantity": quantity,
                "total": total,
                "last": last,
                "change": change.toFixed(2),
                "avgcost": avgcost,
                "mktval": mktval
              }

              //console.log(current);
              this.updated.push(current);
            }
            //this.items=[];
            this.items=this.updated;
            //console.log("len in display",len);
            if (len > 0) { this.flag = true; }
            else {
              this.flag = false;
            }
          }
          //console.log("flag",this.flag);
          this.quantity=0;
          this.quantity2=0;
          this.total=0.0;
          this.total2=0.0;

        }, err => {
          console.log(err);

        });
      }
      else { this.flag = false };
    }
  


      buy(){
        // this.showloader3=false;
        console.log("inBuyStock portfolio");
        //console.log(this.modal_item);
        //console.log("quantity is",quantity.inputnum);
        //this.total = quantity.inputnum * this.data2.last;
        let bought = {
          "key": this.modal_item.key, "name": this.modal_item.name,
          "quantity": this.quantity, "total": this.total, "flag": 0
        };
        var buySucess = this.storage.buyStock(this.modal_item.key + '-p', bought);
        this.display();
      }
      sell(){
        console.log("insellStock portfolio");
        //console.log(this.modal_item2);
        //console.log("quantity is",quantity.inputnum);
        //this.total = quantity.inputnum * this.data2.last;
        let sold = {
          "key": this.modal_item2.key, "name": this.modal_item2.name,
          "quantity": this.quantity2,  "flag": 0
        };
        var buySucess = this.storage.sellStock(this.modal_item2.key + '-p', sold);
        this.display();
      }
      ngOnInit(): void {
        this.modalForm = this.formBuilder.group({
          inputnum: [0, Validators.required]
        });
        this.modalForm2 = this.formBuilder.group({
          inputnum2: [0, Validators.required]
        });
        this.isLoadingResults = true;
        this.result = this.storage.allStorage();
        var reskey = this.storage.keysList();
        if(reskey.length!=0){
        var len = 0;
        this.wservice.getStockData(reskey).subscribe(res => {
         
          this.result2 = res.data;
          reskey.sort();
        
          for (let j = 0; j < reskey.length; j++) {
            if (parseInt(this.result[j].flag) == 0) {
              len = len + 1;
              let curr: any = {};
              //console.log("key cmp",this.result[j].key);
              curr = this.result2?.find(item => item.ticker === this.result[j].key);
              // console.log("key",reskey[j]);
              //console.log("is same", this.result[j].flag==reskey[j]);
              //console.log("curr portfolio",curr);
              //console.log(reskey[j].name);
              if (this.result[j].quantity == 0) {
                let t = this.storage.remove(reskey[j]);
                continue;
              }
              let last = curr.last;
              let total = this.result[j].total;
              let quantity = this.result[j].quantity;
              //(Total Cost / Quantity)
              let avgcost = total / quantity;
              //Change=(current price - Average cost per share)
              let change = Number(last) - avgcost;
              //let changePercent = (Number)(change * 100) / Number(prevClose);
              //(Current Price * Qty)
              let mktval = Number(last) * quantity;
              let current = {
                "key": this.result[j].key,
                "name": this.result[j].name,
                "quantity": quantity,
                "total": total,
                "last": last,
                "change": change.toFixed(2),
                "avgcost": avgcost,
                "mktval": mktval
              }

              //console.log(current);
              this.items.push(current);
            }
            if (len > 0) { this.flag = true; }
            else {
              this.flag = false;
            }
          }

          //console.log("items",this.items);
          this.isLoadingResults = false;
          this.findTotal();
          this.findTotal2();

        }, err => {
          console.log(err);

        });
      }
      else
      {this.flag=false;
        this.isLoadingResults = false;
      };
       
      }

    }
