import {Event, EventResponse} from "../Types";
import IProcessor from "../IProcessor";
import {injectable} from "inversify";


@injectable()
class URLVerificationProcessor implements IProcessor<Event, EventResponse> {
    execute(event: Event): EventResponse {
        return {
            challenge: event.challenge
        };
    }
}

export default URLVerificationProcessor;