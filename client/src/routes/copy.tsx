import React from 'react';
import '../styles/components/login/Login.scss'

// components import
import Header from '../_layout/Header';

function Login(): JSX.Element{
  return (
    <div className='login'>
      <Header />
      <main className='login-inner'>
        <h2>LOGIN</h2>
          <form>
            <input placeholder='아이디'></input>
            <input placeholder='비밀번호'></input>
            <button>로그인</button>
          </form>
          <input type='checkbox'></input>
          <span>자동 로그인</span>
      </main>
    </div>
  )
}

export default Login;