import React, { useState } from "react";
import "../styles/addDepartment.css";
import { toast } from "react-toastify";
import API_URL from "../../config";
const AddDepartment = () => {
  const [department, setDepartment] = useState({
    id: "",
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };
  const updateDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/api/updateDepartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
      });
      const response = await res.json()
      console.log(response)
      if (!res.ok) {
        toast.error(response);
        return;
      }
      
      toast.success("New department added");
      setDepartment({
        id: "",
        name: "",
        description: "",
      });
    } catch (error) {
      toast.error("An error occurred while adding the patient");
    }
  };
  return (
    <>
      <div className="dept-main">
        <div className="dept-container">
          <form>
            <div className="dept-label">
              <div>
                <label>Department Name</label>
              </div>
              <div>
                <label>Department Id</label>
              </div>
              <div>
                <label>Department Description</label>
              </div>
            </div>
            <div className="dept-inputs">
              <input
                type="text"
                name="name"
                value={department.name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="id"
                value={department.id}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                value={department.description}
                onChange={handleChange}
                required
              ></textarea>
              <div>
                <button type="button" onClick={updateDetails}>
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
