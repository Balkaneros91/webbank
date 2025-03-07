import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);
app.use("/me/account", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
