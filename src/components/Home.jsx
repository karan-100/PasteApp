import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updateToPaste } from '../redux/pastekSlice';
const Home = () => {
  
  const [title,setTitle]=useState("");
  const [value,setValue]=useState('');
  const allPastes=useSelector((state)=>state.paste.pastes);
  const [searchParams,setSearchParams]=useSearchParams();
  const pasteId=searchParams.get("pasteId");
  const dispatch=useDispatch();
  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=>p._id===pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId,allPastes])
  function createPaste(){
    const paste ={
      title: title,
      content : value,
      _id: pasteId|| Date.now().toString(36),
      createdAt:new Date().toISOString(),
    }

    if(pasteId){
      //Update
      dispatch(updateToPaste(paste));
      // After updating paste
      setTitle('');
      setValue('');
      setSearchParams('');
    }
    else if(allPastes.find((item)=>item.title.toLowerCase()===paste.title.toLowerCase())){
      toast.error("This title already exist.");
    }
    else{

      if(paste.title==="") {
        toast.error("Please enter title");
      }
      else if(paste.content===""){
        toast.error("Please Write Your Paste");
      }
      //Create
      else if(paste.title!=="" && paste.content!==""){
        dispatch(addToPaste(paste));
        // After creation of paste
        setTitle('');
        setValue('');
        setSearchParams({});
      }  
    }

    

  }
  return (
    <div className='w-[60%] mx-auto max-sm:w-[90%] max-sm:h-[100vh]'>
      <div className=" bg-white flex justify-center items-center p-4">
        <input 
        className='w-[50%] h-[35px] p-3 border inset-shadow-2xs focus:outline-none'
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)} 
        />
        <button onClick={createPaste} className='ml-4 bg-blue-600 text-white px-4 py-2 rounded-md'>
          {
            pasteId? "Update Paste":"Create My Paste"
          }
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
                    onClick={() => {value && navigator.clipboard.writeText(value)
                      toast.success("Copied Successfully")
                    }}><i className="fi fi-rr-copy"></i>
              </div>
            </div>
          </div>
          <textarea className='w-full h-[500px] p-3 border inset-shadow-2xs focus:outline-none' 
            value={value}
            placeholder='Enter content here .....'
            onChange={(e)=>setValue(e.target.value)}
            rows={25}
            cols={40}
          />
      </div>      
    </div>
  )
}

export default Home
