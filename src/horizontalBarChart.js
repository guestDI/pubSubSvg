import {
  subscribe
} from "./pubsub";
import Chart from "./Chart";
import {
  generateData
} from './helpers/helpers';

function HorizontalBarChart() {
  Chart.call(this);
  this.horizontalBarChart;
  this.barChartElems = [];

  this.draw = function (data) {
    let currentY = 174;
    if (this.barChartElems.length) {
      this.barChartElems.forEach((bar, index) => {
        bar.setAttribute('width', `${data[index]}0px`);
        this.barChartElems[index] = bar;
      })
    } else {
      data.forEach((entry, index) => {
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute('x', 21);
        bar.setAttribute('y', currentY);
        bar.setAttribute('height', `25px`);
        bar.setAttribute('width', `${entry}0px`);
        bar.setAttribute('class', 'bar');
        bar.setAttribute('style', 'transition: 1.5s all;');
        this.horizontalBarChart.appendChild(bar);
        this.barChartElems.push(bar);
        currentY -= 26;
      });
    }
  }

  subscribe("onClick", () => {
    this.draw(generateData(20, 5));
  });

}

HorizontalBarChart.prototype = Object.create(Chart.prototype);

HorizontalBarChart.prototype.init = function () {
  this.horizontalBarChart = document.querySelector('.h-bar-chart');
}

export default HorizontalBarChart;