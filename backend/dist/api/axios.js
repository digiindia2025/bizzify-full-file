"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: "http://localhost:5000/api", // Replace with your actual backend URL
    headers: {
        "Content-Type": "application/json",
    },
});
exports.default = instance;
