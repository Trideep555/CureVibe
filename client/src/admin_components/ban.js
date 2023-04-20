import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Ban(){
    const {id}=useParams();
    
  const Me = async() =>{
    //console.log(id);
    fetch("http://localhost:8000/admin/ban",{
      method:"POST",
      body: JSON.stringify({id}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
      .then((response) => response.json())
      .then((json) => {
         window.location.pathname="/admin/user";;
      });
  };
  useEffect(() => {
    Me();
  },[])
  
  
}
export default Ban;