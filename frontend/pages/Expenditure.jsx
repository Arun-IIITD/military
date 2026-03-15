import { useState, useEffect } from "react"
import { getData, postData } from "../services/api";
import "./Expenditure.css"

export default function Expenditure(){

const token = localStorage.getItem("token")

const [form,setForm] = useState({
     equipment:"",
  base:"",
  quantity:""
})
const [list,setList] = useState([])

useEffect(()=>{

  getData("expenditure",token).then(res=>{
  setList(res)
  })

},[])

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const submit = async()=>{
  await postData("expenditure",form,token)
  alert("new record added in expenditure")
  const data = await getData("purchase",token);
setList(data);

// clear form
setForm({
equipment:"",
base:"",
quantity:""
});
}

return(

<div className="expenditure-container">

    <h2 className="expenditure-title">Expenditure</h2>

    <div className="expenditure-form">

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

        <input
        placeholder="Quantity"
        onChange={e=>setForm({...form,quantity:e.target.value})}
        />

  

    <button onClick={submit}>Save</button>

    </div>

      <p>History</p>

    <table className="expenditure-table">

    <thead>
    <tr>
    <th>Date</th>
    <th>Base</th>
    <th>Equipment</th>
    <th>Qty</th>
    </tr>
    </thead>

    <tbody>

    { list.map(e =>(

    <tr key={e._id}>
    <td>{new Date(e.date).toLocaleDateString()}</td>
    <td>{e.base?.name}</td>
    <td>{e.equipment?.name}</td>
    <td>{e.quantity}</td>
    <td>{e.reason}</td>
    </tr>

    ))}

    </tbody>

    </table>

</div>

)

}