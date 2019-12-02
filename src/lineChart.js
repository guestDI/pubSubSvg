import {
    publish
} from "./pubsub";
import {
    lineCoordinates
} from '../lineChartData.js'

let lineChart, lineChartData;
const lineDots = [];
let line;

function initEventListeners() {
    const buttons = document.querySelectorAll('.button-group > .btn');
    buttons.forEach(dot => {
        dot.addEventListener('click', onButtonClick);
    })

    lineChart = document.querySelector('.line-chart');
    lineChartData = document.querySelector('.line-chart > .data');
}

function addEventListeners() {
    const dots = document.querySelectorAll('.line-chart > .data > circle');
    dots.forEach(dot => {
        // dot.addEventListener('mouseover', mouseOverEffect);
        // dot.addEventListener('mouseout', mouseOutEffect);
        dot.addEventListener('click', onDotClick);
    });
}

function onButtonClick(event) {
    const data = event.target.value === 'Credit' ? lineCoordinates.credit :
        event.target.value === 'Interest' ? lineCoordinates.interest :
        event.target.value === 'Total Income' ? lineCoordinates.income : lineCoordinates.expenses;
    drawChart(data);
}

function transformCoordinatesToString(coordinates) {
    const initialArray = coordinates.map(point => {
        return Object.values(point)
    });

    return initialArray.join(' ');
}

function drawChart(data) {
    if (lineDots.length) {
        lineDots.forEach((dot, index) => {
            dot.setAttribute('cx', data[index]['x']);
            dot.setAttribute('cy', data[index]['y']);
            dot.setAttribute('data-value', data[index]['x']);
            lineDots[index] = dot;
        })

        line.setAttribute('points', `${transformCoordinatesToString(data)}`);
    } else {
        data.forEach((d) => {
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute('cx', d['x']);
            dot.setAttribute('cy', d['y']);
            dot.setAttribute('r', 10);
            dot.setAttribute('data-value', d['x']);
            dot.setAttribute('style', 'transition: 0.6s all;');
            lineChartData.appendChild(dot);
            dot.addEventListener('click', onDotClick);
            lineDots.push(dot);

        })

        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', 'red');
        polyline.setAttribute('stroke-width', '2');
        polyline.setAttribute('points', `${transformCoordinatesToString(data)}`);
        lineChart.appendChild(polyline);
        line = polyline;
    }
}

function onDotClick(event) {
    publish('onClick', event.target.dataset.value);
}

function mouseOverEffect(event) {
    console.log(event.target.style = "transform: scale(2)")
}

// function mouseOutEffect() {
//     publish('onClick', 'hello');
// }

export function publishEvent(event, data) {
    publish(event, data);
};

window.onload = function () {
    initEventListeners();
};