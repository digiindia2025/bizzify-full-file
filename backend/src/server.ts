// server.ts
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env variables first

import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser"; // ✅ Add this!
import multer from "multer"; // ✅ Import multer
import { connectDB } from "./config/db";

import advertisementRoutes from "./routes/admin/advertisementRoutes";
import childCategoryRoutes from "./routes/admin/childCategoryRoutes"
import categoryRoutes from "./routes/admin/categoryRoutes";
import subcategoryRoutes from "./routes/admin/subcategoryRoutes";
import listingRoutes from "./routes/admin/listingRoutes";
import userRoutes from "./routes/admin/userRoutes";
import deactivateUserRoutes from "./routes/admin/deactivateUserRoute";
import contactRoutes from "./routes/admin/contactRoutes";
import departmentRoutes from "./routes/admin/departmentRoutes";
import supportTicketRoutes from "./routes/admin/supportTicketRoutes";
import dashboardRoutes from "./routes/admin/dashboardRoutes";
import enquiryRoutes from "./routes/admin/enquiryRoutes";
import linkRoutes from "./routes/admin/linkRoutes";
import reviewRoutes from "./routes/admin/reviewRoutes";
import membershipRoutes from "./routes/admin/membershipRoutes"; // ✅ important path
import emailRoutes from './routes/admin/emailRoutes';
import loginRoutes from './routes/admin/loginRoutes';
import forgotPasswordRoutes from './routes/admin/forgotPasswordRoutes'
import contactPersonRoutes from "./routes/admin/contactPersonRoutes";
import businessDetailsRoute from "./routes/admin/businessDetailsRoute";
import businessListingRoutes from "./routes/admin/businessListingRoute";
import businessTimingRoutes from "./routes/admin/businessTimingRoutes"; 
import businessUpgradeRoutes from './routes/admin/businessUpgradeRoutes';
import businessListingAdminRoute from "./routes/admin/businessListingAdminRoute";
import cityRoutes from "./routes/admin/cityRoutes";
import dealRoutes from "./routes/admin/dealRoutes";
import collectionRoutes from "./routes/admin/collectionRoutes";
import cityRoutes1 from "./routes/admin/cityRoutes1"; // <-- Rename this
// import businessListingCategoriesRoutes from './routes/admin/businessListingCategoriesRoutes';



// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Agar cookies ya auth use ho raha ho toh
  })
);

// Serve static image files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Optionally, if you're dealing with form data:
app.use(express.urlencoded({ extended: true }));

// ✅ Parse JSON body
app.use(bodyParser.json()); // ✅ important
// OR just use:

// Routes
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/admin/child-categories", childCategoryRoutes);
app.use("/api", categoryRoutes);
app.use("/api/admin", subcategoryRoutes);
app.use("/api/admin", listingRoutes); // 👈 important!
app.use("/api/admin", userRoutes);
app.use("/api/admin", deactivateUserRoutes);
app.use("/api/admin/contacts", contactRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/admin", supportTicketRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", membershipRoutes); // ⬅️ this enables /api/admin/memberships
app.use('/api/admin/email', emailRoutes);
app.use("/api/user", loginRoutes);
app.use('/api/users', forgotPasswordRoutes);
app.use("/api/admin", contactPersonRoutes);
app.use("/api/admin", businessDetailsRoute);
app.use("/api/admin", businessListingRoutes);
app.use("/api/business", businessTimingRoutes);
app.use(businessUpgradeRoutes);
app.use("/api/admin/business", businessListingAdminRoute);
app.use("/api/admin", cityRoutes); 
app.use("/api/admin", dealRoutes);
app.use("/api/admin", collectionRoutes);
app.use("/api/admin/cityRoutes1", cityRoutes1); // <-- Match this
// app.use('/api/admin', businessListingCategoriesRoutes);

// app.use("/api/admin", resetRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
