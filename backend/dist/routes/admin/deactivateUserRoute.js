"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deactivateUserController_1 = require("../../controllers/admin/deactivateUserController");
const router = express_1.default.Router();
// Get all deactivated users
router.get("/users/deactivated", deactivateUserController_1.getDeactivatedUsers);
// Create a new user
router.post("/users", deactivateUserController_1.createUser);
// Delete user by ID
router.delete("/users/:id", deactivateUserController_1.deleteUser);
exports.default = router;
