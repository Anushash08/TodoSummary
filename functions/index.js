import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { https } from "firebase-functions";
import dataFetch from "./routes/dataFetch.js";
import addDepartment from "./routes/addDepartment.js"
import addEmployee from "./routes/addEmployee.js"
const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  methods: 'GET, POST',
  optionsSuccessStatus: 200
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(dataFetch);
app.use(addDepartment);
app.use(addEmployee)
app.get("/ready", async (req, res) => {
  res.status(200).json("Server is ready");
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
