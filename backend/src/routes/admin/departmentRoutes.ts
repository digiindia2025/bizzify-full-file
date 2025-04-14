import express from "express";
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../../controllers/admin/departmentController";

const router = express.Router();

// GET all departments
router.get("/", getAllDepartments);

// POST new department
router.post("/", createDepartment);

// DELETE department
router.delete("/:id", deleteDepartment);

// PUT update department
router.put("/:id", updateDepartment);

export default router;
