import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Modal from './Modal';
import { post } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';

export default function SideBar() {
 
  return (
   <>
  
   <div className=' mt-4 mx-4 position-fixed '>
     <h1 className='fs-2 fw-bold'>NoteHub</h1>
     <div className='rounded-circle mt-5 mx-2 d-flex  d-flex justify-content-center align-items-center'
     data-bs-toggle="modal" data-bs-target="#exampleModal"
      style={{backgroundColor:"black",width:"50px",height:"50px",cursor:'pointer'}}>
        <FaPlus  size={30} className='rounded-circle fs-5 text-white'  />
     </div>
   </div>
   </>
  )
}