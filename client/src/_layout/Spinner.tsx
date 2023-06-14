import React, { useState } from 'react'
import '../styles/layout/Spinner.scss'
import { useNavigate } from 'react-router-dom';



function Spinner(): JSX.Element{
  // navigate
  const navigate = useNavigate();

return (
<div className='spinner-box'>
  <main className='spinner-box-inner'>
    <svg className="spinner" width="66px" height="66px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="circle" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
    <div className='spinner-text'>잠시만 기다려 주세요.</div>
  </main>
</div>
)
}

export default Spinner