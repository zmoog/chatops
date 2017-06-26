import {Container, interfaces} from "inversify";
import IModule from "../IModule";
import IProcessorRegistry from "../IProcessorRegistry";
import {EventResponse, Event} from "../Types";
import EventProcessorRegistry from "../events/EventProcessorRegistry";
import URLVerificationProcessor from "../events/URLVerificationProcessor";


class ChatOpsModule implements IModule<IProcessorRegistry<Event, EventResponse>> {

    modules = (container: interfaces.Container) => {

        console.log(`registering services in the IoC container`);

        // services
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<IProcessorRegistry<Event, EventResponse>>("IProcessorRegistry").to(EventProcessorRegistry).inSingletonScope();
    }

    register(registry: IProcessorRegistry<Event, EventResponse>): void {

        registry
            .add(URLVerificationProcessor)
            .for("url_verification");

        registry
            .add(URLVerificationProcessor)
            .for("event_callback:message");
    }
}

export default ChatOpsModule;