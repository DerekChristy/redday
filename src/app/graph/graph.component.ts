import { Component, Input, OnChanges, OnInit } from '@angular/core';
// import $ from 'jquery';
var Chart: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() data: any[];
  areaGraph: any;
  constructor() {}

  ngOnInit(): void {
    Chart = window['Morris'];
    console.log('grapu', this.data);
    setTimeout(this.createChart.bind(this), 500);

    // $('#graph').resize(function () {
    //   this.areaGraph.redraw();
    // });
  }
  ngOnChanges() {
    if (this.areaGraph) {
      this.areaGraph.setData(this.data);
    }
  }
  createChart() {
    this.areaGraph = Chart.Area({
      element: 'graph',
      data: this.data,
      xkey: 'time',
      ykeys: ['humidity'],
      labels: ['Humidity'],
      parseTime: false,
      yLabelFormat: (y) => y + '%',
      lineColors: ['#000000'],
      fillOpacity: 0.3,
      axes: 'x',
      hideHover: 'auto',
      resize: true,
    });
  }
}
