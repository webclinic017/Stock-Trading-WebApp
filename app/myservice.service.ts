import {HttpClientModule} from '@angular/common/http';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError, forkJoin} from "rxjs";
import { mergeMap } from 'rxjs/operators';
import { Gservice2Service } from './gservice2.service';
import { Router }  from '@angular/router';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
}
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  private finaldata = [];
  ticker:any;

//  private apiurl = "http://localhost:8088/detail/";
//   private apiurl2 = "http://localhost:8088/stock/";
//   private apiurl3 = "http://localhost:8088/news/"; 
//  private apiurl5 = "http://localhost:8088/charts/"; 

private apiurl = "/detail/";
private apiurl2 = "/stock/";
private apiurl3 = "/news/"; 
private apiurl5 = "/charts/";

  
  constructor(private http: HttpClient,private router:Router,
    private sharingService:Gservice2Service) { }
    getData(tickerdata): Observable<any> {
      //this.sharingService.currentMessage.subscribe(message => (this.tickerdata= message));
     
      this.ticker=tickerdata;
      const response1 = this.http.get(this.apiurl+tickerdata,httpOptions);
      const response2 = this.http.get(this.apiurl2+tickerdata,httpOptions);
      const response3 = this.http.get(this.apiurl3+tickerdata,httpOptions);
      //console.log(response1);
     // const response5 = this.http.get(this.apiurl5+tickerdata,httpOptions);
    
      return forkJoin([response1, response2, response3]);
    }
    retkey(){
      return this.ticker;
    }
    getHist(): Observable<any>{
      const response5 = this.http.get(this.apiurl5+this.ticker,httpOptions);
      const res:string=this.ticker;
      //console.log("in service ticker",res);
      return response5;
    }
    getStocks():Observable<any>{
      const response2 = this.http.get(this.apiurl2+this.ticker,httpOptions);
   
      //console.log("in service ticker",res);
      return response2;
    }
    
 
  
}
