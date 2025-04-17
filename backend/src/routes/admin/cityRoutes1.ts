// routes/admin/cityRoutes1.ts

import { Router } from "express";
import { addMultipleCities } from "../../controllers/admin/AdvertiseCity";

const router = Router();

router.post("/add-multiple", addMultipleCities);

export default router;
