import React,{useState,useEffect} from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce,usePagination } from 'react-table';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import Button from 'react-bootstrap/Button';
import TimePicker from 'react-time-picker';
import { MultiSelect } from "react-multi-select-component";
import {Convert} from 'mongo-image-converter';

function GlobalFilter({
                       preGlobalFilteredRows,
                       globalFilter,
                       setGlobalFilter,
                     }) {
 const count = preGlobalFilteredRows.length
 const [value, setValue] = React.useState(globalFilter)
 const onChange = useAsyncDebounce(value => {
   setGlobalFilter(value || undefined)
 }, 200)

 return (
   <span className="search">
     <i className="fa-solid fa-magnifying-glass beside" id="srch" style={{cursor:"pointer"}}></i>
     <i className="fa-solid fa-circle-xmark beside" id="cross" onClick={e=>{
      
     }} style={{display:'none',cursor:"pointer"}}></i>
     <input
       value={value || ""}
       onChange={e => {
         setValue(e.target.value);
         onChange(e.target.value);
        if(e.target.value!=""){
         document.getElementById("cross").style.display="block";
         document.getElementById("srch").style.display="none";
        }
        else{
          document.getElementById("cross").style.display="none";
         document.getElementById("srch").style.display="block";
        }
        document.getElementById("cross").addEventListener("click", function(){
          document.getElementById("cross").style.display="none";
          document.getElementById("srch").style.display="block";
          e.target.value="";
          setValue(e.target.value);
          onChange(e.target.value);
        });
       }}
       placeholder={`Search`}
       style={{
         fontSize: '1.1rem',
         border: '0',
         borderRadius:'15px',
         paddingLeft:'10px'
       }}
       id="data"
     />
   </span>
 )
}

// Define a default UI for filtering
function DefaultColumnFilter({
                              column: { filterValue, preFilteredRows, setFilter },
                            }) {
 const count = preFilteredRows.length

 return (
   <input
     value={filterValue || ''}
     onChange={e => {
       setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
     }}
     placeholder={`Search  records...`}
   />
 )
}

function Example() {
  const [showev, setshowev] = useState([]);

  const fetchData = async () => {
    return fetch("http://localhost:8000/admin/doctor",{
      method:"GET",
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
             setshowev(data.data)
          });
  }
  let array =new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
 function fun(x)
 {
  x=x.split(",");
  let k="";
  for(let i in x)
  {
    k+=array[x[i]]+",";
  }
  k=k.slice(0,k.length-1);
  return k;
 }
  useEffect(() => {
    fetchData();
  },[])
const data = showev;
 const columns = React.useMemo(
     () => [
      {
        accessor: 'image',
        Cell: ({ row }) => (<>
          <img src={`${row.original.file}`} height="50" width="50" style={{borderRadius: '10px'}} />
          </>
          ),
      },
       {
         Header: 'Name',
         accessor: 'name', 
         Cell: ({ row }) => (<>
        {row.original.name} </>

      ),
       },
       {
         Header: 'Days',
         accessor: 'day',
         Cell: ({ row }) => (<>
          {fun(row.original.day)}</>

      ),
       },
       {
         Header: 'Time',
         accessor: 'time',
       },
       {
        Header: 'Description',
        accessor: 'desc',
        Cell: ({ row }) => (<>
          {row.original.desc.slice(0,10)}&nbsp;...</>

      ),
      },
       {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (<>
          <NavLink to={"/admin/editdoctor/"+row.original._id} style={{color:"#f7797d"}} ><i class="fa-solid fa-pen-to-square" style={{cursor : "pointer"}}></i></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to={"/admin/deletedoctor/"+row.original._id} style={{color:"#f7797d"}}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i>
          </NavLink></>
        ),
       }
     ],
     []
 )

 const defaultColumn = React.useMemo(
   () => ({
     // Let's set up our default Filter UI
     Filter: DefaultColumnFilter,
   }),
   []
 )

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
   state,
   visibleColumns,
   preGlobalFilteredRows,
   setGlobalFilter,
   page,
   canPreviousPage,
   canNextPage,
   pageOptions,
   pageCount,
   gotoPage,
   nextPage,
   previousPage,
   setPageSize,
   state: { pageIndex, pageSize },
 } = useTable(
   {
     columns,
     data,
     defaultColumn,
     initialState: { pageIndex: 0 , pageSize:5   },
      // Be sure to pass the defaultColumn option
   },
   useFilters,
   useGlobalFilter,
   useSortBy,
   usePagination
 );
 
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const d = new Date();
 let time = d.getHours();
 let min=d.getMinutes();
 let x=time+":"+min;
 const [value, onChange] = useState(x);
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
const [doc,setdoc]= useState({name:"",desc:"",email:""});
  let name,value2;
  const handleInputs=(e) =>{
    name=e.target.name;
    value2=e.target.value;
    //console.log(value);
    setdoc({...doc,[name]:value2});

  }
