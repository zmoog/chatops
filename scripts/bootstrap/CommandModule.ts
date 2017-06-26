import {Container, interfaces} from "inversify";
import IModule from "../IModule";
import IProcessorRegistry from "../IProcessorRegistry";
import {EventResponse, Event, SlashCommandResponse, SlashCommand, SlackConfig} from "../Types";
import EventProcessorRegistry from "../events/EventProcessorRegistry";
import URLVerificationProcessor from "../events/URLVerificationProcessor";


class CommandModule implements IModule<IProcessorRegistry<SlashCommand, SlashCommandResponse>> {

    modules = (container: interfaces.Container) => {

        console.log(`registering services in the IoC container`);

        // services
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<SlackConfig>("SlackConfig").toConstantValue({
            token: "123"
        });
        container.bind<IProcessorRegistry<Event, EventResponse>>("IProcessorRegistry").to(EventProcessorRegistry).inSingletonScope();
    }

    register(registry: IProcessorRegistry<SlashCommand, SlashCommandResponse>): void {

        // registry
        //     .add(URLVerificationProcessor)
        //     .for("url_verification");
        //
        // registry
        //     .add(URLVerificationProcessor)
        //     .for("event_callback:message");
    }
}

export default CommandModule;