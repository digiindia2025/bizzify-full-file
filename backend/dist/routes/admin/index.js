"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./subcategoryRoutes"));
const router = express_1.default.Router();
router.use(categoryRoutes_1.default);
router.use(subcategoryRoutes_1.default);
exports.default = router;
