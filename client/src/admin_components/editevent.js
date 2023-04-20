import React,{useEffect,useState} from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce,usePagination } from 'react-table';
import Modal from 'react-bootstrap/Modal';
import { NavLink,useNavigate,useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import Button from 'react-bootstrap/Button';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Editevent()
{
    const {id}=useParams();
    const [showev, setshowev] = useState({name:"",date:"",time:"",desc:"",head:"",embed:""});
    const [event,setuser]= useState({name:"",head:"",embed:"",desc:""});
    let err="";
  let name,value2;
  const handleInputs=(e) =>{
    name=e.target.name;
    value2=e.target.value;
    //console.log(value);
    setuser({...event,[name]:value2});

  }
  const fetchData = async () => {
    return fetch("http://localhost:8000/admin/eventsearch",{
      method:"POST",
      body: JSON.stringify({id}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
             setshowev(data.data)
             document.getElementById("name").value=data.data.name;
              document.getElementById("head").value=data.data.head;
              document.getElementById("embed").value=data.data.embed;
              //document.getElementsByClassName("cal")[0].value=data.data.date;
              //document.getElementById("time").value=data.data.time;
              setStartDate(new Date(data.data.date));
              setuser({name:data.data.name,head:data.data.head,embed:data.data.embed,desc:data.data.desc});
              onChange(data.data.time);  
              document.getElementById("desc").value=data.data.desc;
              
          });
  }

  useEffect(() => {
    fetchData();
  },[])
  const PostData = async(e) =>{
    e.preventDefault();
    const {name ,head,embed,desc}= event;
    const date=startDate.toLocaleDateString();
    //alert(name+" "+head+" "+embed+" "+desc+" "+value+" "+date);
    time=value;
    fetch("http://localhost:8000/admin/eventedit",{
        method:"POST",
        body: JSON.stringify({id,name,head,embed,date,time,desc}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="Event Edited Successfully")
          setTimeout(function(){  window.location.pathname="/admin/event";},2000);
        });
    }
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());
    const d = new Date();
    let time = d.getHours();
    let min=d.getMinutes();
    let x=time+":"+min;
    const [value, onChange] = useState(x);
    return(<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST'>
        <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Event Name</span>
        <input type="text" class="form-control" id="name"  aria-label="Username"   aria-describedby="basic-addon1" name="name"  onChange={handleInputs} />
       </div>

<div class="input-group mb-3">
<span class="input-group-text" id="basic-addon2">Event Head Name</span>
  <input type="text" class="form-control" id="head"  aria-label="Recipient's username" aria-describedby="basic-addon2" name="head"  onChange={handleInputs} />
</div>

<label for="basic-url" class="form-label">Embed Link</label>
<div class="input-group mb-3">
  <input type="text" class="form-control"  id="embed"  aria-describedby="basic-addon3" name="embed"  onChange={handleInputs} />
</div>
<label for="basic-url" class="form-label">Day</label>
<div class="input-group mb-3">
<DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          isClearable
          showIcon
          className='cal'
          
          
        />
</div>
<label for="basic-url" class="form-label">Time</label>
<div class="input-group mb-3">
  
<TimePicker onChange={onChange} value={value}  name="time" id="time" className='form-control'/>
</div>
<div class="input-group">
  <span class="input-group-text">Description</span>
  <textarea class="form-control" aria-label="With textarea" id="desc" name="desc"  onChange={handleInputs}></textarea>
</div>
</form>
<span class="xyz"></span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           <NavLink to="/admin/event" style={{color:'white'}}>Close</NavLink> 
          </Button>
          <Button variant="primary" onClick={PostData}>
            Edit Event
          </Button>
        </Modal.Footer>
      </Modal>
     </>)
}

export default Editevent;