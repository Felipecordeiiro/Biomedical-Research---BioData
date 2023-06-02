export interface Response<T>{
    id: number;
    username: string;
    message?: string;
    data: T;
}