import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {useNavigate} from "react-router-dom";
import React,{useState} from "react";

function AdminLog()
{
  const navigate= useNavigate();
  let err="";
  const [user,setuser]= useState({id:"",password:""});
  let name,value;
  const handleInputs=(e) =>{
    name=e.target.name;
    value=e.target.value;
    //console.log(value);
    setuser({...user,[name]:value});

  }
  const PostData = async(e) =>{
    e.preventDefault();
    const {id,password}= user;
    
      fetch("http://localhost:8000/admin/login",{
        method:"POST",
        body: JSON.stringify({id,password}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="Admin Logged In Successfully"){
            name=json.name.split(" ");
            localStorage.setItem("admin",name[0]);
            setTimeout(function(){ navigate("/admin/welcome");},2000);
          }
        });
    };

  
    return(<>
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form method="POST">
          <h3 style={{color:'blue',marginTop:'-80px'}} align="center">Admin Login</h3>

          <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter your Id" name="id" value={user.id} onChange={handleInputs} />
            <label className="form-label" htmlFor="form3Example3">Admin Id</label>
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" name="password" value={user.password} onChange={handleInputs} />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}} onClick={PostData}>Login</button>
              </div>
          
            <span className='xyz'></span>
        </form>
      </div>
    </div>
  </div>
</section>
    </>)
}
export default AdminLog;