import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/img/mental-health.png';
import '../App.css';
import {NavLink} from "react-router-dom";
function Navbar() {
  function check(){  
  let x;
      x=localStorage.getItem("name");
      let y=localStorage.getItem("type");
      if(y==='doctor')
      x="Doctor";
    if(x==null)
    return (<>
    <li><NavLink className="getstarted scrollto" to="/login" style={{textDecoration:'none'}}>Login</NavLink></li></>);
    else{
      return (<>
      <li><NavLink className="nav-link scrollto" to="/dashboard" style={{textDecoration:'none'}}><i class="fa-solid fa-user"></i>Welcome {x}</NavLink></li>
      <li><NavLink className="getstarted scrollto" to="/logout" style={{textDecoration:'none'}} >Logout</NavLink></li>
      </>);
    }
  };
    return (
     <>
     <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center justify-content-between">

      <h1 className="logo"><NavLink  to="/" style={{textDecoration:'none'}}><img src={logo} alt="" className="img-fluid" />&nbsp; CureVibe</NavLink></h1>

      <nav id="navbar" className="navbar">
        <ul>
          <li><NavLink className="nav-link scrollto" id="index"  to="/" ><i className="fa-solid fa-house"></i>&nbsp;Home</NavLink></li>
          <li><NavLink className="nav-link scrollto" id="about" to="/about"><i className="fa-solid fa-people-group"></i>&nbsp;About</NavLink></li>
          <li><NavLink className="nav-link scrollto" id="events" to={localStorage.getItem("name") ?"/event" : "/login"}><i className="fa-regular fa-calendar-days"></i>&nbsp;Events</NavLink></li>
          <li><NavLink className="nav-link scrollto" id="appointment" to={localStorage.getItem("name") ?"/appointment" : "/login"}><i className="fa-solid fa-user-doctor"></i>&nbsp;Appointment</NavLink></li>
          <li><NavLink className="nav-link scrollto" id="contact" to="/contact"><i className="fa-regular fa-id-badge"></i>&nbsp;Contact Us</NavLink></li>
          {check()}
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
     </>
    );
  }
  
  export default Navbar;

