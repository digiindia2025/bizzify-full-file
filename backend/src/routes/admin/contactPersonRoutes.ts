// routes/admin/contactPersonRoutes.ts
import express from "express";
import { createContactPerson } from "../../controllers/admin/contactPersonController";

const router = express.Router();

router.post("/contact", createContactPerson);

export default router;
