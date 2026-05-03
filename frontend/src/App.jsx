import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Purchases from "../pages/Purchases"
import Transfers from "../pages/Transfers"
import Assignments from "../pages/Assignments"
import Expenditure from "../pages/Expenditure"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./App.css"

export default function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        
        <Navbar />

        <div className="main-layout">
          <Sidebar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/expenditure" element={<Expenditure />} />
            </Routes>
          </div>
        </div>

        <Footer />

      </div>
    </BrowserRouter>
  );
}