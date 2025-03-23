import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Register route
router.post("/register", async (req, res) => {
    try {
        await register(req, res);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const token = await login(req, res);
        res.status(200).json({ token });
    }
    catch (error) { 
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;