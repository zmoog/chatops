import mocha = require("mocha");
import expect = require("expect.js");
import {Event, EventResponse} from "../../../scripts/Types";
import {Pipeline} from "../../../scripts/bootstrap/Pipeline";


describe("ProcessEvent Function, given a URL Verification Event from Slack", () => {

    let pipeline: Pipeline;

    context("When the Event have a valid verification token", () => {

        let event: Event =
            {
                token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
                challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
                type: "url_verification"
            };

        beforeEach(() => {
            pipeline = new Pipeline();
        });

        it("should return the exact same challenge from the event.", () => {
            let response: EventResponse = pipeline.execute  (event);

            expect(response.challenge).to.be(event.challenge);
        });
    });

    context("When the Event have a invalid verification token", () => {

        let event: Event =
            {
                token: "INVALID",
                challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
                type: "url_verification"
            };

        beforeEach(() => {
            pipeline = new Pipeline();
        });

        it("should return an Error object with a message property with the `invalid_token` value.", () => {
            let response: EventResponse = pipeline.execute(event);

            expect(response.challenge).to.not.be(event.challenge);
            expect(response.message).to.be("invalid_token");
        });
    });
});
