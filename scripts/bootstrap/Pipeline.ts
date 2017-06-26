import {Container, interfaces} from "inversify";
import {EventResponse, Event} from "../Types";
import IProcessor from "../IProcessor";
import ChatOpsModule from "./ChatOpsModule";
import IModule from "../IModule";
import IProcessorRegistry from "../IProcessorRegistry";


export class Pipeline implements IProcessor<Event, EventResponse> {

    private container: interfaces.Container = new Container();
    private registry: IProcessorRegistry<Event, EventResponse>;
    private module: IModule<IProcessorRegistry<Event, EventResponse>>;

    constructor() {
        this.module = new ChatOpsModule();
        this.load(this.module);
        this.registry = this.container.get<IProcessorRegistry<Event, EventResponse>>("IProcessorRegistry");
        this.module.register(this.registry);
    }

    private load(module: IModule<IProcessorRegistry<Event, EventResponse>>) {
        if (module.modules) {
            module.modules(this.container);
        }
    }

    execute(event: Event): EventResponse {
        return this.registry.processorFor(event).execute(event);
    }

}