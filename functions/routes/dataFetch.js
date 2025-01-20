import { Router } from "express";
const router = Router();
import { employeesRef, departmentRef } from "../firebase-admin.js";

router.get("/api/employeeList", async (req, res) => {
    try {
        const data = await employeesRef.get();
        if (data.empty) {
            return res.status(404).json({ message: "No employees found" })
        }
        const employees = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        res.status(200).json(employees)
    } catch (error) {
        console.error("Error fetching employee data:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
router.get("/api/departmentList", async (req, res) => {
    try {
        const data = await departmentRef.get()
        if (data.empty) {
            return res.status(404).json({ message: "No department found" })
        }
        const departments = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()

        }))
        res.status(200).json(departments)
    } catch (error) {
        console.error("Error fetching department data:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})
export default router;
