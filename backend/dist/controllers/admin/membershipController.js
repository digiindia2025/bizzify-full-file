"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMembership = exports.updateMembership = exports.createMembership = exports.getAllMemberships = void 0;
const membershipModel_1 = require("../../models/membershipModel");
// Get all memberships
const getAllMemberships = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberships = yield membershipModel_1.Membership.find().sort({ _id: -1 });
        res.status(200).json(memberships);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch memberships" });
    }
});
exports.getAllMemberships = getAllMemberships;
// Create a membership (for testing via Postman)
const createMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const membership = new membershipModel_1.Membership(req.body);
        yield membership.save();
        res.status(201).json(membership);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create membership" });
    }
});
exports.createMembership = createMembership;
// Update membership status/payment status
const updateMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield membershipModel_1.Membership.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update membership" });
    }
});
exports.updateMembership = updateMembership;
// Delete a membership
// Delete membership
const deleteMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMembership = yield membershipModel_1.Membership.findByIdAndDelete(req.params.id);
        if (!deletedMembership) {
            return res.status(404).json({ error: "Membership not found" });
        }
        res.status(200).json({ message: "Membership deleted successfully", id: req.params.id });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete membership" });
    }
});
exports.deleteMembership = deleteMembership;
