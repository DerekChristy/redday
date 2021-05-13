import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading = true;
  constructor(private appService: AppService) {
    this.appService.$onCityChange.subscribe((res) => {
      if (res) {
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}
}
