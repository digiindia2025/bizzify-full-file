import express from "express";
import {
  getAllMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
} from "../../controllers/admin/membershipController";

const router = express.Router();

router.get("/memberships", getAllMemberships);
router.post("/memberships", createMembership); // For testing with Postman
router.put("/memberships/:id", updateMembership);
router.delete("/memberships/:id", deleteMembership);

export default router;
