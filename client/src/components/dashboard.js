import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link,NavLink } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState({name:"",email:""});
    let name=localStorage.getItem("name");
    const [meeting, setmeet] = useState([]);
    
  const fetchData = async () => {
    return fetch("http://localhost:8000/currentuser",{
      method:"POST",
      body: JSON.stringify({name}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
            setUser({name:data.data.name,email:data.data.email});
             
             });
  }
  const fetchBook = async () => {
    return fetch("http://localhost:8000/currentbook",{
      method:"POST",
      body: JSON.stringify({name}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
             setmeet(data.data);
          });
  }
  
  let name2,value;
  const handleInputs=(e) =>{
    name2=e.target.name;
    value=e.target.value;
    //console.log(value);
    setUser({...user,[name2]:value});

  }
  //alert(localStorage.getItem('name'));
  const day=(new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear();
  let min=new Date().getMinutes();
  if(min<"10")
  min="0"+min;
  const time=new Date().getHours()+":"+min;
  console.log(day+" "+time);
  //alert(new Date().getMonth());
  useEffect(() => {
    fetchData();
    fetchBook();
  },[])
  console.log(meeting);

    return (
        <>
         <div className="container" data-aos="fade-up">
         <div className="section-title" style={{marginTop:'130px'}}>
  
         <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active"  id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Profile</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Bookings</button>
  </li>
  
</ul>

</div>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
  <form className="mb-5" method="post" id="contactForm" name="contactForm">
<div className="row">
<div className="col-md-6 form-group mb-3">
<label for="" className="col-form-label">Name </label>
<span onClick={()=> { document.getElementById('namechange').classList.remove("fa-toggle-off"); document.getElementById('namechange').classList.add("fa-toggle-on");
document.getElementById("name").disabled=false;}}><i className='fa-solid fa-toggle-off'  id="namechange"   style={{marginLeft: '20%', fontSize: '20px',color: '#ED502E',cursor:"pointer"}}></i></span>
<input type="text" className="form-control" value={user.name} onChange={handleInputs} name="name" id="name" placeholder="Your name" disabled  />

</div>
<div className="col-md-6 form-group mb-3">
<label for="" className="col-form-label">Email </label>
<span onClick={()=> { document.getElementById('emailchange').classList.remove("fa-toggle-off"); document.getElementById('emailchange').classList.add("fa-toggle-on");
document.getElementById("email").disabled=false;}}><i className='fa-solid fa-toggle-off' id="emailchange"    style={{marginLeft: '20%', fontSize: '20px',color: '#ED502E',cursor:"pointer"}}></i></span>
<input type="text" className="form-control" value={user.email} onChange={handleInputs} name="email" id="email" placeholder="Your email" disabled />

</div>
</div>

<div className="row" id="changesec" style={{display:"none"}}>
<div className="col-md-6 form-group mb-3">
<label for="" className="col-form-label">Old Password</label>
<input type="text" className="form-control" name="name" id="name" placeholder="Your Old Password" />
</div>
<div className="col-md-6 form-group mb-3">
<label for="" className="col-form-label">New Password</label>
<input type="text" className="form-control" name="email" id="email" placeholder="Your New Password" />
</div>    
</div>
<div className="row">
<div className="col-md-12 form-group">
<input type="submit" value="Submit Changes" className="btn btn-primary rounded-0 py-2 px-4"  style={{marginTop:'25px'}}/>
<input type="button" value="Change Password" className="btn btn-primary rounded-0 py-2 px-4" onClick={()=> {document.getElementById('changesec').style.display=""; document.getElementById('change').style.display="none";} } id="change" style={{marginTop:'25px',marginLeft:'10px'}}/>
<span className="submitting"></span>
</div>
</div>
</form>


  </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
  <Table striped bordered hover responsive size="lg">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Doctor Name</th>
          <th>Password</th>
          <th>Date</th>
          <th>Time</th>
          <th>Join</th>
          
        </tr>
      </thead>
      <tbody>
      {meeting.map((data) => (<>
    <tr>
      <td>{data.client_name}</td>
      <td>{data.email}</td>
      <td>{data.room_name}</td>
      <td>{data._id}</td>
      <td>{data.day}</td>
      <td>{data.time}</td>
      {data.day==day && (data.time==time || data.time<time)  ? 
      (<td className="meeting"><Link className="meet-link"  to={"/meeting"} state={{id:data._id,name:data.room_name,username:name}}> <i class="fa-brands fa-meetup"></i></Link></td>
       ): (<td className="meeting"><Link className="meet-link"  to="#"> <i class="fa-brands fa-meetup"></i></Link></td>)  }
      </tr>
    </>
    )) }
              </tbody>
    </Table>

  </div>
  </div>
        </div>
            </>
    );
}

export default Dashboard;