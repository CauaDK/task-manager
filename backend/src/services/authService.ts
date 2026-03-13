import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByEmail, createUser } from "../repositories/authRepository.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const userExists = await findUserByEmail(email);

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(name, email, hashedPassword);

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return { token };
}
