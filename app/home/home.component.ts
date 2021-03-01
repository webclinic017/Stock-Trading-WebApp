import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormsModule ,ReactiveFormsModule, FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router }                          from '@angular/router';
import { Gservice2Service } from './../gservice2.service';
import { Routes, RouterModule } from '@angular/router';
import { AutoService } from './../auto.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public myticker:any;
  public seturl:any;
  public options:any=[];
  public testForm: FormGroup;
  isLoadingResults:boolean;
  
    constructor(private router:Router, private sharingAuto:AutoService,
        private sharingService:Gservice2Service ,private formBuilder: FormBuilder){
          
        }
        
    getval(val)
  {
    this.sharingService.changeMessage(val);
    //document.getElementById("searchbutton").focus();
  }
  
  
  ngOnInit(): void {
    
    this.testForm = this.formBuilder.group({
      ticker: ['', Validators.required]
    });
    this.onValueChanges();
}
 
  onValueChanges(): void {
    this.testForm.valueChanges.subscribe(myval=>{
      this.options=[];
      this.sharingAuto.changeMessage(myval.ticker);
      this.myticker=myval.ticker;
     
      if(myval.ticker){
        this.isLoadingResults=true;
      this.sharingAuto.getData().subscribe(res => {
        console.log("getting from auto");
        if(myval.ticker==this.myticker)
        {
        //console.log("value is", myval.ticker);
        //console.log("myticker is", this.myticker);
        var temp=res['data'];
       
        for(var curr of temp)
        {
          if(curr.ticker && curr.name){
          this.options.push(curr);
          }
        }
        this.isLoadingResults=false;
        //console.log(this.options);
      }
        
    },
   err => {
      console.log(err);
      
    });
    }
    else
    {
      this.options=[];
    }
      console.log(myval);
      
    
  });
    
  }

}
