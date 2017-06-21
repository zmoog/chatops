import mocha = require("mocha");
import expect = require("expect.js");
import {SlackCommand} from "../../scripts/Types";
import EcsDescribeInstancesProcessor from "../../scripts/EcsDescribeInstancesProcessor";
import TokenValidationProcessor from "../../scripts/TokenValidationProcessor";
import Processor from "../../scripts/Processor";


describe("ECS Describe Instances, given a command from Slack", () => {

    let processor: Processor;

    context("When the Slack command contains an invalid token", () => {

        let commandIn: SlackCommand =
            {
                token: "i-am-an-invalid-token",
                team_id: "XXX",
                team_domain: "your-slack-name",
                channel_id: "C5417KHQ8",
                channel_name: "deployments",
                user_id: "your-user-id",
                user_name: "santa",
                command: "/ecs",
                text: "ci",
                response_url: "https://hooks.slack.com/commands/xx/yy/zz"
            };

        let messageOut = {
            text: `I'm sorry, you've provided an invalid Verification Token (i-am-an-invalid-token). Please, check the configuration of your Slack App.`
        };

        beforeEach(() => {
            processor = new TokenValidationProcessor("abc");
            processor.successor = new EcsDescribeInstancesProcessor();
        });

        it("should return an response with an error message", () => {

            let responseMessage = processor.execute(commandIn);

            expect(responseMessage).to.be.eql(messageOut);
        });
    });


    context("When the Slack command is valid", () => {

        let commandIn: SlackCommand =
            {
                token: "xxxx",
                team_id: "XXX",
                team_domain: "your-slack-name",
                channel_id: "C5417KHQ8",
                channel_name: "deployments",
                user_id: "your-user-id",
                user_name: "santa",
                command: "/ecs",
                text: "ci",
                response_url: "https://hooks.slack.com/commands/xx/yy/zz"
            };

        let messageOut = {};

        beforeEach(() => {
            processor = new TokenValidationProcessor("xxxx");
            processor.successor = new EcsDescribeInstancesProcessor();
        });

        it("should return an response with attachments", () => {

            let responseMessage = processor.execute(commandIn);

            expect(responseMessage).to.be.eql(messageOut);
        });

    });
});
