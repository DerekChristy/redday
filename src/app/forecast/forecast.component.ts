import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  list;
  city;
  sortList;
  displayList;
  currentList = [];
  humidityList;
  constructor(private appService: AppService, private datePipe: DatePipe) {
    this.appService.$onCityChange.subscribe((res) => {
      if (res) {
        this.updateForecast();
      }
    });
  }

  ngOnInit(): void {
    this.updateForecast();
  }
  updateForecast() {
    this.appService.getForecast().subscribe(
      (res) => {
        if (res) {
          this.list = res['list'];
          this.city = res['city'];
          this.sortDataDayWise();
        }
      },
      (err) => {}
    );
  }
  sortDataDayWise() {
    this.sortList = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    this.list.forEach((data) => {
      let day = this.getLocaleDate(data['dt']).getDay();
      this.sortList[day].push(data);
    });
    this.orderByDay();
  }
  orderByDay() {
    this.displayList = [];
    let today = new Date().getDay();
    for (let i = 0; i < 6; i++) {
      this.displayList.push(this.sortList[(today + i) % 7]);
    }
    console.log(this.displayList);
    this.changeCurrentList(this.displayList[0]);
    // this.changeCurrentList(this.displayList[0]);
    // this.updateHumidity(this.displayList[0]);
  }
  getLocaleDate(date) {
    return new Date(date * 1000 + this.city['timezone'] * 1000);
  }
  getIcon(code) {
    return `http://openweathermap.org/img/wn/${code}@4x.png`;
  }
  // updateHumidity(list) {
  //   this.getHumidity = list.map((data) => {
  //     return {
  //       humidity: data.main.humidity,
  //       time: this.datePipe.transform(this.getLocaleDate(data.dt), 'h a'),
  //     };
  //   });
  // }
  getHum(): any[] {
    return this.currentList.map((data) => {
      return {
        humidity: data.main.humidity,
        time: this.datePipe.transform(this.getLocaleDate(data.dt), 'h a'),
      };
    });
  }
  changeCurrentList(data) {
    this.currentList = data;
    this.humidityList = this.getHum();
    // this.updateHumidity(data);
  }
}
