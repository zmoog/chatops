import IProcessor from "../IProcessor";
import {SlashCommand, SlashCommandResponse} from "../Types";
import {injectable, inject} from "inversify";


@injectable()
class TokenVerifierProcessor implements IProcessor<SlashCommand, SlashCommandResponse> {

    constructor(@inject("SlackConfig") private slackConfig: any) {

    }

    execute(command: SlashCommand): SlashCommandResponse {



        return null;
    }
}