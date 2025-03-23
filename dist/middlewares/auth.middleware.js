"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    console.log("Token: ", token);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach the user payload to the request object
        next(); // Call the next middleware or route handler
    }
    catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};
exports.authenticate = authenticate;
