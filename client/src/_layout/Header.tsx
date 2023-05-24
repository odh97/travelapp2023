import React from 'react'
import '../styles/layout/Header.scss'

// router
import { Link } from 'react-router-dom';
// icon
import { CiUser } from "react-icons/ci";


function Header(): JSX.Element{
  return (
    <header>
      <div className='header-inner'>
        <div className='brand-Name'><h1><Link to={"/member/1"}>travel<span></span></Link></h1></div>
        <nav>
          <div className='nav-inner'>
            <Link to={"/member/1"}>채팅<span></span></Link>
            <Link to={"/community"}>커뮤니티<span></span></Link>
            <Link to={"/updateHistory"}>업데이트 내역<span></span></Link>
            <Link to={"/developer"}>개발자<span></span></Link>
            <Link to={"/"}>item<span></span></Link>
            <Link to={"/"}>item<span></span></Link>
          </div>
        </nav>
        <div className='user'>
          <div className='user-icon'><CiUser/></div>
          {false ? <span className='user-name'>user</span> : <Link className='user-name' to={"/login"}>로그인</Link>}
        </div>
      </div>
    </header>
  )
}

export default Header