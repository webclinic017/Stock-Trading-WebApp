import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MyserviceService } from './myservice.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { Gservice2Service } from './gservice2.service';
import { WserviceService } from './wservice.service';
import {DailychartsService} from './dailycharts.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { AutoService } from './auto.service';
import { LocalStorageService } from './local-storage.service';
import * as Highcharts from 'highcharts';
import { HchartsComponent } from './hcharts/hcharts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WatchlistComponent,
    PortfolioComponent,
    DetailsComponent,
    HchartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    HighchartsChartModule,
    NgbModule,
  
    
  ],
  providers: [MyserviceService,Gservice2Service,AutoService ,DailychartsService,LocalStorageService,WserviceService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
