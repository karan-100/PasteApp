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
  return (
    <div className='pasteBody'>
      <div className='searchDiv'>
        <input 
          className='search'
          type='search'
          placeholder='Search Here'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </div>
      <div className='allPaste'>
        {
          filterData.length>0 && filterData.map(
            (paste)=>{
              return(
                <div className='card' key={paste?._id}>
                  <div className='leftCard'>
                    <div className='cardTitle'>
                      {paste.title}
                    </div>
                    <div className='cardContent'>
                      <p className='cardPara'>{paste.content}</p>
                    </div>
                  </div>
                  <div className='rightCard'>
                    <div className='btnDiv'>
                    <button className='cardbtn' >
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button className='cardbtn'>
                      <a href={`/pastes/${paste?._id}`}>
                        View
                      </a>
                    </button>
                    <button className='cardbtn' onClick={()=>handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button className='cardbtn'
                    onClick={() => {navigator.clipboard.writeText(paste?.content) 
                      toast.success("Copied Successfully")
                    }}>
                      Copy
                    </button >
                    </div>
                    <div className='createTimrDiv'>
                      <p className='createTime'>{paste.createdAt}</p>
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
