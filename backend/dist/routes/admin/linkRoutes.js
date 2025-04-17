"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linkController_1 = require("../../controllers/admin/linkController");
const router = express_1.default.Router();
// Get all links - GET /api/links/all
router.get("/all", linkController_1.getAllLinks);
// Create new link - POST /api/links/create
router.post("/create", linkController_1.createLink);
// Update a link - PUT /api/links/update/:id
router.put("/update/:id", linkController_1.updateLink);
// Delete a link - DELETE /api/links/delete/:id
router.delete("/delete/:id", linkController_1.deleteLink);
exports.default = router;
