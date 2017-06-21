import {ISettingsManager} from "./ISettingsManager";
import {Dictionary} from "lodash";

export class SettingsManager implements ISettingsManager {
    private settings: Dictionary<any>;

    constructor() {
        this.settings = {};
    }

    set(key: string, value: any): Promise<boolean> {
        if (this.settings[key])
            return Promise.reject("A settings is already definied for this key");

        this.settings[key] = value;
        return Promise.resolve(true);
    }

    get<T>(key: string): Promise<T> {
        return Promise.resolve<T>(this.settings[key]);
    }
}