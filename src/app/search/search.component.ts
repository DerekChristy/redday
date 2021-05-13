import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
interface location {
  lat: number;
  lon: number;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  searchType = new FormControl();
  currentCity;
  loc: location = {
    lat: 0,
    lon: 0,
  };
  constructor(private appService: AppService) {
    this.searchType.setValue('city');
  }

  ngOnInit(): void {}
  onCity() {
    if (this.search.value && this.search.value.length > 2)
      this.appService.searchWeatherByCity(this.search.value).subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.currentCity = res;
            this.appService.setCurrentCity(res);
          }
        },
        (err) => {
          // do nothing
        }
      );
  }
  onLat() {
    this.appService.searchByCoords(this.loc.lat, this.loc.lon).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.currentCity = res;
          this.appService.setCurrentCity(res);
        }
      },
      (err) => {}
    );
  }
}
