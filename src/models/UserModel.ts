import mongoose, {Schema} from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model<IUser>('User', UserSchema);
export { UserModel }