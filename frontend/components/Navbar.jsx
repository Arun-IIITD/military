import "./Navbar.css"

export default function Navbar(){

const logout=()=>{
    localStorage.clear()
    window.location="/"
}

return(

    <div className="navbar">
        <h3>Military Asset  Management</h3>
        <button onClick={logout}>Logout</button>
    </div>

)
}