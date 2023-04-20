import {useParams} from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import {JitsiMeeting} from  '@jitsi/react-sdk'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
/*const userFullName = 'Joseph Strawberry'
const pass="123"*/
function Meeting () {
    //const location=useLocation();
    //console.log(location);
    const {id,name,username}=useLocation().state;
    const [password,setpass]=useState("");
    const [msg,setmsg]=useState("");
    
    const [show, setShow] = useState(true);  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);  
    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.height = '100vh';
    };
    const passchange = (event)=>{
        setpass(event.target.value);
    }

    var x="";
    if(localStorage.getItem("type")=="doctor")
    x="security";
    const navigate=useNavigate();
    return  (
    <>
    <JitsiMeeting roomName={name} displayName={username} password={id}  getIFrameRef = { handleJitsiIFrameRef2 }
    configOverwrite={{toolbarButtons: [
            'camera',
            'chat',
            'closedcaptions',
            'desktop',
        //    'download',
         //   'embedmeeting',
        //    'etherpad',
        //    'feedback',
        //    'filmstrip',
            'fullscreen',
        //    'hangup',
        //    'help',
        //    'highlight',
        //    'invite',
        //    'linktosalesforce',
        //    'livestreaming',
            'microphone',
            'noisesuppression',
        //    'participants-pane',
            'profile',
            'raisehand',
        //    'recording',
            x,
            'select-background',
                "settings",
        //    'shareaudio',
        //    'sharedvideo',
        //    'shortcuts',
        //    'stats',
        //    'tileview',
            'toggle-camera',
            'videoquality',
            'whiteboard',
         ]}}
      />
      <a href="#" onClick={()=>{ window.location.pathname="/dashboard"}} style={{position:"absolute",zIndex:"1",top:"90%",left:"95%"}}><button type="submit" className="btn btn-link btn-block mb-4"  style={{textDecoration:'none'}}>
                Quit 
              </button></a>
              <Modal show={show} onHide={modalClose}>  
  <Modal.Header closeButton>  
    <Modal.Title>Please Verify Its You</Modal.Title>  
  </Modal.Header>  
  
  <Modal.Body>  
  <div className="form-outline mb-4">
  <label className="form-label" for="form3Example3">Password</label>
              
                <input type="password" id="form3Example3" className="form-control" onChange={passchange} name="password" />
                <span style={{color: 'red'}} id="err">{msg}</span>
                </div> 
  </Modal.Body>  
  
  <Modal.Footer>  
    <Button variant="secondary" onClick={()=>{ navigate("/dashboard")}}>Go Back</Button>  
    <Button variant="primary" onClick={password==id? modalClose: ()=>{ setmsg("Please Check Password") }}>Submit</Button>  
  </Modal.Footer>  
</Modal>  
  </>  ) 

}
export default Meeting;
