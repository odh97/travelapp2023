import React from 'react';
import '../../styles/components/login/Register.scss'

// components import
import Header from '../../_layout/Header';

function Register(): JSX.Element{
  return (
    <div className='register'>
      <Header />
      <main className='register-inner'>
        <h2>회원가입</h2>
          <form action="/register" method="POST">
            <input placeholder='아이디'></input>
            <input placeholder='비밀번호'></input>
            <button>회원가입</button>
          </form>
      </main>
    </div>
  )
}

export default Register;