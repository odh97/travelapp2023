import React from 'react'
import '../styles/layout/Header.scss'

function Header(): JSX.Element{
  return (
    <header>
      <div className='header-inner'>
        <div className='brand-Name'>Logo</div>
        <div>nav</div>
        <div>user</div>
      </div>
    </header>
  )
}

export default Header