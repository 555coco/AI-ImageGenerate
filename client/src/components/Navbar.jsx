import React, { useState } from 'react'
import { SiOpenai } from "react-icons/si";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <div className='fixed w-full h-16 backdrop-blur-md bg-gradient-to-b from-[#A557FF] to-[#6B21A8] bg-opacity-70 z-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center mt-1 ml-3'>
          <SiOpenai className='text-5xl'/>
          <h1 className='text-white/80 text-3xl ml-2 font-bold'>OpenAI.<span className='text-[#6c5ce7]'>HWY</span></h1>
        </div>
        <div>
          <button className='btn mr-4 w-25' onClick={() => {{location.pathname === '/' ? navigate('/create') : navigate('/')}}}>{location.pathname === '/' ? "Create" : "Post" }</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar