import mocha = require("mocha");
import expect = require("expect.js");
import {SlackCommand} from "../../scripts/Types";


describe("ECS Describe Instances, given a command from Slack", () => {

    let processor: ECSDescribeInstancesProcessor;

    context("When the Slack command is valid", () => {

        let command: SlackCommand =
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
            processor = new ECSDescribeInstancesProcessor();
        });

        it("should return an response with attachments", () => {

            let response = processor.execute(command);

            expect(response.response_type).to.be("in_channel");
        });

    });
});


class ECSDescribeInstancesProcessor {
    execute(command: SlackCommand): any {
        return null;
    }
}