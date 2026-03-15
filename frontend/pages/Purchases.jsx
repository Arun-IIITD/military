import { useEffect, useState } from "react";
import { getData, postData } from "../services/api";
import "./purchase.css"

export default function Purchases(){

const token = localStorage.getItem("token");

const [list,setList] = useState([]);
const [form,setForm] = useState({
  equipment:"",
  base:"",
  quantity:""
});

useEffect(()=>{

getData("purchase",token).then(setList);

},[]);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const submit = async()=>{
await postData("purchase",form,token);
alert("Purchase added");
const data = await getData("purchase",token);
setList(data);

// clear form
setForm({
equipment:"",
base:"",
quantity:""
});

};

return(

<div className="purchases-container">

    {/* <h2>Purchases</h2> */}
        <div className="purchase-form">


            {/* <select
          name="base"
          value={form.base}
          onChange={handleChange}
          className="role-select"
        >
          <option value="">Select base</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderaba</option>
        </select> 
        */}

        
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
            placeholder="quantity"
            value={form.quantity}
            onChange={e=>setForm({...form,quantity:e.target.value})}
            />

            <button onClick={submit}>Purchase</button>

        </div>
           


        <p>Purchases History</p>

        <table className="purchase-table" border="1">

        <thead>

        <tr>
        <th>Date</th>
        <th>Base</th>
        <th>Equipment</th>
        <th>Qty</th>
        </tr>

        </thead>

        <tbody>

        {list.map(p=>(

        <tr key={p._id}>
        <td>{new Date(p.purchaseDate).toLocaleDateString()}</td>
        <td>{p.base?.name}</td>
        <td>{p.equipment?.name}</td>
        <td>{p.quantity}</td>
        </tr>

        ))}

        </tbody>

        </table>

</div>

)
}