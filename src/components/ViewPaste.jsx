import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pastekSlice';

const ViewPaste = () => {
  const {id}=useParams();
  const allPaste=useSelector((state)=>state.paste.pastes);

  const paste=allPaste.filter((p)=>p._id===id)[0];
  
  return (
    // <div className='pasteCreate'>
    //   <div className="titleDiv">
    //     <input 
    //       type="text"
    //       placeholder='Title'
    //       value={paste.title}
    //       disabled
    //       onChange={(e)=>setTitle(e.target.value)} 
    //     />
    //     <button className='homeButton' disabled>
    //       Crate My Paste
    //     </button>
    //   </div>
    //   <div className="contentDiv">
    //       <textarea className='textArea' 
    //         value={paste.content}
    //         disabled
    //         placeholder='Enter content here .....'
    //         onChange={(e)=>setValue(e.target.value)}
    //         rows={25}
    //         cols={40}
    //       />
    //   </div> 
    // </div>
    <div className='w-[60%] mx-auto max-sm:w-[90%] max-sm:h-[100vh]'>
      <div className=" bg-white flex justify-center items-center p-4">
        <input 
        className='w-[50%] h-[35px] p-3 border inset-shadow-2xs focus:outline-none'
          type="text"
          placeholder='Title'
          value={paste.title}
          onChange={(e)=>setTitle(e.target.value)} 
        />
        <button disabled className='ml-4 bg-blue-600 text-white px-4 py-2 rounded-md'>
          Create My Paste
        </button>
      </div>
      <div className='w-full bg-white flex justify-center flex-col items-center p-4'>
          <div className='w-full justify-between items-center flex gap-1 p-2 border inset-shadow-2xs' >
            <div className='flex gap-1'>
              <div className='w-5 h-5 rounded-[50%] bg-red-500 '></div>
              <div className='w-5 h-5 rounded-[50%]  bg-yellow-300'></div>
              <div className='w-5 h-5 rounded-[50%]  bg-green-600'></div>
            </div>
            <div>
              <div className='mr-2 opacity-50'
                    onClick={() => {navigator.clipboard.writeText(value) 
                      toast.success("Copied Successfully")
                    }}><i className="fi fi-rr-copy"></i>
              </div>
            </div>
          </div>
          <textarea className='w-full h-[500px] p-3 border inset-shadow-2xs focus:outline-none' 
            value={paste.content}
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
