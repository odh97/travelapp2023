import React from 'react';
import '../../styles/components/login/Login.scss'

// components import
import Header from '../../_layout/Header';
import { Link } from 'react-router-dom';

function Login(): JSX.Element{
  return (
    <div className='login'>
      <Header />
      <main className='login-inner'>
        <h2>LOGIN</h2>
          <form>
            <input type='id' placeholder='아이디' />
            <input type='password' placeholder='비밀번호' />
            <button>로그인</button>
          </form>
          <div className='auto-login'>
            <input type='checkbox' />
            <span>자동 로그인</span>
            <Link to={"register"}>회원가입</Link>
          </div>
      </main>
    </div>
  )
}

export default Login;