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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeBusiness = void 0;
const businessUpgradeModel_1 = __importDefault(require("../../models/businessUpgradeModel"));
const upgradeBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { direction, website, facebook, instagram, linkedin, twitter } = req.body;
        // Create a new business upgrade document
        const newBusinessUpgrade = new businessUpgradeModel_1.default({
            direction,
            website,
            facebook,
            instagram,
            linkedin,
            twitter,
        });
        // Save the document to MongoDB
        yield newBusinessUpgrade.save();
        return res.status(201).json({
            message: 'Business upgrade saved successfully!',
            data: newBusinessUpgrade,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error saving business upgrade' });
    }
});
exports.upgradeBusiness = upgradeBusiness;
