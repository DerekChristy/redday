import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  onCityChange = new Subject();
  onLoading = new BehaviorSubject({ show: true });
  $onCityChange = this.onCityChange.asObservable();
  $onLoading = this.onLoading.asObservable();
  currentCity;
  constructor(private http: HttpClient) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.searchByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          ).subscribe((res) => {
            if (res) {
              this.setCurrentCity(res);
            }
          });
        },
        (err) => {
          this.searchWeatherByCity('Delhi').subscribe((res) => {
            if (res) {
              this.setCurrentCity(res);
            }
          });
        }
      );
    } else {
      this.searchWeatherByCity('Bokaro').subscribe((res) => {
        if (res) {
          this.setCurrentCity(res);
        }
      });
    }
  }
  searchWeatherByCity(city: string): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&APPID=' +
        environment.weatherKey +
        '&units=metric'
    );
  }
  searchByCoords(lat, lon) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherKey}&units=metric`
    );
  }
  setCurrentCity(city) {
    this.currentCity = city;
    this.onCityChange.next(city);
    console.log(city);
  }
  getForecast() {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.currentCity.name}&appid=${environment.weatherKey}&units=metric`
    );
  }
  hideLoading() {
    this.onLoading.next({ show: false });
  }
  showLoading() {
    this.onLoading.next({ show: true });
  }
}
