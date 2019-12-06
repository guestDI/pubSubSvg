import {
    publish
} from "./pubsub";
import {
    lineCoordinates
} from "../lineChartData.js";
import Chart from "./Chart";
import {
    transformCoordinatesToString
} from './helpers/helpers';

const radius = 5;

function LineChartIn() {
    Chart.call(this);
    this.lineChart;
    this.lineChartData;
    this.lineDots = [];
    this.line;

    this.onButtonClick = function (event) {
        const data =
            event.target.value === "Credit" ?
            lineCoordinates.credit :
            event.target.value === "Interest" ?
            lineCoordinates.interest :
            event.target.value === "Total Income" ?
            lineCoordinates.income :
            lineCoordinates.expenses;
        this.draw(data);
    }

    this.draw = function (data) {
        Chart.prototype.draw.call(this, 'LineChart');

        if (this.lineDots.length) {
            this.lineDots.forEach((dot, index) => {
                dot.setAttribute("cx", data[index]["x"]);
                dot.setAttribute("cy", data[index]["y"]);
                dot.setAttribute("data-value", data[index]["x"]);
                this.lineDots[index] = dot;
            });
            this.line.setAttribute("d", `M${transformCoordinatesToString(data)}`);
        } else {
            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("d", `M${transformCoordinatesToString(data)}`);

            this.lineChart.appendChild(path);
            this.line = path;

            data.forEach(d => {
                const dot = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );
                dot.setAttribute("cx", d["x"]);
                dot.setAttribute("cy", d["y"]);
                dot.setAttribute("r", radius);
                dot.setAttribute("data-value", d["x"]);
                this.lineChartData.appendChild(dot);
                //TODO: change event listener to parent
                dot.addEventListener("click", this.onDotClick);
                this.lineDots.push(dot);
            });
        }
    }

    this.onDotClick = function (event) {
        publish("onClick", event.target.dataset.value);
    }
}

LineChartIn.prototype = Object.create(Chart.prototype);

LineChartIn.prototype.init = function () {
    this.lineChart = document.querySelector(".line-chart");
    this.lineChartData = document.querySelector(".line-chart > .data");

    const buttons = document.querySelectorAll(".button-group > .btn");

    buttons.forEach(button => {
        button.addEventListener("click", this.onButtonClick.bind(this));
    });
};

export default LineChartIn;