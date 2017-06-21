import {SlackCommand} from "./Types";


export default class Processor {

    private _successor: Processor

    public set successor(successor: Processor) {
        this._successor = successor;
    }

    public get successor() {
        return this._successor;
    }

    execute(command: SlackCommand): any {}
}