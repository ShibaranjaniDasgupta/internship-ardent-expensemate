import React from 'react';
import { NavLink } from 'react-router-dom';

const Mai = () => {
  return (
    <>
      <div className='container-fluid text-light bg-dark text-center'>
        <ul className="nav float-right">
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>Home</NavLink>
          </li>
          {/* <li className='nav-item'>
            <NavLink className='nav-link' to='/Footer'>Footer</NavLink>
          </li> */}
          <li className='nav-item'>
            <NavLink className='nav-link' to='/About'>About</NavLink>
          </li>
{/* 
          <li className='nav-item'>
            <NavLink className='nav-link' to='/Help'>Help</NavLink>
          </li> */}
          
          <li className='nav-item'>
            <NavLink className='nav-link' to='/ProfilePage'>Profile</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/Notification'style={{ textDecoration: 'none', color: '#58f7f7', marginLeft: 20 }}>🔔</NavLink>
          </li>
{/*           
          <li className='nav-item'>
            <NavLink className='nav-link' to='/Contact'>Contact</NavLink>
          </li> */}
          <li className='nav-item'>
            <NavLink className='nav-link' to='/Email'>Contact</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Mai;
