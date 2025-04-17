"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ Load env variables first
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser")); // ✅ Add this!
const db_1 = require("./config/db");
const advertisementRoutes_1 = __importDefault(require("./routes/admin/advertisementRoutes"));
const childCategoryRoutes_1 = __importDefault(require("./routes/admin/childCategoryRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/admin/categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./routes/admin/subcategoryRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/admin/listingRoutes"));
const userRoutes_1 = __importDefault(require("./routes/admin/userRoutes"));
const deactivateUserRoute_1 = __importDefault(require("./routes/admin/deactivateUserRoute"));
const contactRoutes_1 = __importDefault(require("./routes/admin/contactRoutes"));
const departmentRoutes_1 = __importDefault(require("./routes/admin/departmentRoutes"));
const supportTicketRoutes_1 = __importDefault(require("./routes/admin/supportTicketRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/admin/dashboardRoutes"));
const enquiryRoutes_1 = __importDefault(require("./routes/admin/enquiryRoutes"));
const linkRoutes_1 = __importDefault(require("./routes/admin/linkRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/admin/reviewRoutes"));
const membershipRoutes_1 = __importDefault(require("./routes/admin/membershipRoutes")); // ✅ important path
const emailRoutes_1 = __importDefault(require("./routes/admin/emailRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/admin/loginRoutes"));
const forgotPasswordRoutes_1 = __importDefault(require("./routes/admin/forgotPasswordRoutes"));
const contactPersonRoutes_1 = __importDefault(require("./routes/admin/contactPersonRoutes"));
const businessDetailsRoute_1 = __importDefault(require("./routes/admin/businessDetailsRoute"));
const businessListingRoute_1 = __importDefault(require("./routes/admin/businessListingRoute"));
const businessTimingRoutes_1 = __importDefault(require("./routes/admin/businessTimingRoutes"));
const businessUpgradeRoutes_1 = __importDefault(require("./routes/admin/businessUpgradeRoutes"));
const businessListingAdminRoute_1 = __importDefault(require("./routes/admin/businessListingAdminRoute"));
// dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect MongoDB
(0, db_1.connectDB)();
// Middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Agar cookies ya auth use ho raha ho toh
}));
// Serve static image files
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// ✅ Parse JSON body
app.use(body_parser_1.default.json()); // ✅ important
// OR just use:
// Routes
app.use("/api/advertisements", advertisementRoutes_1.default);
app.use("/api/admin/child-categories", childCategoryRoutes_1.default);
app.use("/api", categoryRoutes_1.default);
app.use("/api/admin/subcategories", subcategoryRoutes_1.default);
app.use("/api/admin", listingRoutes_1.default); // 👈 important!
app.use("/api/admin", userRoutes_1.default);
app.use("/api/admin", deactivateUserRoute_1.default);
app.use("/api/admin/contacts", contactRoutes_1.default);
app.use("/api/departments", departmentRoutes_1.default);
app.use("/api/admin", supportTicketRoutes_1.default);
app.use("/api/admin/dashboard", dashboardRoutes_1.default);
app.use("/api/enquiries", enquiryRoutes_1.default);
app.use("/api/links", linkRoutes_1.default);
app.use("/api/reviews", reviewRoutes_1.default);
app.use("/api/admin", membershipRoutes_1.default); // ⬅️ this enables /api/admin/memberships
app.use('/api/admin/email', emailRoutes_1.default);
app.use("/api/user", loginRoutes_1.default);
app.use('/api/users', forgotPasswordRoutes_1.default);
app.use("/api/admin", contactPersonRoutes_1.default);
app.use("/api/admin", businessDetailsRoute_1.default);
app.use("/api/admin", businessListingRoute_1.default);
app.use("/api/business", businessTimingRoutes_1.default);
app.use(businessUpgradeRoutes_1.default);
app.use("/api/admin/business", businessListingAdminRoute_1.default);
// app.use("/api/admin", resetRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
