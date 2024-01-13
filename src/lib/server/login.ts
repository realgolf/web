import { SECRET_JWT_KEY } from "$env/static/private";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User_Model } from "./models";
import { email_regexp } from "./utils";

export async function login_user(email: string, password: string) {
  const user = await get_user(email, password);

  if ("error" in user) {
    return { error: user.error };
  }

  await User_Model.updateOne(
    { "user.email": email },
    { $set: { "user.last_login_date": new Date() } }
  );

  const token = jwt.sign({ id: user.id }, SECRET_JWT_KEY);

  return { token, user };
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  id: string;
  email: string;
  name: string;
}

async function get_user(
  email: string,
  password: string
): Promise<ErrorResponse | SuccessResponse> {
  if (!email) {
    return { error: "Email is required." };
  }

  if (!RegExp(email_regexp).exec(email)) {
    return { error: "Please enter a valid email." };
  }

  const user = await User_Model.findOne({ "user.email": email });

  if (!user) {
    return { error: "Email could not be found." };
  }

  if (!password) {
    return { error: "Password is required." };
  }

  const password_is_correct = await bcrypt.compare(
    password,
    user?.user?.password ?? ""
  );

  if (!password_is_correct) {
    return { error: "Password is not correct." };
  }

  const id = user._id.toString();
  const name = user?.user?.name ?? "";

  return { id, email, name };
}
