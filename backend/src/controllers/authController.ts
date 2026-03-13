import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    return res.json(data);
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message });
  }
}
