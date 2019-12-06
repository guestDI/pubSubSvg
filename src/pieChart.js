import {
  subscribe
} from "./pubsub";
import Chart from './Chart';
import {
  generateData
} from './helpers/helpers';

const colors = [
  "rgba(0, 220, 255, 0.48)",
  "rgba(245, 79, 79, 0.77)",
  "rgba(245, 47, 245, 0.52)",
  "rgba(255, 255, 84, 0.81)",
  "rgba(34, 34, 255, 0.65)",
  "rgba(42, 163, 102, 0.81)"
];

const data = [{
    value: 40,
    color: '#FF0000',
    label: 'Alpha'
  },
  {
    value: 120,
    color: '#00FF00',
    label: 'Beta'
  },
  {
    value: 20,
    color: '#0000FF',
    label: 'Epsilon'
  },
  {
    value: 60,
    color: '#F0F000',
    label: 'Zeta'
  },
  {
    value: 70,
    color: '#F000F0',
    label: 'Kappa'
  }
];

function PieChart() {
  Chart.call(this);
  this.pieChart;
  this.pathElements = [];
  this.largeArc = '0 0 1';

  this.radius = 100;
  this.center = 100;

  this.draw = function (data) {
    console.log(data)
    this.values = data.map((record) => {
      return record;
    })
    this.max = this.values.reduce((pre, cur) => {
      return pre + cur;
    });
    this.ratios = this.values.map((val) => {
      return val / this.max;
    });


    let theta = -Math.PI * 0.5;

    this.circumPointFromAngle = function (cx, cy, r, a) {
      return [
        cx + r * Math.cos(a),
        cy + r * Math.sin(a)
      ];
    }

    if (this.pathElements.length) {
      // this.pathElements.forEach((el, index) => {
      // console.log(el)

      this.ratios.forEach((val, idx) => {
        let delta = val * 2 * Math.PI;
        let normal = theta + delta * 0.5;

        let startPos = this.circumPointFromAngle(this.center, this.center, this.radius, theta);
        let endPos = this.circumPointFromAngle(this.center, this.center, this.radius, theta + delta);

        theta += delta;


        if (delta >= Math.PI) {
          this.largeArc = '0 1 0';
        }

        const actions = [];
        actions.push('M ' + this.center + ' ' + this.center);
        actions.push('L ' + startPos.join(' '));
        actions.push('A ' + this.radius + ' ' + this.radius + ' ' + this.largeArc + ' ' + endPos.join(' '));
        actions.push('Z');

        // console.log(actions, index)
        let el = this.pathElements[idx];
        this.pathElements[idx].setAttribute('d', actions.join('\n'));
        this.pathElements[idx] = el;
      });

      // })
    } else {
      this.ratios.forEach((val, idx) => {
        // Get the angle of the segment (delta)
        let delta = val * 2 * Math.PI;

        // also get the normal from the center of this segment (for transition)
        let normal = theta + delta * 0.5;

        // These are the points on the circumfrence that the arc starts and ends
        let startPos = this.circumPointFromAngle(this.center, this.center, this.radius, theta);
        let endPos = this.circumPointFromAngle(this.center, this.center, this.radius, theta + delta);

        // Add the current delta to theta for the next segment
        theta += delta;

        // if the arc is greater than 180° we need to use the large arc flag
        // const largeArc = '0 0 1';
        if (delta >= Math.PI) {
          this.largeArc = '0 1 0';
        }

        // for convenience store each path command in an array
        const actions = [];
        actions.push('M ' + this.center + ' ' + this.center);
        actions.push('L ' + startPos.join(' '));
        actions.push('A ' + this.radius + ' ' + this.radius + ' ' + this.largeArc + ' ' + endPos.join(' '));
        actions.push('Z');

        // create the element, set the d attr, data attrs and fill style
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', actions.join('\n'));
        // path.setAttribute('data-label', data[idx].label);
        path.setAttribute('data-value', data[idx]);
        path.setAttribute('data-normal', normal);
        path.style.fill = colors[idx];
        this.pieChart.appendChild(path);
        this.pathElements.push(path);
      });
    }
  }

  subscribe("onClick", () => {
    this.draw(generateData(120, 20));
  });

}

PieChart.prototype = Object.create(Chart.prototype);

PieChart.prototype.init = function () {
  this.pieChart = document.querySelector('.pie-chart');
}

export default PieChart;