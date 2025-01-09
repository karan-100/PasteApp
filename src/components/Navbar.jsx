import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='outerDiv'>
      <div className='innerDiv'>
        <NavLink className='color' to='/' style={({ isActive }) => {
 return isActive ? { color: "plum" } : {};
 }}>
          Home
        </NavLink>
        <NavLink className='color' to='/pastes' style={({ isActive }) => {
 return isActive ? { color: "plum" } : {};
 }}>
          Pastes
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
