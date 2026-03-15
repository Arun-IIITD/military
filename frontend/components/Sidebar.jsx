import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar(){



return(

        <div className="sidebar">

        <h2>Assets</h2>

        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/purchases">Purchases</NavLink>
        <NavLink to="/transfers">Transfers</NavLink>
        <NavLink to="/assignments">Assignmenttts</NavLink>
        <NavLink to="/expenditure">Expenditure</NavLink>

</div>

)
}