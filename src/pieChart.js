import {
    subscribe
} from "./pubsub";

subscribe("onClick", data => {
    console.log(
        `"onClick", was published with this data: "${data}"`
    );
});

subscribe("onClick", data => {
    console.log(
        `"onChange", was published with this data: "${data}"`
    );
});