// routes/admin/cityRoutes1.ts

import { Router } from "express";
import { createCity } from "../../controllers/admin/AdvertiseCity";

const router = Router();

router.post("/add-multiple", createCity);

export default router;
