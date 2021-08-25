export interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface ILoginUser {
    email: string;
    password: string;
}
export interface ISuccess {
    type: TypeResponse;
    code: number;
    text: string;
}
export interface IError {
    type: TypeResponse;
    code: number;
    text: string;
}
declare type TypeResponse = 'Error' | 'Success';
export {};
