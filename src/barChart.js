import {
  subscribe
} from "./pubsub";

let barChart = null;
const barChartElems = [];

function generateData() {
  const chartData = new Array(6)
    .fill(0)
    .map(
      () => Math.floor(Math.random() * (20 - 5 + 1)) + 5
    );

  return chartData;
}


function generateChart(data) {
  let currentX = 21;
  if (barChartElems.length) {
    barChartElems.forEach((bar, index) => {
      bar.setAttribute('height', `${data[index]}0px`);
      barChartElems[index] = bar;
    })
  } else {
    barChart = document.querySelector('.bar-chart > .data');
    barChart.setAttribute("transform", "rotate(-180 99 186)");
    data.forEach((entry, index) => {
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute('x', currentX);
      bar.setAttribute('y', 174);
      bar.setAttribute('height', `${entry}0px`);
      bar.setAttribute('width', `25px`);
      bar.setAttribute('class', 'bar');
      bar.setAttribute('style', 'transition: 1.5s all;');
      barChart.appendChild(bar);
      barChartElems.push(bar);
      currentX += 26;
    });
  }
}

subscribe("onClick", () => {
  generateChart(generateData());
});