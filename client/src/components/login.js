import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {NavLink , useNavigate} from "react-router-dom";
import React,{useState} from "react";

document.body.style.overflow="hidden";
function Login() {
  const navigate= useNavigate();
  let err="";
  const [user,setuser]= useState({email:"",password:""});
  let name,value;
  const handleInputs=(e) =>{
    name=e.target.name;
    value=e.target.value;
    //console.log(value);
    setuser({...user,[name]:value});

  }
  const PostData = async(e) =>{
    e.preventDefault();
    const {email,password}= user;
    
      fetch("http://localhost:8000/login",{
        method:"POST",
        body: JSON.stringify({email,password}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="User Logged In Successfully" || err==="Doctor Logged In Successfully"){
            let name1=json.name.split(" ");
            if(name1[0]=="Dr" || name1[0]=="Doctor" || name1[0]=="Dr." )
            name1[0]=json.name;
            localStorage.setItem("name",name1[0]);
            localStorage.setItem("type",json.type);
            setTimeout(function(){ navigate("/");},2000);
          }
        });
    };

    return (
        <>
        <section className="text-center text-md-start animate__animated animate__fadeInUp" style={{marginTop: '15px'}}>
  
  <div className="container x1 py-4">
    <div className="row g-0 align-items-center">
      <div className="col-md-6 mb-5 mb-md-0">
        <div className="card cascading-right" style={{
            background: 'hsla(0, 0%, 100%, 0.55)',
            backdropFilter: 'blur(30px)'}}
            >
          <div className="card-body p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Login</h2>
            <form method='POST'>
              

              <div className="form-outline mb-4">
                <input type="text" id="form3Example3" className="form-control" name="email" value={user.email} onChange={handleInputs} />
                <label className="form-label" for="form3Example3">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" name="password" value={user.password} onChange={handleInputs} />
                <label className="form-label" for="form3Example4">Password</label>
              </div>

              
              <button type="submit" className="btn btn-link btn-block mb-4" onClick={PostData} style={{textDecoration:'none'}}>
                Login 
              </button><br/>
              <span className='xyz'></span>
              <div className="text-center">
                <p>or Login  with:</p>
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
                <span>New to CureVibe?<NavLink to="/register" style={{textDecoration:'none'}}>Register Now</NavLink></span>
              
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

export default Login;