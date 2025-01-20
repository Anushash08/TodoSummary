import { Router } from "express";
const router = Router()
import { departmentRef } from "../firebase-admin.js";

router.post("/api/updateDepartment", async (req, res) => {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const existingDept = await departmentRef.doc(id.toString()).get();
        if (existingDept.exists) {
            return res.status(400).json( "Department ID already exists")
        }
      try{
        await departmentRef.doc(id.toString()).set({
            name,
            description
        })
        
        return res.status(200).json("Department added successfully")
      }catch(e){
        console.log("error")
      }


    } catch (e) {
        console.log(e);
        return res.status(400).json("Error adding department");
    }
})
export default router