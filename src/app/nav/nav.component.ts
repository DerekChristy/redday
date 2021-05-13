import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  city;
  constructor(private appService: AppService) {
    appService.$onCityChange.subscribe((res) => {
      if (res) {
        this.city = res;
      }
    });
  }

  ngOnInit() {}
}
