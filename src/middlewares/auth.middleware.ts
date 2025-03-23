import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/user";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }
  console.log("Token: ", token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = payload; // Attach the user payload to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};