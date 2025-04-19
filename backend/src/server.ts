import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connectDB } from "./config/db";
import advertisementRoutes from "./routes/admin/advertisementRoutes";
import childCategoryRoutes from "./routes/admin/childCategoryRoutes"
import categoryRoutes from "./routes/admin/categoryRoutes";
import subcategoryRoutes from "./routes/admin/subcategoryRoutes";
import userRoutes from "./routes/admin/userRoutes";
import deactivateUserRoutes from "./routes/admin/deactivateUserRoute";
import departmentRoutes from "./routes/admin/departmentRoutes";
import supportTicketRoutes from "./routes/admin/supportTicketRoutes";
import enquiryRoutes from "./routes/admin/enquiryRoutes";
import linkRoutes from "./routes/admin/linkRoutes";
import reviewRoutes from "./routes/admin/reviewRoutes";
import membershipRoutes from "./routes/admin/membershipRoutes"; // ✅ important path
import emailRoutes from './routes/admin/emailRoutes';
import loginRoutes from './routes/admin/loginRoutes';
import forgotPasswordRoutes from './routes/admin/forgotPasswordRoutes'
// import businessListingRoutes from "./routes/admin/businessListingRoutes";
import cityRoutes from "./routes/admin/cityRoutes";
import dealRoutes from "./routes/admin/dealRoutes";
import collectionRoutes from "./routes/admin/collectionRoutes";
import cityRoutes1 from "./routes/admin/cityRoutes1"; // <-- Rename this

// hm yaha per all listiing ka daat import kr rhe hai
import businessListingRoutes from "./routes/admin/businessListingRoutes";





const app = express();

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
connectDB();
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api/advertisements", advertisementRoutes);
app.use("/api/admin/child-categories", childCategoryRoutes);
app.use("/api", categoryRoutes);
app.use("/api/admin", subcategoryRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/admin", deactivateUserRoutes);
// app.use("/api/admin/contacts", contactRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/admin", supportTicketRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", membershipRoutes); 
app.use('/api/admin/email', emailRoutes);
app.use("/api/user", loginRoutes);
app.use('/api/users', forgotPasswordRoutes);
app.use("/api", businessListingRoutes);
app.use("/api/admin", cityRoutes); 
app.use("/api/admin", dealRoutes);
app.use("/api/admin", collectionRoutes);
app.use("/api/admin/cityRoutes1", cityRoutes1); 

// 
app.use("/api/admin", businessListingRoutes); // this makes /api/admin/business and /api/admin/contact work






app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
