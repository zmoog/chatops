export interface IService {
    process<T>(...args: any[]): Promise<T>;
}