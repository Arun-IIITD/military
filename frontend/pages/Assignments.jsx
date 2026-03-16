import { useState, useEffect } from "react";
import { getData, postData } from "../services/api";
import "./Assignments.css";
import logo from "../src/assets/mili.png";

export default function Assignments(){

const token = localStorage.getItem("token");

const [form,setForm] = useState({
  personnel: "",
  equipment:"",
  base:"",
  quantity:""

});
const [list,setList] = useState([]);

useEffect(()=>{
getData("assignments",token).then(setList);
},[]);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const submit = async()=>{
await postData("assignments",form,token);
alert("Task Assigned");
const data = await getData("assignments",token);
setList(data);

// clear form
setForm({
personnel: "",
equipment:"",
base:"",
quantity:""
});

};

return(

<div className="assignments-container">
  <img src = {logo} alt ="logo" />

<div className="assignment-form">

<input
placeholder="Assigned person"
onChange={e=>setForm({...form,personnel:e.target.value})}
/>

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

   <select //BASE
          name="base"
          placeholder="base"
          value={form.base}
          onChange={handleChange}
          className="role-select"
        >
          <option value="">Select base</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select> 

        <input //QUANTITY
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e=>setForm({...form,quantity:e.target.value})}
        />

<button onClick={submit}>Assign</button>

</div>
   <p> Assignment History</p>

<table className="assignment-table">

<thead>
<tr>
<th>Date</th>
<th>Assigned person</th>
<th>Base</th>
<th>Equipment</th>
<th>Qty</th>
</tr>
</thead>

<tbody>

{list.map(a=>(
<tr key={a._id}>
<td>{new Date(a.assignedDate).toLocaleDateString()}</td>
<td>{a.personnel}</td>
<td>{a.base?.name}</td>
<td>{a.equipment?.name}</td>
<td>{a.quantity}</td>
</tr>
))}

</tbody>

</table>

</div>

)
}