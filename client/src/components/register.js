import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {NavLink , useNavigate} from "react-router-dom";
import React,{useState} from "react";

document.body.style.overflow="hidden";
function Register() {
  const navigate= useNavigate();
  let err="";
  const [user,setuser]= useState({fname:"",lname:"",email:"",password:""});
  let name,value;
  const handleInputs=(e) =>{
    name=e.target.name;
    value=e.target.value;
    //console.log(value);
    setuser({...user,[name]:value});

  }
  const PostData = async(e) =>{
    e.preventDefault();
    const {fname ,lname,email,password}= user;
    
      fetch("http://localhost:8000/register",{
        method:"POST",
        body: JSON.stringify({fname,lname,email,password}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="User Registered Successfully")
          setTimeout(function(){ navigate("/login");},2000);
        });
    };
  
      return (
        <>
        <section className="text-center x1 text-md-start">
  
  <div className="container py-4">
    <div className="row g-0 align-items-center">
      <div className="col-md-6 mb-5 mb-md-0">
        <div className="card cascading-right" style={{
            background: 'hsla(0, 0%, 100%, 0.55)',
            backdropFilter: 'blur(30px)'}}
            >
          <div className="card-body p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Sign up now</h2>
            <form mathod="POST">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1" className="form-control" 
                    name="fname"
                    value={user.fname}
                    onChange={handleInputs}/>
                    <label className="form-label" htmlFor="form3Example1">First name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text"  id="form3Example2" className="form-control"
                    name="lname"
                    value={user.lname}
                    onChange={handleInputs} />
                    <label className="form-label" htmlFor="form3Example2">Last name</label>
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" 
                name="email"
                value={user.email}
                onChange={handleInputs}/>
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control"
                name="password"
                value={user.password}
                onChange={handleInputs}/>
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              
              <button type="submit" className="btn btn-link btn-block mb-4" onClick={PostData} style={{textDecoration:'none'}}>
                Sign up
              </button><br/>
              <span className='xyz'></span>

              <div className="text-center">
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                
              </div>
              <span>Already Have a Account?<NavLink to="/login" style={{textDecoration:'none'}}>Login</NavLink></span>
              
    
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0">
        <img src="https://images.pexels.com/photos/6897766/pexels-photo-6897766.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-100 rounded-4 shadow-4"
          alt="" />
      </div>
    </div>
  </div>
</section>
        </>
    );
}

export default Register;