import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { removeFromPaste } from '../redux/pastekSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes=useSelector((state)=>state.paste.pastes);
  console.log(pastes);
  const [searchTerm,setSearchTerm]=useState('');

  const dispatch=useDispatch();

  const filterData=pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId))
  }
  function formatDateTime(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleString("en-GB", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}


  return (
    <div className='w-[60%] mt-10 mx-auto max-sm:w-[90%] max-sm:h-[100vh]'>
      <div className='rounded-sm w-100% bg-white flex justify-center items-center border inset-shadow-2xs'>
        <input 
          className='text-black w-full h-[35px] p-3  focus:outline-none'
          type='search'
          placeholder='Search Here'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>
      <div className='mt-4 border inset-shadow-2xs p-4 rounded-sm'>
        {
          filterData.length>0 && filterData.map(
            (paste)=>{
              return(
                <div className='border nset-shadow-2xs h-[150px] flex justify-between p-4 mt-2 gap-2' key={paste?._id}>
                  <div className='w-[65%] max-sm:w-[50%]  p-2'>
                    <div className='font-black text-xl'>
                      {paste.title}
                    </div>
                    <div className=' mt-2'>
                      <p className='line-clamp-2'>{paste.content}</p>
                    </div>
                  </div>
                  <div className='w-[35%] max-sm:w-[50%] flex flex-col justify-center '>
                    <div className='flex justify-between items-center'>
                      <button className='text-2xl' >
                        <a href={`/?pasteId=${paste?._id}`}>
                          <i className="fi fi-sr-file-edit"></i>
                        </a>
                      </button>
                      <button className='text-2xl'>
                        <a href={`/pastes/${paste?._id}`}>
                          <i className="fi fi-rr-overview"></i>
                        </a>
                      </button>
                      <button className='text-2xl' onClick={()=>handleDelete(paste?._id)}>
                        <i className="fi fi-bs-trash"></i>
                      </button>
                      <button className='text-2xl'
                      onClick={() => {navigator.clipboard.writeText(paste?.content) 
                        toast.success("Copied Successfully")
                      }}>
                        <i className="fi fi-rr-copy"></i>
                      </button >
                    </div>
                    <div className='flex justify-center mt-2 '>
                      <p className=''>{formatDateTime(paste.createdAt)}</p>
                    </div>
                    {/* <div></div> */}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
