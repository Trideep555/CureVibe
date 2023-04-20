import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {useNavigate} from "react-router-dom";
import React from "react";
import {NavLink} from "react-router-dom";
function Sidebar2(){
  const close = ()=>{
    //document.getElementById("main").style.marginLeft = "0%";
    document.getElementsByClassName("mySidebar")[0].style.display = "none";
    document.getElementsByClassName("openNav")[0].style.display = "inline-block";
  }
  const open = ()=>{
    //document.getElementById("main").style.marginLeft = "0%";
    document.getElementsByClassName("mySidebar")[0].style.overflow = "hidden";
    
    document.getElementsByClassName("mySidebar")[0].style.width = "15%";
    document.getElementsByClassName("mySidebar")[0].style.display = "block";
    document.getElementsByClassName("openNav")[0].style.display = "none";
  }
  
    return (<>
    
      <div className='page'>
      <div className="w3-sidebar w3-bar-block w3-card w3-animate-left mySidebar w3-black" style={{display:"none",overflow:"none !important",zIndex:"1000"}}>
      <button className="w3-bar-item w3-button w3-large"
      onClick={close} style={{marginLeft:'75%'}}><i class="fa-solid fa-x"></i></button>
      <NavLink to="/admin/event" className="w3-bar-item w3-button w3-hover-white w3-hover-text-black"><i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;&nbsp;Events</NavLink>
      <NavLink to="/admin/user" className="w3-bar-item w3-button w3-hover-white w3-hover-text-black"><i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Users</NavLink>
      <NavLink to="/admin/doctor" className="w3-bar-item w3-button w3-hover-white w3-hover-text-black"><i class="fa-solid fa-user-doctor"></i>&nbsp;&nbsp;&nbsp;Doctors</NavLink>
      <NavLink to="/admin/analytics" className="w3-bar-item w3-button w3-hover-white w3-hover-text-black"><i class="fa-solid fa-chart-line"></i>&nbsp;&nbsp;&nbsp;Analytics</NavLink>
      <NavLink to="/admin/logout" className="w3-bar-item w3-button w3-hover-white w3-hover-text-black"><i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink>
      
    </div>
     <button  className="w3-button w3-teal w3-xlarge w3-black openNav" onClick={open}>&#9776;</button>
     </div></>);
    
}

export default Sidebar2;