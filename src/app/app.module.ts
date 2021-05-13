import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './app.service';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { SearchComponent } from './search/search.component';
import { ForecastComponent } from './forecast/forecast.component';
import { GraphComponent } from './graph/graph.component';
import { DatePipe } from '@angular/common';
import { LoadingInterceptorService } from './loading-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    WeatherInfoComponent,
    SearchComponent,
    ForecastComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AppService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
