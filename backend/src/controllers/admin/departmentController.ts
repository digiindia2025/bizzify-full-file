import { Request, Response } from "express";
import Department from "../../models/departmentModel";

// Get all departments
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments", error });
  }
};

// Create a new department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { department, status } = req.body;
    if (!department) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const newDept = new Department({ department, status });
    const saved = await newDept.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create department", error });
  }
};

// Delete a department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete department", error });
  }
};

// Update department status or name
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { department, status } = req.body;

    const updated = await Department.findByIdAndUpdate(
      id,
      { department, status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update department", error });
  }
};
