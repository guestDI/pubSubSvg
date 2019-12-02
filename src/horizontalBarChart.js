import {
  subscribe
} from "./pubsub";

let horizontalBarChart = null;
const barChartElems = [];

function initDom() {
  horizontalBarChart = document.querySelector('.h-bar-chart');
}

function generateData() {
  const chartData = new Array(6)
    .fill(0)
    .map(
      () => Math.floor(Math.random() * (20 - 5 + 1)) + 5
    );

  return chartData;
}


function generateChart(data) {
  let currentY = 174;
  if (barChartElems.length) {
    barChartElems.forEach((bar, index) => {
      bar.setAttribute('width', `${data[index]}0px`);
      barChartElems[index] = bar;
    })
  } else {
    horizontalBarChart = document.querySelector('.h-bar-chart');
    data.forEach((entry, index) => {
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute('x', 21);
      bar.setAttribute('y', currentY);
      bar.setAttribute('height', `25px`);
      bar.setAttribute('width', `${entry}0px`);
      bar.setAttribute('class', 'bar');
      bar.setAttribute('style', 'transition: 1.5s all;');
      horizontalBarChart.appendChild(bar);
      barChartElems.push(bar);
      currentY -= 26;
    });
  }
}

subscribe("onClick", () => {
  generateChart(generateData());
});