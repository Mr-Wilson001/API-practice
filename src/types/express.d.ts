import { Request } from "express";
import { AuthPayload } from "./user"; // Ensure this path is correct

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload;
  }
}
