import { useState } from "react";
import "../styles/header.css";
import API_URL from "../../config";
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <header className="header">
       <Link to="/">
      <div className="logo">
       Logo
        
        </div></Link>
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <div>
          <Link to="/addDepartment">
          <button >+ Add Department</button></Link>
        </div>
        <div>
          <Link to="/addEmployee"><button>+ Add employee</button></Link>
          
        </div>
      </nav>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
