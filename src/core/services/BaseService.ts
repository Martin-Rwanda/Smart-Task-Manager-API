export abstract class BaseService<T> {
    abstract create(data: any): Promise<T>;
    abstract getById(id: string): Promise<T>;
    abstract getAll(): Promise<T[]>;
    abstract delete(id: string): Promise <void>;
}