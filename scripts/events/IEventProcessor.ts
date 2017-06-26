import {Event, URLVerificationResponse} from "../Types";

export interface IEventProcessor {
    execute<T extends Event>(event: T): URLVerificationResponse
}
