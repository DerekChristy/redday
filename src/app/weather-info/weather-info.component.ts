import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  city;
  constructor(private appServie: AppService) {
    appServie.$onCityChange.subscribe((res) => {
      if (res) {
        console.log('got new city');
        this.city = res;
      }
    });
  }

  ngOnInit(): void {}

  getIcon(code) {
    return `http://openweathermap.org/img/wn/${code}@4x.png`;
  }
  getLocaleDate(date, zone) {
    return new Date(date * 1000 + zone * 1000);
  }
}
