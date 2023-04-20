import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../assets/vendor/fontawesome-6.2.1/css/fontawesome.min.css';
import {NavLink} from "react-router-dom";

const directionButtons = (direction) => {
  return (
    <span
      aria-hidden="true"
      className={direction === "Next" ? "fa-solid fa-arrow-right-long cur" : "fa-solid fa-arrow-left-long cur1"}
      
    >
      
    </span>
  );
};



function Home() {
    return (
        <>
        <section id="hero">
        <Carousel
        nextLabel={"Next"}
        prevLabel={"Previous"}
        nextIcon={directionButtons("Next")}
        prevIcon={directionButtons("Previous")}
    autoPlay={true}
    interval={2000}
    fade
  >
 
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="../assets/img/slide/slide-1.jpg"
          alt="First slide"
        />

      <div className="carousel-container">
      <div className="container">

      <h2 className="animate__animated animate__fadeInDown">Welcome to <span>CureVibe</span></h2>
<p className="animate__animated animate__fadeInUp">A platform for everyone going through trouble.We have everything from doctors to consult with to various interesting events to look forward to . Click to know more about us.</p>
<NavLink to="/about" style={{textDecoration:'none'}} className="btn-get-started animate__animated animate__fadeInUp scrollto">Know More</NavLink>
</div>
</div> 
 </Carousel.Item>
          <Carousel.Item>
        <img
          className="d-block w-100"
          src="../assets/img/slide/slide-2.jpg"
          alt="First slide"
        />
        <div className="carousel-container">
<div className="container">
<h2 className="animate__animated animate__fadeInDown">Upcoming Events</h2>
<p className="animate__animated animate__fadeInUp">Looking Forward to do something interesting. We are bringing various interesting events . Stay Tuned to Know More . Click here to go to events page</p>
<NavLink to={localStorage.getItem("name") ?"/event" : "/login"} style={{textDecoration:'none'}} className="btn-get-started animate__animated animate__fadeInUp scrollto">Lets Go</NavLink>
</div>
</div>
  </Carousel.Item>
          <Carousel.Item>
        <img
          className="d-block w-100"
          src="../assets/img/slide/slide-3.jpg"
          alt="First slide"
        />
        <div className="carousel-container">
<div className="container">
<h2 className="animate__animated animate__fadeInDown">Appointment</h2>
<p className="animate__animated animate__fadeInUp">Feeling Trouble? Want to talk to someone. Book a session with our doctors. Click here to go to our appointment Page</p>
<NavLink to={localStorage.getItem("name") ?"/appointment" : "/login"} style={{textDecoration:'none'}} className="btn-get-started animate__animated animate__fadeInUp scrollto">Book Appointment</NavLink>
</div>
</div>
</Carousel.Item>
    </Carousel>
  </section>
        </>
        );
    }
    
    export default Home;