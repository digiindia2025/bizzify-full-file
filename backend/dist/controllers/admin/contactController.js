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
exports.createContact = exports.getAllContacts = void 0;
const Contact_1 = require("../../models/Contact");
// Get all contacts
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts", error });
    }
});
exports.getAllContacts = getAllContacts;
// Create contact (for Postman or frontend form)
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = new Contact_1.Contact(req.body);
        const savedContact = yield newContact.save();
        res.status(201).json(savedContact);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create contact", error });
    }
});
exports.createContact = createContact;
