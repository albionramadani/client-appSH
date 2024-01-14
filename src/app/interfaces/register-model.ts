import { Gender } from "./gender"

export interface RegisterModel{
    firstName:string,
    lastName: string,
    email:string,
    birthday:Date,
    phoneNumber: string,
    address:string,
    gender: Gender,
    password:string,
    confirmPassword: string
}