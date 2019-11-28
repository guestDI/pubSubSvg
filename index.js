import './index.html';
import './stylesheets/index.scss';

import {
    publishEvent
} from "./src/lineChart";
import pieChart from "./src/pieChart";

publishEvent("onClick", 'hello');
publishEvent("onChange", 'hello');