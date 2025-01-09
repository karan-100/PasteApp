import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Home.css'
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
  },[pasteId])
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
        setSearchParams('');
      }  
    }

    

  }
  return (
    <div className='pasteCreate'>
      <div className="titleDiv">
        <input 
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)} 
        />
        <button onClick={createPaste} className='homeButton'>
          {
            pasteId? "Update Paste":"Create My Paste"
          }
        </button>
      </div>
      <div className="contentDiv">
          <textarea className='textArea' 
            value={value}
            placeholder='Enter content here .....'
            onChange={(e)=>setValue(e.target.value)}
            rows={25}
            cols={50}
          />
      </div>      
    </div>
  )
}

export default Home
