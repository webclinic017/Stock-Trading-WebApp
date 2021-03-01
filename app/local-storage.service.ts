import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() { 
    this.localStorage = window.localStorage;
  }
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }
  sellStock(key: string, value: any):any{
    if (this.isLocalStorageSupported) {
      var klist=Object.keys(this.localStorage);
      if(klist.indexOf(key) !== -1) //value exists
      {
        var obj=JSON.parse(this.localStorage.getItem(key));
        let result=this.localStorage.removeItem(key);
        let avg=Number(obj.total)/ Number(obj.quantity); //avg cost per share
        let t1= Number(obj.quantity) - Number(value['quantity']);
        console.log(obj.quantity,value['quantity']);
        if(t1==0) //if quantity is zero
        {
          return true;
        }
        let reduce=Number(value['quantity']) * avg; //sold quantity * avg cost per share
        let t2=obj.total - reduce;
        let fresh={"key":value['key'],"name":value['name'],
        "quantity":t1,"total" :t2,"flag":0};
        this.localStorage.setItem(value['key']+'-p',JSON.stringify(fresh));
      }
      
      return true;
    }
  return false;
  }
  buyStock(key: string, value: any):any {
   
    if (this.isLocalStorageSupported) {
      var klist=Object.keys(this.localStorage);
      if(klist.indexOf(key) !== -1) //value exists
      {
        var obj=JSON.parse(this.localStorage.getItem(key));
        let result=this.localStorage.removeItem(key);
        let t1= obj.quantity + value['quantity'];
        console.log(obj.quantity,value['quantity']);
        let t2=obj.total + value['total'];
        let fresh={"key":value['key'],"name":value['name'],
        "quantity":t1,"total" :t2,"flag":0};
        this.localStorage.setItem(value['key']+'-p',JSON.stringify(fresh));
      }
      else
      {
        this.localStorage.setItem(key,JSON.stringify(value));
        console.log("set in storage");
       
      }
      // first get item
      return true;
    }
  return false;
    
  }

  keysList():any[]
  {
    if (this.isLocalStorageSupported) {
          var keylist = Object.keys(this.localStorage),
          i = keylist.length;
          return keylist;
    }
    return null;
  
  }
  allStorage() : any{
    if (this.isLocalStorageSupported) {
    var values:any=[],
        keys = Object.keys(this.localStorage),
        i ;
        keys.sort();
        //keys.sort(function(a, b) { return values[a] > values[b] });
        console.log("the keys",keys);

    for(i=0;i<keys.length;i++) {
      console.log("the keys itr",keys[i]);
        values.push(JSON.parse(this.localStorage.getItem(keys[i]) ));
    }
    return values;
  }
  return null;
}
  set(key: string, value: any): any {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      console.log("set in storage");
      return true;
    }
  return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
