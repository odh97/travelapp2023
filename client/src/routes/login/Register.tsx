import React from 'react';
import '../../styles/components/login/Register.scss'

// components import
import Header from '../../_layout/Header';

function Register(): JSX.Element{
  return (
    <div className='register'>
      <Header />
      <main className='register-inner'>
        <h2>LOGIN</h2>
          <form>
            <input placeholder='아이디'></input>
            <input placeholder='비밀번호'></input>
            <button>로그인</button>
          </form>

      </main>
    </div>
  )
}

export default Register;