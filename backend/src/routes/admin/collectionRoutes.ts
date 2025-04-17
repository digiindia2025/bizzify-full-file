import express from "express";
import { createCollection, getAllCollections } from "../../controllers/admin/collectionController"; 

const router = express.Router();

router.post("/create", createCollection);
router.get("/", getAllCollections);

export default router;
