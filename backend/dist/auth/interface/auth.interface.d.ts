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
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    _id: string;
}
