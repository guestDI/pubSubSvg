import {
    publish
} from "./pubsub";

export function publishEvent(event, data) {
    publish(event, data);
};