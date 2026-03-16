import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../src/assets/army.png";
export default function Sidebar(){



return(

        <div className="sidebar">
        <img src = {logo} alt ="logo" />
        

        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/purchases">Purchases</NavLink>
        <NavLink to="/transfers">Transfers</NavLink>
        <NavLink to="/assignments">Assignmenttts</NavLink>
        <NavLink to="/expenditure">Expenditure</NavLink>

</div>

)
}