import express from "express";
import { createContact, getAllContacts } from "../../controllers/admin/contactController";

const router = express.Router();

router.get("/", getAllContacts);       // For frontend fetch
router.post("/", createContact);       // For Postman or form submission

export default router;
