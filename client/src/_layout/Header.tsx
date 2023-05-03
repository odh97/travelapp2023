import React from 'react'
import '../styles/layout/Header.scss'

// icon
import { CiUser } from "react-icons/ci";


function Header(): JSX.Element{
  return (
    <header>
      <div className='header-inner'>
        <div className='brand-Name'><h1><a href="javascript:void(0)">travel</a></h1></div>
        <nav>
          <div className='nav-inner'>
            <a href="javascript:void(0)">게시판<span></span></a>
            <a href="javascript:void(0)">item<span></span></a>
            <a href="javascript:void(0)">item<span></span></a>
            <a href="javascript:void(0)">item<span></span></a>
          </div>
        </nav>
        <div className='user'>
          <div className='user-icon'><CiUser/></div>
          <span className='user-name'>user</span>
        </div>
      </div>
    </header>
  )
}

export default Header