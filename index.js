import "./index.html";
import "./stylesheets/index.scss";
import "./src/lineChart";
import "./src/pieChart";
import "./src/horizontalBarChart";
import "./src/barChart";

import LineChartIn from "./src/lineChart";

const lineChart = new LineChartIn();

window.onload = function () {
    lineChart.init();
};

console.log(lineChart);