"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../../controllers/admin/departmentController");
const router = express_1.default.Router();
// GET all departments
router.get("/", departmentController_1.getAllDepartments);
// POST new department
router.post("/", departmentController_1.createDepartment);
// DELETE department
router.delete("/:id", departmentController_1.deleteDepartment);
// PUT update department
router.put("/:id", departmentController_1.updateDepartment);
exports.default = router;
