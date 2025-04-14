import express from "express";
import {
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
} from "../../controllers/admin/linkController";

const router = express.Router();

// Get all links - GET /api/links/all
router.get("/all", getAllLinks);

// Create new link - POST /api/links/create
router.post("/create", createLink);

// Update a link - PUT /api/links/update/:id
router.put("/update/:id", updateLink);

// Delete a link - DELETE /api/links/delete/:id
router.delete("/delete/:id", deleteLink);

export default router;
