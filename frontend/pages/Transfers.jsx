import { useState, useEffect } from "react";
import { getData, postData } from "../services/api";
import "./Transfers.css";
import logo from "../src/assets/mili.png";

export default function Transfers(){

const token = localStorage.getItem("token");
const bases = ["Delhi", "Mumbai", "Bangalore", "Hyderabad"];
const [list,setList] = useState([]);
const [form,setForm] = useState({
    fromBase: "",
    toBase: "",
    equipment:"",
    quantity:""
});

useEffect(()=>{
getData("transfers",token).then(setList);
},[]);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const submit = async()=>{
await postData("transfers",form,token);
alert("Transfer done");
const data = await getData("transfers",token);
setList(data);

// clear form
setForm({
    fromBase: "",
    toBase: "",
    equipment:"",
    quantity:"",
});

};

return(

<div className="transfers-container">
  <img src = {logo} alt ="logo" />

<div className="transfer-form">

        <select
            name="fromBase"
            value={form.fromBase}
            onChange={handleChange}
            className="role-select"
          >
            <option value="">from base</option>

            {bases.map((base) => (
              <option
                key={base}
                value={base}
                disabled={form.toBase === base}  
              >
                {base}
              </option>
            ))}
        </select>

        <select
          name="toBase"
          value={form.toBase}
          onChange={handleChange}
          className="role-select"
        >
          <option value="">to base</option>

          {bases.map((base) => (
            <option
              key={base}
              value={base}
              disabled={form.fromBase === base}   
            >
              {base}
            </option>
          ))}
        </select>



      


          <select //EQUIPMENT
          name="equipment"
          placeholder="equipment"
          value={form.equipment}
          onChange={handleChange}
          className="equipment"
        >
          <option value="">Select equipment</option>
          <option value="Assault_Rifle">Assault_Rifle</option>
          <option value="Pistol">Pistol</option>
          <option value="Shootgun">Shootgun</option>
          <option value="Machinegun">Machinegun</option>
          <option value="Grenade">Grenade</option>
            <option value="Rocket_Launcher">Rocket_Launcher</option>

        </select> 

       <input
        type="number"
        name="quantity"
        value={form.quantity}
        placeholder="Quantity"
        onChange={handleChange}
        />

<button onClick={submit}>Transfer</button>

</div>

  <p> Transfer History</p>

<table className="transfer-table">

    <thead>
    <tr>
    <th>Date</th>
    <th>From Base</th>
    <th>To Base</th>
    <th>Equipment</th>
    <th>Qty</th>
    </tr>
    </thead>

    <tbody>

    {list.map(t =>(

    <tr key={t._id}>
    <td>{new Date(t.transferDate).toLocaleDateString()}</td>
    <td>{t.fromBase?.name}</td>
    <td>{t.toBase?.name}</td>
    <td>{t.equipment?.name}</td>
    <td>{t.quantity}</td>
    </tr>

    ))}

    </tbody>

</table>

</div>

)
}