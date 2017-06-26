interface IProcessor<T, R> {
    execute<T>(command: T): R;
}

export default IProcessor;