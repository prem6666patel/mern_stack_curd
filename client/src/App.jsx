import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Servies from "./pages/Servies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Logout from "./pages/logout";
import Adminlayout from "./components/layouts/Admin-layout";
import AdminUser from "./pages/AdminUser";
import AdminContact from "./pages/AdminContact";
import EditUser from "./pages/EditUser";
import AdminServices from "./pages/AdminServices";
import EditService from "./pages/EditService";
import AddService from "./pages/AddService";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/about" element={<About></About>} />
          <Route path="/contact" element={<Contact></Contact>} />
          <Route path="/servies" element={<Servies></Servies>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/logout" element={<Logout></Logout>} />
          <Route path="*" element={<Error></Error>} />
          <Route path="/admin" element={<Adminlayout></Adminlayout>}>
            <Route path="users" element={<AdminUser></AdminUser>} />
            <Route path="contact" element={<AdminContact></AdminContact>} />
            <Route path="users/:id/edit" element={<EditUser />} />
            <Route path="services" element={<AdminServices></AdminServices>} />
            <Route path="Addservices" element={<AddService></AddService>} />
            <Route
              path="services/:id/edit"
              element={<EditService></EditService>}
            />
          </Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
};

export default App;
