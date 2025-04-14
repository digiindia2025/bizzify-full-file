import express from "express";
import categoryRoutes from "./categoryRoutes";
import subcategoryRoutes from "./subcategoryRoutes";

const router = express.Router();

router.use(categoryRoutes);
router.use(subcategoryRoutes);

export default router;
