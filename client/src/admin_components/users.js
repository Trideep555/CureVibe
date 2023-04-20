import React,{useEffect,useState} from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce,usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import { NavLink } from 'react-router-dom';

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
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    return fetch("http://localhost:8000/admin/fetchuser",{
      method:"GET",
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
          .then((response) => response.json())
          .then((data) =>{
             setUser(data.data)
          });
  }

  useEffect(() => {
    fetchData();
  },[])
  console.log(user);
 
 const data = user;
  

 const columns = React.useMemo(
     () => [
       {
         Header: 'First Name',
         accessor: 'name', // accessor is the "key" in the data
       },
       {
         Header: 'Email Id',
         accessor: 'email',
       },
       {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (<>
        <NavLink to={row.original.ban=="N" ? "/admin/ban/"+row.original._id: "/admin/unban/"+row.original._id } style={{color:"#f7797d"}} ><i class={row.original.ban=="N"?"fa-solid fa-ban":"fa-solid fa-lock-open"} style={{cursor : "pointer"}}></i>&nbsp;{row.original.ban=="N"?"Ban" : "Unban"}</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to={"/admin/remove/"+row.original._id} style={{color:"#f7797d"}}><i class="fa-solid fa-trash" style={{cursor : "pointer"}}></i>&nbsp;Remove
          </NavLink></>

        ),
       },
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
  

 return (<>
    <p align="center" style={{fontSize:"xx-large",fontWeight:"700",color:"#605448"}}>Users List</p>
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
                  
              </div>
     </div>
     </>
 );
}

export default Example;