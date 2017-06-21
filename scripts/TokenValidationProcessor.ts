import Processor from "./Processor";
import {SlackCommand} from "./Types";


export default class TokenValidationProcessor extends Processor {

    constructor(private token: string) {
        super();
    }

    execute(command: SlackCommand): any {
        if (this.token !== command.token) {
            return {
                text: `I'm sorry, you've provided an invalid Verification Token (${command.token}). Please, check the configuration of your Slack App.`
            };
        }
        return this.successor.execute(command);
    }
}