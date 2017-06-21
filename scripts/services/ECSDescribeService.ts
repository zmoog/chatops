import {IService} from "./IService";
import {EC2} from "aws-sdk";

export class ECSDescribeService implements IService {
    private ec2: EC2;

    constructor() {
        this.ec2 = new EC2();
    }

    process<T>(...args: any[]): Promise<T> {
        return null;
    }
}