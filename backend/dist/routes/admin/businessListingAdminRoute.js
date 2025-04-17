"use strict";
// import express from "express";
// import { getAllBusinessListings } from "../../controllers/admin/businessListingAdminController";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get("/all-listings", getAllBusinessListings);
// export default router;
const express_1 = __importDefault(require("express"));
const businessListingAdminController_1 = require("../../controllers/admin/businessListingAdminController");
const router = express_1.default.Router();
router.get("/all-listings", businessListingAdminController_1.getAllBusinessListings);
// New route to fetch a single listing by ID
router.get("/listings/:id", businessListingAdminController_1.getBusinessListingById);
exports.default = router;
