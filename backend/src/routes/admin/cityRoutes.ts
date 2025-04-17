import express from "express";
import { createCity, getAllCities } from "../../controllers/admin/cityController";

const router = express.Router();

router.post("/cities", createCity);
router.get("/cities", getAllCities);

export default router;
