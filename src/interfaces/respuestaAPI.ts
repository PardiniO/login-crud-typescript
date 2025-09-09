export interface respuestaAPI<T> {
    success: boolean;
    data?: T;
    message: string;
}