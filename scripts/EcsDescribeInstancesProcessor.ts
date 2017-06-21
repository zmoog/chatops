import {SlackCommand} from "./Types";
import Processor from "./Processor";


export default class EcsDescribeInstancesProcessor extends Processor {

    execute(command: SlackCommand): any {
        return {};
    }
}
