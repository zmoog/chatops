import mocha = require("mocha");
import expect = require("expect.js");
import {Event, EventResponse, SlashCommand} from "../../../scripts/Types";
import {Pipeline} from "../../../scripts/bootstrap/Pipeline";
import {CommandPipeline} from "../../../scripts/bootstrap/CommandPipeline";


describe("ProcessCommands Function, given a Slash Command from Slack", () => {

    let pipeline: CommandPipeline;

    context("When the Slash Command is valid", () => {

        let command: SlashCommand =
            {
                token: "xxxx",
                team_id: "XXX",
                team_domain: "your-slack-name",
                channel_id: "C5417KHQ8",
                channel_name: "deployments",
                user_id: "yout-user-id",
                user_name: "santa",
                command: "/ecs",
                text: "ci",
                response_url: "https://hooks.slack.com/commands/T4ZFBAUCX/199112504165/kHXtZlXXFWPW297QLOQPrCfE"
            };

        beforeEach(() => {
            pipeline = new CommandPipeline();
        });

        it("should return a message.", () => {

            let response: EventResponse = pipeline.execute(command);

            // expect(response.challenge).to.be(response);
        });
    });

});
