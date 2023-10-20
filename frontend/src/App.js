import React from "react";
import "./App.css";
import Adminhome from "./components/Adminhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import UserLogin from "./components/UserLogin";
import UserHome from "./components/UserHome";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin props={{name: 'User Login'}} />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path='signup' element={<CreateUser props={{name : 'Signup'}} />} />
          <Route path="users/:id" element={<EditUser />} />

          <Route path="adminlogin/" >
            <Route index element={<AdminLogin />}/>
            <Route path="users/" element={<Adminhome />}/>
            <Route path="users/createUser" element={<CreateUser props={{name : 'createuser'}} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
