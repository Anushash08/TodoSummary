import React, { useEffect, useState } from "react";
import "../styles/hero.css";
import data from "../db/data";
import API_URL from "../../config";
const Hero = () => {
  const [activeButton, setActiveButton] = useState("employee");
  const[employeeList,setEmployeeList]=useState([]);
  const[departmentList,setDepartmentList]=useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [idSortOrder, setIdSortOrder] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(''); 
  const [departmentSortOrder, setDepartmentSortOrder] = useState("");
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const fetchEmployeeList= async ()=>{
    try{
    const res=await fetch(`${API_URL}/api/employeeList`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json', 
      }
    });
    if(!res.ok){
      throw new Error('Failed to fetch employees');
    }
    const data=await res.json()
    setEmployeeList(data)
    setFilteredEmployeeList(data);
    }catch (error) {
      console.error(error);
    }
  }
  const fetchDepartmentList = async ()=>{
    try{
      const res=await fetch(`${API_URL}/api/departmentList`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
        }
      })
      if(!res.ok){
        throw new Error('Failed to fetch department');
      }
      const data=await res.json()
      setDepartmentList(data)
    }catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    fetchEmployeeList();
    fetchDepartmentList();
  },[])

  const handleSortChange = (e) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);

    let sortedList;
    if (selectedOrder === "Ascending") {
      sortedList = [...employeeList].sort((a, b) => a.name.localeCompare(b.name)); 
    } else {
      sortedList = [...employeeList].sort((a, b) => b.name.localeCompare(a.name)); 
    }
    setFilteredEmployeeList(sortedList); 
  };
  const handleEmployeeIdSortChange = (e) => {
    const selectedOrder = e.target.value;
    setIdSortOrder(selectedOrder);

    let sortedList;
    if (selectedOrder === "Ascending") {
      sortedList = [...employeeList].sort((a, b) => a.id - b.id); 
    } else {
      sortedList = [...employeeList].sort((a, b) => b.id - a.id); 
    }
    setFilteredEmployeeList(sortedList);  
  };
  const handleDepartmentSortChange = (e) => {
    const selectedOrder = e.target.value;
    setDepartmentSortOrder(selectedOrder);

    let sortedList;
    if (selectedOrder === "Ascending") {
      sortedList = [...filteredEmployeeList].sort((a, b) => a.departmentName.localeCompare(b.departmentName)); 
    } else {
      sortedList = [...filteredEmployeeList].sort((a, b) => b.departmentName.localeCompare(a.departmentName)); 
    }
    setFilteredEmployeeList(sortedList); 
  };
  const handleDepartmentSelection = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);

    if (selectedDept === "All") {
      setFilteredEmployeeList(employeeList); 
    } else {
      const filtered = employeeList.filter(employee => employee.departmentName === selectedDept);
      setFilteredEmployeeList(filtered); 
    }
  };
  return (
    <>
      <div className="hero-main">
        <div className="hero-container">
          <div className="hero-selection">
            <div  className={activeButton === "employee" ? "active" : ""}
                onClick={() => handleButtonClick("employee")}>
              
                Employee
             
            </div>
            <div className={activeButton === "department" ? "active" : ""}
                onClick={() => handleButtonClick("department")}>
              
                Department
           
            </div>
            
          </div>
          <div className="hero-filter">
            <div className="hero-filter-container">
              <div className="hero-filter-selection">
                <label for="choices">Department</label>
                <select id="choices" name="choices" onChange={handleDepartmentSelection}>
               
                  {departmentList.map((dept)=>(
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                    
                  ))}
                  <option value={'All'}>All</option>
                </select>
              </div>
              <div className="hero-filter-selection">
                <label for="choices">Employee</label>
                <select id="choices" name="choices"  onChange={handleSortChange}>
              
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">descending</option>
                </select>
              </div>
              <div className="hero-filter-selection">
                <label for="choices">Employee-Id</label>
                <select id="choices" name="choices" onChange={handleEmployeeIdSortChange}>
                  {/* <option>all</option> */}
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeButton === "employee" && (
        <div className="employee-table">
          <div className="employee-table-container">
            <h2>Employee List</h2>
            <div className="employee-table-contain">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody className="employee-table-body">
                  {filteredEmployeeList.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.departmentName}</td>
                      <td>{employee.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeButton == "department" && (
        <div className="employee-table">
          <div className="employee-table-container">
            <h2>department</h2>
            <div className="employee-table-contain">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody className="employee-table-body">
                  {departmentList.map((department) => (
                    <tr key={department.id}>
                      <td>{department.id}</td>
                      <td>{department.name}</td>
                      <td>{department.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
