import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import "./dashboard.css";
import logo from "../src/assets/mili.png";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  //const base = localStorage.getItem("base")

  useEffect(() => {
    getDashboard(token).then(setData);
  }, [token]);

  const netMovement =
    (data.purchases || 0) + (data.transferIn || 0) - (data.transferOut || 0);

  return (
    <div className="dashboard-container">

      <img src = {logo} alt ="logo" />
      <h2>Welcome {name}</h2>
      <p>Role: {role}</p>
      {/* <p>{base}</p> */}


      <div className="dashboard-grid">
        <div className="card">
          <h3>Opening Balance</h3>
          <p>{data?.openingBalance || 0}</p>
        </div>

        <div className="card net-movement" onClick={() => setPopup(true)}>
          <h3>Net Movement(Click for more details)</h3>
          <p>{netMovement}</p>
        </div>

        <div className="card">
          <h3>Closing Balance</h3>
          <p>{data?.closingBalance || 0}</p>
        </div>

        <div className="card">
          <h3>Assigned</h3>
          <p>{data?.assigned || 0}</p>
        </div>

        <div className="card">
          <h3>Expended</h3>
          <p>{data?.expended || 0}</p>
        </div>
      </div>

      {popup && (
        <div className="overlay">
          <div className="popup">
            <h3>Net Movement Details</h3>
            <p>Purchases: {data?.purchases || 0}</p>
            <p>Transfer In: {data?.transferIn || 0}</p>
            <p>Transfer Out: {data?.transferOut || 0}</p>
            <button onClick={() => setPopup(false)}>Close</button>
          </div>
        </div>
      )}


    </div>
  );
}