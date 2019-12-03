import "./index.html";
import "./stylesheets/index.scss";
import "./src/pieChart";

import LineChartIn from "./src/lineChart";
import BarChart from "./src/barChart";
import HorizontalBarChart from "./src/horizontalBarChart";

const lineChart = new LineChartIn();
const barChart = new BarChart();
const horizontalBarChart = new HorizontalBarChart();

window.onload = function () {
    lineChart.init();
    barChart.init();
    horizontalBarChart.init();
};