const [selected, setSelected] = useState([]);
let err="";
const PostData = async(e) =>{
  e.preventDefault();
 const {name,desc,email}=doc;
 let nums="";
 for(let i in selected){
  nums+=selected[i].value+",";
 }
 nums=nums.slice(0,nums.length-1);
 
  try {
          const convertedImage = await Convert(imageFile);
          if( convertedImage ){
                  console.log(convertedImage);
                  //alert(name+" "+nums+" "+imageFile+" "+value+" "+" "+desc+" "+email);
                  // after this pass it to the backend using your fav API,
                  fetch("http://localhost:8000/admin/adddoctor",{
      method:"POST",
      body: JSON.stringify({name,email,desc,convertedImage,value,nums}),
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
      .then((response) => response.json())
      .then((json) => {
        err=json.error;
        document.getElementsByClassName('xyz')[0].innerHTML=err;
        if(err==="Doctor Added Successfully")
        setTimeout(function(){  window.location.pathname="/admin/doctor";},2000);
      });
          } else{
                  console.log('The file is not in format of image/jpeg or image/png')
           }
          }       
  catch (error) {
          console.warn(error.message)
          }
          
 //(name+" "+nums+" "+file+" "+value+" "+" "+desc);
  
  }
 return (<>
    <p align="center" style={{fontSize:"xx-large",fontWeight:"700",color:"#605448"}}>Doctors List</p>
     <div className="center3">
        
        <p ><GlobalFilter
               preGlobalFilteredRows={preGlobalFilteredRows}
               globalFilter={state.globalFilter}
               setGlobalFilter={setGlobalFilter}
             /></p>
             
       <table {...getTableProps()} className="table table-striped table-dark  table-hover" style={{boxShadow:'1px 2px 2px #ffffe6',width:"700px",height:"300px" }}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr className="thead-dark" {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th className="col"
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                                       >
                     {column.render('Header')}
                     <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
                    </th>
               ))}
             </tr>
         ))}
         
         </thead>
         <tbody {...getTableBodyProps()}>
         {page.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td className="col"
                           {...cell.getCellProps()}
                           
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
       <div className="pagination">
                  <button className="blue" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <i className="fa-solid fa-backward arrows"></i>
                  </button>{' '}
                  <button className="blue" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  <i className="fa-solid fa-arrow-left arrows"></i>
                  </button>{' '}
                  <button className="blue" onClick={() => nextPage()} disabled={!canNextPage}>
                  <i className="fa-solid fa-arrow-right arrows"></i>
                  </button>{' '}
                  <button className="blue" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  <i className="fa-solid fa-forward arrows"></i>
                  </button>{' '}
                  <span style={{marginLeft:'2%',marginRight:'2%'}}>
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>
                  </span>
                  <span>
                    | Go to page{' '}
                    <input
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                      }}
                      style={{ width: '150px',fontSize: '1.1rem',
                      
                      borderRadius:'15px',
                      paddingLeft:'10px' }}
                    />
                  </span>{' '}
                  <span style={{paddingLeft:'180px'}} onClick={handleShow}><i className="fa-solid fa-user-plus add-new" style={{cursor:'pointer'}}></i></span>
                  
              </div>
     </div>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
            Close
          </Button>
          <Button variant="primary" onClick={PostData}>
            Add new
          </Button>
        </Modal.Footer>
      </Modal>
     </>
 );
}

export default Example;