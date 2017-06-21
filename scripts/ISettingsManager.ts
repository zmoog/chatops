export interface ISettingsManager {
    set(key: string, value: any): Promise<boolean>;
    get<T>(key: string): Promise<T>;
}