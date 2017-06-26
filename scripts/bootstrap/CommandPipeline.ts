import {Container, interfaces} from "inversify";
import {EventResponse, Event, SlashCommand, SlashCommandResponse, SlackConfig} from "../Types";
import IProcessor from "../IProcessor";
import IModule from "../IModule";
import IProcessorRegistry from "../IProcessorRegistry";
import CommandModule from "./CommandModule";


export class CommandPipeline implements IProcessor<SlashCommand, SlashCommandResponse> {

    private container: interfaces.Container = new Container();
    private registry: IProcessorRegistry<SlashCommand, SlashCommandResponse>;
    private module: IModule<IProcessorRegistry<SlashCommand, SlashCommandResponse>>;
    private slackConfig: SlackConfig;

    constructor() {
        this.module = new CommandModule();
        this.load(this.module);
        this.registry = this.container.get<IProcessorRegistry<SlashCommand, SlashCommandResponse>>("IProcessorRegistry");
        this.module.register(this.registry);
        this.slackConfig = this.container.get<SlackConfig>("SlackConfig");
    }

    private load(module: IModule<IProcessorRegistry<SlashCommand, SlashCommandResponse>>) {
        if (module.modules) {
            module.modules(this.container);
        }
    }

    execute(command: SlashCommand): SlashCommandResponse {

        if (!command.token || command.token !== this.slackConfig.token ) {
            return {
                text: "Invalid token"
            }
        }

        return this.registry.processorFor(command).execute(command);
    }

}