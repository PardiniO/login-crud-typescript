export interface IrespuestaAPI<T> {
    success: boolean;
    data?: T;
    message: string;
}
