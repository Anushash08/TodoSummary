// var admin = require("firebase-admin");
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from "./serviceAccount.js";
let admin = initializeApp({
    credential: cert(serviceAccount)
});


const auth = getAuth(admin);
const db = getFirestore(admin);
db.settings({ ignoreUndefinedProperties: true });

const employeesRef = db.collection("employees");
const departmentRef = db.collection("departments");

export { employeesRef, departmentRef }