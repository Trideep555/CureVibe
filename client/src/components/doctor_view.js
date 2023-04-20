import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import React,{useState,useEffect} from "react";

function Doctor_view(){
    //const {id}=useParams();
    
    const {id}=useParams();
    const [doc, setdoc] = useState({name:"",email:"",file:"",day:"",time:"",desc:""});
    let k=0;
    const fetchData = async () => {
      return fetch("http://localhost:8000/admin/docsearch",{
        method:"POST",
        body: JSON.stringify({id}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
            .then((response) => response.json())
            .then((data) =>{
               setdoc(data.data)
               //onChange(data.data.time);  
            });
    }
  
    useEffect(() => {
      fetchData();
    },[])
    let err="";
    const PostData = async(e) =>{
      e.preventDefault();
      const {name ,email,file,day,time,desc}= doc;
      const date=startDate.toLocaleDateString();
      //alert(name+" "+head+" "+embed+" "+desc+" "+value+" "+date);
      let c_name=localStorage.getItem("name");
      fetch("http://localhost:8000/book",{
          method:"POST",
          body: JSON.stringify({name,email,date,time,c_name}),
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        })
          .then((response) => response.json())
          .then((json) => {
            err=json.error;
            document.getElementsByClassName('xyz')[0].innerHTML=err;
            if(err==="Booking Successfull")
            setTimeout(function(){  window.location.pathname="/dashboard";},2000);
          });
      }
  
      const [startDate, setStartDate] = useState();
    
    return (<>
    <div className='container'>
    <img src={doc.file} alt="" height="250px" width="250px" style={{marginTop:'15%',marginLeft:'20%',float:"left"}} />
    <div className='app-form'  style={{marginTop:'15%',marginRight:'15%',float:'right'}}>
    <Form method="POST">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={doc.name} disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date and Time</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          isClearable
          showIcon
          className='cal'
          minDate={new Date()}
          maxDate={new Date().setDate(new Date().getDate()+30)}
          filterDate ={(date)=>{ 
            const day = date.getDay();
            let days=doc.day.split(",");
            let x=day===days[0];
            for(let i=0;i<days.length;i++)
            x=x|| day==days[i];
            return x;
          }}
          
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control type="text" value={doc.time} disabled  placeholder="Available Time"/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={PostData}>
        Book 
      </Button>
    </Form>
      <span class="xyz"></span>
    </div>
    </div>
    </>)
}
export default Doctor_view;