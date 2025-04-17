"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const google_auth_library_1 = require("google-auth-library"); // Google OAuth2 client for token verification
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Google OAuth2 client initialization
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Standard login function
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, tokenId } = req.body;
    // If tokenId is provided, proceed with Google login
    if (tokenId) {
        try {
            const ticket = yield client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return res.status(400).json({ message: 'Invalid Google token' });
            }
            // Find or create the user based on the payload data (email, name, picture, etc.)
            const user = {
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
            };
            // For simplicity, you could replace this with a real database check/insert
            // Example: const userInDb = await UserModel.findOne({ email: payload.email });
            // Generate JWT token for the user (you can customize this further)
            const jwtToken = jsonwebtoken_1.default.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Send response with the token
            return res.status(200).json({ message: 'Google login successful', user, token: jwtToken });
        }
        catch (error) {
            console.error('Error verifying Google token:', error);
            return res.status(400).json({ message: 'Google login failed' });
        }
    }
    // If tokenId is not provided, proceed with standard email/password login
    // (Replace this with actual user authentication logic)
    if (email === 'test@example.com' && password === 'password123') {
        // Generate JWT token for standard login (you can customize this further)
        const jwtToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token: jwtToken });
    }
    // Invalid credentials for email/password login
    return res.status(400).json({ message: 'Invalid credentials' });
});
exports.loginUser = loginUser;
