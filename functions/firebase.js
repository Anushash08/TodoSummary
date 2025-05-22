import admin from "firebase-admin";
import fs from "fs";

// Read and parse the service account JSON manually
const serviceAccount = JSON.parse(
  fs.readFileSync("./management-5175f-firebase-adminsdk-fbsvc-8c24eee239.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export default db;
