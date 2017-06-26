import mocha = require("mocha");
import expect = require("expect.js");
import {CallbackEvent, Event, EventResponse} from "../../../scripts/Types";
import IProcessor from "../../../scripts/IProcessor";


describe("EventCallbackProcessor, given an event from Slack", () => {

    let processor: IProcessor<Event, EventResponse>;
    let event: CallbackEvent =
        {
            "token": "xxx",
            "team_id": "T4ZFBAUCX",
            "api_app_id": "A5TBWDPAL",
            "event": {
                "type": "message",
                "user": "U4Y3T0YL8",
                "text": "hello",
                "ts": "1498374870.985086",
                "channel": "D5Z76EV37",
                "event_ts": "1498374870.985086"
            },
            "type": "event_callback",
            "authed_users": [
                "U5ZU7Q9UN"
            ],
            "event_id": "Ev5Z5QE420",
            "event_time": 1498374870
        }


    context("When the Slack Message Event is received", () => {


        beforeEach(() => {
            // processor = new URLVerificationProcessor();
        });

        it("should return a feedback to the user", () => {
            let response = processor.execute(event);

            // expect(response.challenge).to.be(event.challenge);
        });

    });
});
