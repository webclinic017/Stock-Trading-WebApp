import { Injectable } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { Router }  from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { Gservice2Service } from './gservice2.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError, forkJoin} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
}

@Injectable({
  providedIn: 'root'
})
export class DailychartsService {
  public tickerdata:any;
  public mytemp:any;
  constructor(private http: HttpClient,private router:Router,
    private sharingService:Gservice2Service) { }
  //private apiurl4 = "http://localhost:8088/dailycharts/"; 
  private apiurl4 = "/dailycharts/"; 
  getData(name,myval): Observable<any> {
    //this.sharingService.currentMessage.subscribe(message => (this.tickerdata= message));
    this.mytemp=myval.split('T')[0];
      
    
    //console.log("myval",myval);
    //console.log("printing timestamp", this.mytemp);
    const response = this.http.get(this.apiurl4+name+"/"+this.mytemp,httpOptions);
    
    return response;
  }
 
  
}
