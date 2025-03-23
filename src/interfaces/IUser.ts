import { JwtPayload } from "jsonwebtoken";

interface IUser {
    id: string,
    username: string,
    password: string
}

interface AuthPayload extends JwtPayload{
    userId: string,
    id: string,
    _id: string
}

export { IUser, AuthPayload};