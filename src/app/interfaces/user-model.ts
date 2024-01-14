import { Gender } from "./gender"

export interface UserModel{
    id: string,
    name: string,
    email: string,
    lastName: string,
    phoneNumber :string,
    birthday : Date,
    address: string ,
    gender: Gender,
}