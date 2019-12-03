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

function LineChartIn() {
    Chart.call(this);
    this.lineChart;
    this.lineChartData;
    this.lineDots = [];
    this.line;

    const _this = this;
    Object.setPrototypeOf(LineChartIn.prototype, Chart.prototype);

    LineChartIn.prototype.init = function () {
        this.lineChart = document.querySelector(".line-chart");
        this.lineChartData = document.querySelector(".line-chart > .data");

        const buttons = document.querySelectorAll(".button-group > .btn");

        buttons.forEach(button => {
            button.addEventListener("click", onButtonClick.bind(this));
        });
    };

    function onButtonClick(event) {
        const data =
            event.target.value === "Credit" ?
            lineCoordinates.credit :
            event.target.value === "Interest" ?
            lineCoordinates.interest :
            event.target.value === "Total Income" ?
            lineCoordinates.income :
            lineCoordinates.expenses;
        draw(data);
    }

    function draw(data) {
        if (_this.lineDots.length) {
            _this.lineDots.forEach((dot, index) => {
                dot.setAttribute("cx", data[index]["x"]);
                dot.setAttribute("cy", data[index]["y"]);
                dot.setAttribute("data-value", data[index]["x"]);
                _this.lineDots[index] = dot;
            });
            _this.line.setAttribute("d", `M${transformCoordinatesToString(data)}`);
        } else {
            data.forEach(d => {
                const dot = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );
                dot.setAttribute("cx", d["x"]);
                dot.setAttribute("cy", d["y"]);
                dot.setAttribute("r", 10);
                dot.setAttribute("data-value", d["x"]);
                dot.setAttribute("style", "transition: 0.3s all;");
                _this.lineChartData.appendChild(dot);
                dot.addEventListener("click", onDotClick);
                _this.lineDots.push(dot);
            });

            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "red");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("d", `M${transformCoordinatesToString(data)}`);

            _this.lineChart.appendChild(path);
            _this.line = path;
        }
    }

    function onDotClick(event) {
        publish("onClick", event.target.dataset.value);
    }
}

export default LineChartIn;