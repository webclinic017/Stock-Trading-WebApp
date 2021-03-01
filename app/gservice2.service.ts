import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Gservice2Service {

  constructor() { }
  public data:any ;

    setData(val:any){
        this.data = val;
        console.log("serive");
        console.log(this.data);
    }

    getData():any{
        return this.data;
    }
    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new  BehaviorSubject(this.editDataDetails);
    currentMessage = this.messageSource.asObservable();
    changeMessage(message: string) 
    {this.messageSource.next(message)
    }
    
}
