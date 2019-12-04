import {
  subscribe
} from "./pubsub";
import Chart from "./Chart";
import {
  generateData
} from './helpers/helpers';

function BarChart() {
  Chart.call(this);
  this.barChart;
  this.barChartElems = [];

  this.draw = function (data) {
    Chart.prototype.draw.call(this, 'BarChart');
    let currentX = 21;
    if (this.barChartElems.length) {
      this.barChartElems.forEach((bar, index) => {
        bar.setAttribute('height', `${data[index]}0px`);
        this.barChartElems[index] = bar;
      })
    } else {
      this.barChart.setAttribute("transform", "rotate(-180 99 186)");
      data.forEach((entry, index) => {
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute('x', currentX);
        bar.setAttribute('y', 174);
        bar.setAttribute('height', `${entry}0px`);
        bar.setAttribute('width', `25px`);
        bar.setAttribute('class', 'bar');
        bar.setAttribute('style', 'transition: 1.5s all;');
        this.barChart.appendChild(bar);
        this.barChartElems.push(bar);
        currentX += 26;
      });
    }
  }

  subscribe("onClick", () => {
    this.draw(generateData(20, 5));
  });
}

BarChart.prototype = Object.create(Chart.prototype);

BarChart.prototype.init = function () {
  this.barChart = document.querySelector('.bar-chart > .data');
}

export default BarChart;