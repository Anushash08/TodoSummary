import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import todoRoutes from "./routes/todos.js";
import todoROtes from "./routes/todo.js";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", todoROtes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
