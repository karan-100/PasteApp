import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pastekSlice';

const ViewPaste = () => {
  const {id}=useParams();
  const allPaste=useSelector((state)=>state.paste.pastes);

  const paste=allPaste.filter((p)=>p._id===id)[0];
  
  return (
    <div className='pasteCreate'>
      <div className="titleDiv">
        <input 
          type="text"
          placeholder='Title'
          value={paste.title}
          disabled
          onChange={(e)=>setTitle(e.target.value)} 
        />
        <button className='homeButton' disabled>
          Crate My Paste
        </button>
      </div>
      <div className="contentDiv">
          <textarea className='textArea' 
            value={paste.content}
            disabled
            placeholder='Enter content here .....'
            onChange={(e)=>setValue(e.target.value)}
            rows={25}
            cols={40}
          />
      </div> 
    </div>
  )
}

export default ViewPaste
