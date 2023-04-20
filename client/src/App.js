import './App.css';
import Navbar from './components/navbar';
import {Route, Routes} from "react-router-dom";
import Home from './components/home';
import About from './components/about';
import Chatbot from './components/chatbot';
import Register from './components/register';
import Login from './components/login';
import Contact from './components/contact';
import Appointment from './components/appointment';
import Events from './components/events';
import Logout from './components/logout';
import DoctorView from './components/doctor_view';
import AdminLog from './admin_components/login';
import Sidebar2 from './admin_components/sidebar';
import AdminOut from './admin_components/logout';
import Users from './admin_components/users';
import Welcome from './admin_components/welcome';
import Event from './admin_components/events';
import Doctor from './admin_components/doctors';
import Delevent from './admin_components/deletevent';
import Editevent from './admin_components/editevent';
import Editdoctor from './admin_components/editdoctor';
import Deldoc from './admin_components/deletedoctor';
import Dashboard from './components/dashboard';
import Meeting from './components/meeting';
import Analytics from './admin_components/analytics';
import Ban from './admin_components/ban';
import Unban from './admin_components/unban';
import Remove from './admin_components/remove';
function App() {
  return (
   <>
  <Routes>
  <Route path="/" exact element={<><Navbar />
  <Chatbot /><Home /> </>} />
   <Route path="/about" exact element={<><Navbar />
  <Chatbot /><About /> </>} />
  <Route path="/register" exact element={<><Register /> </>} />
  <Route path="/login" exact element={<><Login /> </>} />
  <Route path="/contact" exact element={<><Navbar />
  <Chatbot /><Contact />  </>} />
  <Route path="/appointment" exact element={<><Navbar />
  <Chatbot /><Appointment />  </>} />
  <Route path="/event" exact element={<><Navbar />
  <Chatbot /><Events />  </>} />
  <Route path="/appointment/:id" exact element={<><Navbar />
  <Chatbot /><DoctorView />  </>} />
  <Route path="/logout" exact element={<><Logout />  </>} />
  <Route path="/dashboard" exact element={<><Navbar /><Dashboard />  </>} />
  
  <Route path="/admin" exact element={<AdminLog/>} />
  <Route path="/meeting" exact element={<Meeting/>} />
  
  <Route path="/admin/welcome" exact element={<>
  <Sidebar2/><Welcome/>
   </>} />
   <Route path="/admin/analytics" exact element={<>
  <Sidebar2/><Analytics/>
   </>} />
   <Route path="/admin/user" exact element={<>
  <Sidebar2/><Users/>
   </>} />
   <Route path="/admin/event" exact element={<>
  <Sidebar2/><Event/>
   </>} />
   <Route path="/admin/ban/:id" exact element={<>
  <Ban/>
   </>} />
   <Route path="/admin/remove/:id" exact element={<>
  <Remove/>
   </>} />
   <Route path="/admin/unban/:id" exact element={<>
  <Unban/>
   </>} />
   <Route path="/admin/doctor" exact element={<>
  <Sidebar2/><Doctor/>
   </>} />
   <Route path="/admin/logout" exact element={<><AdminOut />  </>} />
   <Route path="/admin/delevent/:id" exact element={<><Sidebar2/><Delevent />  </>} />
   <Route path="/admin/editevent/:id" exact element={<><Sidebar2/><Editevent />  </>} />
   <Route path="/admin/editdoctor/:id" exact element={<><Sidebar2/><Editdoctor />  </>} />
   <Route path="/admin/deletedoctor/:id" exact element={<><Sidebar2/><Deldoc />  </>} />
   
   </Routes>
   
   </>
  );
}

export default App;
