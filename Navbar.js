import React from 'react'
import {NavLink} from 'react-router-dom'
import "../App.css";
export default function Navbar() {
     return (
    <div><nav className='navbar2'>
      <ul>
        
      <li> <NavLink to='/' className='nav-link'>HOME</NavLink></li>
       <li><NavLink to='/AboutUs' className='nav-link'>ABOUT</NavLink></li>
      <li> <NavLink to='/Services' className='nav-link'>SERVICE</NavLink></li>
      <li><NavLink to='/Contact' className='nav-link'>CONTACT US</NavLink></li>
      <li><NavLink to='/Dashboard' className='nav-link'>ADMIN       <li><NavLink to='/admin' className='nav-link'></NavLink></li>  
      </NavLink></li>  
      </ul>
   
    
    </nav>
    
   </div>
  )
}
