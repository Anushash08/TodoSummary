import React, { useEffect, useState } from "react";
import "../styles/addEmployee.css";
import API_URL from "../../config";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    departmentId: "",
    departmentName: "",
    address: "",
  });
  const [departmentList, setDepartmentList] = useState([]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const updateDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/api/updateEmployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const response = await res.json()
      if (!res.ok) {
        toast.error(response);
        return;
      }
      toast.success("New Employee added successfully");
      setEmployee({
        id: "",
        name: "",
        departmentId: "",
        departmentName: "",
        address: "",
      })
    } catch (error) {
      toast.error("An error occurred while adding the employee");
    }
  };
  const fetchDepartmentList = async () => {
    try {
      const res = await fetch(`${API_URL}/api/departmentList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch department");
      }
      const data = await res.json();
      setDepartmentList(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDepartmentIdChange = (e) => {
    const selectedId = e.target.value;
    const selectedDept = departmentList.find(
      (dept) => dept.id === Number(selectedId)
    );
  
    setEmployee((prev) => ({
      ...prev,
      departmentId: selectedId,
      departmentName: selectedDept ? selectedDept.name : "", 
    }));
  };
  
  const handleDepartmentNameChange = (e) => {
    const selectedName = e.target.value;
    const selectedDept = departmentList.find(
      (dept) => dept.name === selectedName
    );
  
    setEmployee((prev) => ({
      ...prev,
      departmentId: selectedDept ? selectedDept.id : "", 
      departmentName: selectedName,
    }));
  };
  
  useEffect(() => {
    fetchDepartmentList();
  }, []);

  return (
    <div className="emp-main">
      <div className="emp-container">
        <form> 
          <div className="emp-label">
            <div>
              <label>Employee ID</label>
            </div>
            <div>
              <label>Employee Name</label>
            </div>
            <div>
              <label>Department Name</label>
            </div>
            <div>
              <label>Department ID</label>
            </div>
            
            <div>
              <label>Address</label>
            </div>
          </div>
          <div className="emp-inputs">
            <input
              type="number"
              name="id"
              value={employee.id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
         
             <select
              name="departmentName"
              value={employee.departmentName} 
              onChange={handleDepartmentNameChange} 
              required
            >
              <option value="">Select Department Name</option>
              {departmentList.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            <select
              name="departmentId"
              value={employee.departmentId} 
              onChange={handleDepartmentIdChange} 
              required
            >
              <option value="">Select Department ID</option>
              {departmentList.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.id}
                </option>
              ))}
            </select>

           

            <textarea
              name="address"
              value={employee.address}
              onChange={handleChange}
              required
            ></textarea>
            <div>
              <button type="button" onClick={updateDetails}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
