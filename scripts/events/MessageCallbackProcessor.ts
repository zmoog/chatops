import IProcessor from "../IProcessor";
import {Event, EventResponse} from "../Types";
import {injectable} from "inversify";


@injectable()
class MessageCallbackProcessor implements IProcessor<Event, EventResponse> {

    constructor() {}

    execute(event: Event): EventResponse {
        return {
            challenge: event.challenge
        };
    }
}

export default MessageCallbackProcessor;