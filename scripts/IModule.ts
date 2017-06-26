import {interfaces} from "inversify";
// import IServiceLocator from "../interfaces/IServiceLocator";
// import ITransformersRegistry from "../registry/ITransformersRegistry";

interface IModule<T> {
    modules?: (container: interfaces.Container) => void;
    register(registry: T): void;
}

export default IModule;