function AdminOut() {
    function Log()
    {
        localStorage.removeItem("admin");
        window.location.pathname="/admin";
    }
return(<>
{Log()}
</>)
}
export default AdminOut;