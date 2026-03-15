import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import FilterBar from "../components/FilterBar";
import "./dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({});
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getDashboard(token).then(setData);
  }, [token]);

  // Helper function to safely compute net movement
  const netMovement =
    (data.purchases || 0) + (data.transferIn || 0) - (data.transferOut || 0);

  return (
    <div>
      {/* <FilterBar setFilters={setFilters}/> */}

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