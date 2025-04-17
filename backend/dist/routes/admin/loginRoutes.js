"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../../controllers/admin/loginController"); // Adjust path if necessary
const router = express_1.default.Router();
// Define the POST route for login
router.post('/login', loginController_1.loginUser); // /api/user/login will call this route
exports.default = router;
