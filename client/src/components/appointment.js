import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { NavLink } from 'react-router-dom';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import React,{useState,useEffect} from 'react';

function Appointment() {
    const [showev, setshowev] = useState([]);

    const fetchData = async () => {
        return fetch("http://localhost:8000/admin/doctor",{
          method:"GET",
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        })
              .then((response) => response.json())
              .then((data) =>{
                 setshowev(data.data)
              });
      }
      useEffect(() => {
        fetchData();
      },[])
    return (
        <>

            <div className="container-fluid contenedor text-center" style={{marginTop:'20px'}}>
   <h1 className="text-center">Our Doctors</h1>
   <div className="wrapper2">
   {showev.map((user)=>(<>
        <div className="card1">
            <img alt="" src={user.file}  />
            <div className="descriptions1">
                <h1>{user.name}</h1>
                <p>
                {user.desc}    </p>
                <NavLink to= {`/appointment/${user._id}`}><button>
                <i className="fa-brands fa-meetup"></i>
                    Consult With her Now
                </button></NavLink>
            </div>
        </div>
        </> ) ) }
</div>
</div>
        </> 
    );
}
export default Appointment;