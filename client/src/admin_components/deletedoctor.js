import Modal from 'react-bootstrap/Modal';
import React,{useEffect,useState} from 'react';

import { NavLink,useNavigate,useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import Button from 'react-bootstrap/Button';

function Deldoc(){
  const {id}=useParams();
    
  const Me = async(e) =>{
    e.preventDefault();
    //console.log(id);
    fetch("http://localhost:8000/admin/docdel",{
      method:"POST",
      body: JSON.stringify({id}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
      .then((response) => response.json())
      .then((json) => {
         window.location.pathname="/admin/doctor";;
      });
  };
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
        
    return (<>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <NavLink to="/admin/doctor" style={{color:'white'}}>No</NavLink>
          </Button>
          <form method="POST">
          <Button variant="primary" onClick={Me}>
            Confirm
          </Button>
          </form>
        </Modal.Footer>
      </Modal></>)
}

export default Deldoc;