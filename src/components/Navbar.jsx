import React from 'react'

import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
      <div className='w-full bg-black flex justify-center items-center p-4'>
        <NavLink className='' to='/' style={({ isActive }) => {
 return isActive ? { color: "plum" } : {};
 }}>
          <h3 className='text-xl text-white mr-4'>Home</h3>
        </NavLink>
        <NavLink className='underline-offset-0' to='/pastes' style={({ isActive }) => {
 return isActive ? { color: "plum" } : {};
 }}>
          <h3 className='text-xl text-white ml-4'>Pastes</h3>
        </NavLink>
      </div>
  )
}

export default Navbar
