import { Schema, model } from "mongoose";

interface DevUser {
  name: String;
  createdAt: Date;
}

const userSchema = new Schema<DevUser>({
  name: String,
  createdAt: { type: Date, immutable: true },
});

const User = model<DevUser>("User", userSchema);

export { User };
export type { DevUser };