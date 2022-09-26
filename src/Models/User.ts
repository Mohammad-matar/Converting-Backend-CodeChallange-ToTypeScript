import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  address: string;
  phoneNumber: Number;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;
