import IProcessor from "./IProcessor";
import {interfaces} from "inversify";


interface IProcessorRegistry<T, R> {

    add(construct: interfaces.Newable<IProcessor<T, R>>): IProcessorRegistry<T, R>;

    for(eventType: string);

    processorFor(command: T): IProcessor<T, R>;
}

export default IProcessorRegistry;