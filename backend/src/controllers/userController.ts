import type { Request, Response } from "express";
import { getUsers } from "../services/userService.js";

export async function getUsersController(req: Request, res: Response) {
  const users = await getUsers();
  return res.json(users);
}
