import {
    subscribe
} from "./pubsub";

const total = 349;
let pie = null;

function setDomElements() {

}

var setPieChart = function (number) {
    pie = document.querySelector('.pie');
    const fixedNumber = numberFixer(number),
        result = fixedNumber + ' ' + total;

    // console.log(pie)
    pie.style.strokeDasharray = result;
}

const numberFixer = function (num) {
    var result = ((num * total) / 100);
    return result;
}

subscribe("onClick", data => {
    console.log(data)
    setPieChart(data);
});

// window.onload = function () {
//     setDomElements();
// };