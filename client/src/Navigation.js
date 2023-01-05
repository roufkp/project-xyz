
import { BrowserRouter as Router, Link } from "react-router-dom"; 
import styles from './navigation.module.css';
import logo from './logo.svg';

 
const NavigationBar = () => { 
  return ( 
    <Router> 
      <nav> 
        <img src={logo} alt="not"></img>
        <ul> 
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/about">About</Link></li> 
          <li><Link to="/contact">Contact</Link></li> 
        </ul> 
      </nav>  

    </Router>  

 );  

 };  

 export default NavigationBar;