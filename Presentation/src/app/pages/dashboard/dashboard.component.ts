import { Component, OnDestroy, OnInit } from '@angular/core';

// core components
import {
  Chart,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public datasets: number[][];
  public data: number[];
  public salesChart?: Chart<'line', number[], string>;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  private ordersChart?: Chart<'bar', number[], string>;

  constructor() { }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    const chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement | null;

    if (chartOrders) {
      this.ordersChart = new Chart(chartOrders, chartExample2);
    }

    const chartSales = document.getElementById('chart-sales') as HTMLCanvasElement | null;

    if (chartSales) {
      this.salesChart = new Chart(chartSales, chartExample1);
    }
  }

  public updateOptions() {
    if (!this.salesChart) {
      return;
    }

    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  ngOnDestroy() {
    this.ordersChart?.destroy();
    this.salesChart?.destroy();
  }
}
