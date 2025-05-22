// import express from "express";
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { https } from "firebase-functions";
// import dataFetch from "./routes/dataFetch.js";
// import addDepartment from "./routes/addDepartment.js"
// import addEmployee from "./routes/addEmployee.js"
// import deleteFunction from "./routes/deleteFunction.js"
// const app = express();
// const PORT = process.env.PORT || 8080;

// // const corsOptions = {
// //   methods: 'GET, POST, DELETE',
// //   optionsSuccessStatus: 200
// // }
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());


// app.use(dataFetch);
// app.use(addDepartment);
// app.use(addEmployee)
// app.use(deleteFunction)
// app.get("/ready", async (req, res) => {
//   res.status(200).json("Server is ready");
// });



// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// import todoRoutes from "./routes/todos.js";
import todoROtes from "./routes/todo.js";
// dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", todoROtes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
