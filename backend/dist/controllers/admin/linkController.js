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
exports.deleteLink = exports.updateLink = exports.createLink = exports.getAllLinks = void 0;
const Link_1 = require("../../models/Link");
// Get all links
const getAllLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const links = yield Link_1.Link.find();
        res.status(200).json(links);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch links", error });
    }
});
exports.getAllLinks = getAllLinks;
// Create a link
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title } = req.body;
        const newLink = new Link_1.Link({ link, title });
        yield newLink.save();
        res.status(201).json(newLink);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create link", error });
    }
});
exports.createLink = createLink;
// Update a link
const updateLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield Link_1.Link.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update link", error });
    }
});
exports.updateLink = updateLink;
// Delete a link
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Link_1.Link.findByIdAndDelete(id);
        res.status(200).json({ message: "Link deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete link", error });
    }
});
exports.deleteLink = deleteLink;
