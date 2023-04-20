import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ReactStars from "react-rating-stars-component";
import { useState,useEffect } from 'react';
if(window.location.pathname==='/event')
{
    document.body.style.overflow='visible';
}
function Events() {
  const [showev, setshowev] = useState([]);
  const [rate, setrate] = useState([]);

  const fetchData = async () => {
    return fetch("http://localhost:8000/admin/event",{
      method:"GET",
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
             setshowev(data.data)
             setrate(data.rating)
             
          });
  }

  function feedback(rating,name){
    return fetch("http://localhost:8000/feedback",{
      method:"POST",
      body: JSON.stringify({rating,name}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <>
    <div className="container" data-aos="fade-up">

<div className="section-title" style={{marginTop:'130px'}}>
  
  <p align="center">Events</p>
</div>
<p className='Trend'>Upcoming</p>
<div className='trending'>
  {showev.map((user)=>(<> { new Date(user.date) > new Date() ?
<MDBCard style={{height:'320px',width:'260px'}}>
<iframe  src={user.embed} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<MDBCardBody>
        <MDBCardTitle style={{fontSize: '20px'}}>{user.name} By {user.head}</MDBCardTitle>
        <MDBCardText style={{fontSize: '16px'}}>
          {user.desc}
        </MDBCardText>
        {user.date} {user.time} <a href={user.embed}><i class="fa-brands fa-youtube watch" style={{fontSize: '25px'}}></i></a>
      </MDBCardBody>
    </MDBCard> : null }
    </>) )}
    
    </div>
    <p className='Trend'>All Events</p>
    <MDBTable align='middle' style={{overflow:'scroll',height:'20px'}}>
      <MDBTableHead>
        
        <tr>
          <th scope='col'>Event Name</th>
          <th scope='col'>Event Head</th>
          <th scope='col'>Status</th>
          
          <th scope='col'>Actions</th>
          <th scope='col'>Avg. Rating</th>
        </tr>
      </MDBTableHead>
      {showev.slice(0).reverse().map((user)=>(
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
           
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.name}</p>
                <p className='text-muted mb-0'></p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{user.head}</p>
            <p className='text-muted mb-0'></p>
          </td>
          <td>
            <MDBBadge color={new Date(user.date) > new Date() ? "danger" : "success"} pill>
              {new Date(user.date) > new Date() ? "Upcoming" : "Completed"}
            </MDBBadge>
          </td>
          
          <td>
          <a href={user.embed}><i class="fa-brands fa-youtube watch" style={{fontSize: '25px'}}></i></a>
          </td>
          <td><ReactStars
    count={new Date(user.date) > new Date() ? 0 : 5}
    onChange={(rating)=>{ feedback(rating,user.name)}}
    size={24}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
    value={rate.find(r => r.name==user.name)? rate.find(r => r.name==user.name).feedback : 0}
  /></td>
        </tr>
        </MDBTableBody>
      
        ) ) }
</MDBTable>
    </div>
    </>
  );
}


export default Events;