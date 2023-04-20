function Logout() {
    function Log()
    {
        localStorage.removeItem("name");
        localStorage.removeItem("type");
        
        window.location.pathname="/";
    }
return(<>
{Log()}
</>)
}
export default Logout;