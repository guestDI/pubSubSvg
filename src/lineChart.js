import {
    publish
} from "./pubsub";

function initEventListeners() {
    const dots = document.querySelectorAll('.data > circle');
    dots.forEach(dot => {
        // dot.addEventListener('mouseover', mouseOverEffect);
        // dot.addEventListener('mouseout', mouseOutEffect);
        dot.addEventListener('click', onDotClick);
    })
}

function onDotClick(event) {
    // console.log(event.target.dataset.value)
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