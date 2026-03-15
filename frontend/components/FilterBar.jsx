export default function FilterBar({setFilters}){

return(
<div className="filters">

<input type="date" onChange={e=>setFilters(f=>({...f,date:e.target.value}))}/>

<select onChange={e=>setFilters(f=>({...f,base:e.target.value}))}>
<option>All Bases</option>
<option>Delhi</option>
<option>Mumbai</option>
</select>

<select onChange={e=>setFilters(f=>({...f,equipment:e.target.value}))}>
<option>All Equipment</option>
<option>Rifle</option>
<option>Vehicle</option>
<option>Ammunition</option>
</select>

</div>
)
}