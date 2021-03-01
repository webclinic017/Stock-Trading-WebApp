import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError, forkJoin} from "rxjs";
import { mergeMap } from 'rxjs/operators';
import { Router }  from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
}
@Injectable({
  providedIn: 'root'
})
export class WserviceService {
  //private apiurl = "http://localhost:8088/stock/";
  private apiurl = "/stock/";
  constructor(private http: HttpClient,private router:Router) { }
  getStockData(arr): Observable<any>
  {
    var keylist="";
    console.log("wservice",arr);
    var i;
    for(i=0;i<arr.length-1;i++)
    {
      if(arr[i]){
        let a=arr[i];
         a=a.split("-")[0];
        console.log("a cmp in wservice",a);
      keylist=keylist+a+",";
      }
    }
    let a=arr[arr.length-1];
    if(a)
    {
      a=a.split("-")[0];
      console.log("a cmp in wservice",a);
      
    }
    keylist=keylist+a;
    console.log("wservice keylist", keylist);
    const response = this.http.get(this.apiurl+keylist,httpOptions);
    
    return response;
  }
}
