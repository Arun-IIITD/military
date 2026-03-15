//const API = "http://localhost:5000";
const API = "https://military-9y5d.onrender.com"

export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API}/auth/register`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  });
  return res.json();
};

export const getDashboard = async (token) => {
  const res = await fetch(`${API}/dashboard`,{
    headers:{Authorization:`Bearer ${token}`}
  });
  return res.json();
};

export const getData = async (endpoint,token)=>{
  const res = await fetch(`${API}/${endpoint}`,{
    headers:{Authorization:`Bearer ${token}`}
  });
  return res.json();
};

export const postData = async(endpoint,data,token)=>{
  const res = await fetch(`${API}/${endpoint}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  });
  return res.json();
};