import { useState } from 'react'
import { Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import AddDepartment from './components/AddDepartment';
import AddEmployee from './components/AddEmployee';
function App() {
 

  return (
    <>
     <Header/>
     <Routes>
      <Route path="/" element={<Hero/>}/>
      <Route path="/addDepartment" element={<AddDepartment/>}/>
      <Route path="/addEmployee" element={<AddEmployee/>}/>
     </Routes>
     <ToastContainer closeOnClick={true} />

    </>
  )
}

export default App
