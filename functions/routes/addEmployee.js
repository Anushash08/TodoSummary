import { Router } from "express";
const router = Router();
import { employeesRef } from "../firebase-admin.js";


router.post("/api/updateEmployee", async (req, res) => {
    console.log("working")
    const { id, name, departmentId, departmentName, address } = req.body;
    if (!id || !name || !departmentId || !departmentName || !address) {
        return res.status(400).json("Missing required fields" );
    }
    try {
        
        const existingEmployee = await employeesRef.doc(id.toString()).get();
        if (existingEmployee.exists) {
            return res.status(400).json( "Employee ID already exists" )
        }
        await employeesRef.doc(id.toString()).set({
            name,
            departmentId,
            departmentName,
            address
        })
       return res.status(200).json("Employee added successfully")
    } catch (e) {
        console.log(e)
        return res.status(400).json("Error adding employee")
    }

})
export default router