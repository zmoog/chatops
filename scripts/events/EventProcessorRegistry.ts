import {EventResponse, Event} from "../Types";
import IProcessorRegistry from "../IProcessorRegistry";
import IProcessor from "../IProcessor";
import {injectable, inject, interfaces} from "inversify";
import "reflect-metadata";
import * as _ from "lodash";


@injectable()
class EventProcessorRegistry implements IProcessorRegistry<Event, EventResponse> {

    private unregisteredEntries: interfaces.Newable<IProcessor<Event, EventResponse>>[] = [];

    constructor(@inject("Container") private container: interfaces.Container) {
        console.log(`Building a new EventProcessorRegistry`);
    }

    add(construct: interfaces.Newable<IProcessor<Event, EventResponse>>): IProcessorRegistry<Event, EventResponse> {
        this.unregisteredEntries.push(construct);
        return this;
    }

    for(eventType: string) {
        _.forEach(this.unregisteredEntries, (construct: interfaces.Newable<IProcessor<Event, EventResponse>>) => {

            console.log(`Registering ${eventType}`);

            this.container
                .bind<IProcessor<Event, EventResponse>>("Processor")
                .to(construct)
                .whenTargetNamed(`event:${eventType}`);
        });

        this.unregisteredEntries = [];
    }


    processorFor(command: Event): IProcessor<Event, EventResponse> {

        console.log(`Looking for a preocessor the the event ${command.type}`);

        return this.container.getNamed<IProcessor<Event, EventResponse>>("Processor", `event:${command.type}`);
    }
}


export default EventProcessorRegistry;