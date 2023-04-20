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
import { MultiSelect } from "react-multi-select-component";
import {Convert} from 'mongo-image-converter';

function Editdoctor()
{
    const {id}=useParams();
    const [doc, setdoc] = useState({name:"",email:"",file:"",day:"",time:"",desc:""});
    const [event,setuser]= useState({name:"",email:"",desc:""});
    let err="";
    let array =new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

    let name,value2;
  const handleInputs=(e) =>{
    name=e.target.name;
    value2=e.target.value;
    //console.log(value);
    setdoc({...doc,[name]:value2});

  }
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
            
             setFile(data.data.file);
             let m=data.data.day;
             
             for(let i in m)
             {
              if(m[i]=="," || k==1)
              continue;
              setSelected(prevArray=>[...prevArray,{label:array[m[i]],value:m[i]}]);
             }
             k=1;
             onChange(data.data.time);  
          });
  }

  useEffect(() => {
    fetchData();
  },[])
  const PostData = async(e) =>{
    e.preventDefault();

    const {name ,email,fil,day,time,desc}= doc;
    
    let nums="";
    for(let i in selected){
      nums+=selected[i].value+",";
    }
    nums=nums.slice(0,nums.length-1);
    
    try {
      let x;
        const convertedImage = await Convert(imageFile);
        
        if(convertedImage==undefined)
        {
          x=fil;
        }

      if( convertedImage){
              //console.log(convertedImage);
        x=convertedImage;
      }
    fetch("http://localhost:8000/admin/docedit",{
        method:"POST",
        body: JSON.stringify({id,name,email,desc,x,value,nums}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="Doctor Edited Successfully")
          setTimeout(function(){  window.location.pathname="/admin/doctor";},2000);
        });
      }catch(err)
      {
        console.log(err);
      }
    }
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selected, setSelected] = useState([]);
    const [imageFile, setImageFile] = useState('');
    const [file,setFile]=useState();
    const options = [
      { label: "Sunday", value: "0" },
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2"},
      { label: "Wednesday", value: "3"},
      { label: "Thursday", value: "4"},
      { label: "Friday", value: "5"},
      { label: "Saturday", value: "6"},
    ];
    const d = new Date();
    let time = d.getHours();
    let min=d.getMinutes();
    let x=time+":"+min;
    const [value, onChange] = useState(x);
    return(<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add Doctors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Doctor Name</span>
        <input type="text" className="form-control"  aria-label="Username" aria-describedby="basic-addon1" name="name" value={doc.name} onChange={handleInputs} />
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Doctor Email</span>
        <input type="text" className="form-control"  aria-label="Username" aria-describedby="basic-addon1" name="email" value={doc.email} onChange={handleInputs} />
       </div>
       
       <label for="basic-url" className="form-label">Days</label>
<div className="input-group mb-3">

<MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        className='form-control'
        disableSearch="true"
      />
      </div>

<label for="basic-url" className="form-label">Image</label>
<div className="input-group mb-3">
  <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange = {(e) => {setImageFile( e.target.files[0] ); if (e.target.files && e.target.files[0]) {
   setFile(URL.createObjectURL(e.target.files[0])); }  } }></input>
  <img src={file} height="180" width='180' />
</div>
<label for="basic-url" className="form-label">Time</label>
<div className="input-group mb-3">
  
<TimePicker onChange={onChange} value={value} className='form-control'/>
</div>
<div className="input-group">
  <span className="input-group-text">Description</span>
  <textarea className="form-control" aria-label="With textarea" id="desc" name="desc" value={doc.desc} onChange={handleInputs}></textarea>
</div>
<span className="xyz"></span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          <NavLink to="/admin/doctor" style={{color:'white'}}>Close</NavLink> 
          </Button>
          <Button variant="primary" onClick={PostData} >
            Edit Doctor
          </Button>
        </Modal.Footer>
      </Modal>
     </>)
}

export default Editdoctor;