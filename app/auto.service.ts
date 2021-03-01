import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router }                          from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
}
@Injectable({
  providedIn: 'root'
})
export class AutoService {
  public dataa:any ;
  //public apiurl = "http://localhost:8088/auto/";
  public apiurl = "/auto/";
  getData(){
    const response1 = this.http.get(this.apiurl+this.dataa,httpOptions);
    console.log(this.apiurl+this.dataa);
    return response1;
  }
  constructor(private http: HttpClient,private router:Router) { }
  public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new  BehaviorSubject(this.editDataDetails);
    currentMessage = this.messageSource.asObservable();
    changeMessage(message: string) 
    {this.messageSource.next(message);
      this.dataa=message;
      console.log('message changed');
    }
}
