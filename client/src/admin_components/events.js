import React,{useEffect,useState} from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce,usePagination } from 'react-table';
import Modal from 'react-bootstrap/Modal';
import { NavLink,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import Button from 'react-bootstrap/Button';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
    
     <i class="fa-solid fa-magnifying-glass beside" id="srch" style={{cursor:"pointer"}}></i>
     <i class="fa-solid fa-circle-xmark beside" id="cross" onClick={e=>{
      
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
  const [rate,setrate]=useState([]);
  const fetchData = async () => {
    return fetch("http://localhost:8000/admin/event",{
      method:"GET",
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
            setrate(data.rating);
            for(let i in data.data){
              var x=data.rating.find((rate)=> rate.name==data.data[i].name)
              if(x)
              data.data[i].feedback=x.feedback
              else
              data.data[i].feedback="Not Rated"
            }          
             setshowev(data.data)
            
             //console.log(data.data);
          });
  }
  /*function chk(name)
  {
    
    var x=rate.find((rate)=> rate.name==name)
    if(x)
    return x.feedback;
    else
    return "Not Rated";
  }*/

  useEffect(() => {
    fetchData();
  },[])
  //console.log(showev);
 const [edit,setedit]=useState({name:"",head:"",embed:"",date:"",time:"",desc:"",show:false});
 const data = showev;
 
 const columns = React.useMemo(
     () => [
       {
         Header: 'Event Name',
         accessor: 'name', // accessor is the "key" in the data
       },
       {
         Header: 'Organizer Name',
         accessor: 'head',
       },
       {
         Header: 'Date',
         accessor: 'date',
       },
       {
        Header: 'Time',
        accessor: 'time',
      },
       {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (<>
          <NavLink to={"/admin/editevent/"+row.original._id} style={{color:"#f7797d"}} ><i class="fa-solid fa-pen-to-square" style={{cursor : "pointer"}}></i></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink to={"/admin/delevent/"+row.original._id} style={{color:"#f7797d"}}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i>
          </NavLink></>

      ),
      },
      {
        Header: 'Avg. Rating',
        accessor : 'feedback',
        /*Cell: ({ row }) => (<>
          {"4"}</>

      )*/
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
 const navigate= useNavigate();
  let err="";
  const [event,setuser]= useState({name:"",head:"",embed:"",desc:""});
  let name,value2;
  const handleInputs=(e) =>{
    name=e.target.name;
    value2=e.target.value;
    //console.log(value);
    setuser({...event,[name]:value2});

  }
  const PostData = async(e) =>{
    e.preventDefault();
    const {name ,head,embed,desc}= event;
    const date=startDate.toLocaleDateString();
    //alert(name+" "+head+" "+embed+" "+desc+" "+value+" "+date);
    time=value;
    fetch("http://localhost:8000/admin/eventadd",{
        method:"POST",
        body: JSON.stringify({name,head,embed,date,time,desc}),
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
      })
        .then((response) => response.json())
        .then((json) => {
          err=json.error;
          document.getElementsByClassName('xyz')[0].innerHTML=err;
          if(err==="Event Added Successfully")
          setTimeout(function(){  window.location.pathname="/admin/event";},2000);
        });
    }
 const [show, setShow] = useState(false);
 const [startDate, setStartDate] = useState(new Date());
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const d = new Date();
 let time = d.getHours();
 let min=d.getMinutes();
 let x=time+":"+min;
 const [value, onChange] = useState(x);
 return (<>
    <p align="center" style={{fontSize:"xx-large",fontWeight:"700",color:"#605448"}}>Events List</p>
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
                     <span style={{paddingLeft:'180px'}} onClick={handleShow}><i className="fa-solid fa-circle-plus add-new" style={{cursor:'pointer'}}></i></span>
                 
              </div>
     </div>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST'>
        <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Event Name</span>
        <input type="text" class="form-control" id="name"  aria-label="Username"   aria-describedby="basic-addon1" name="name" value={event.name} onChange={handleInputs} />
       </div>

<div class="input-group mb-3">
<span class="input-group-text" id="basic-addon2">Event Head Name</span>
  <input type="text" class="form-control" id="head"  aria-label="Recipient's username" aria-describedby="basic-addon2" name="head" value={event.head} onChange={handleInputs} />
</div>

<label for="basic-url" class="form-label">Embed Link</label>
<div class="input-group mb-3">
  <input type="text" class="form-control"  id="embed"  aria-describedby="basic-addon3" name="embed" value={event.embed} onChange={handleInputs} />
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
  
<TimePicker onChange={onChange}  name="time" id="time" className='form-control'/>
</div>
<div class="input-group">
  <span class="input-group-text">Description</span>
  <textarea class="form-control" aria-label="With textarea" id="desc" name="desc" value={event.desc} onChange={handleInputs}></textarea>
</div>
</form>
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