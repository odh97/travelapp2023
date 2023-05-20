import React from 'react';
import '../../styles/components/login/Login.scss'

// components import
import Header from '../../_layout/Header';
import { Link } from 'react-router-dom';

// axios
import axios from 'axios';


function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  // Or you can work with it as a plain object:
  
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson);

  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/login', formData)
  .then((result)=>{
    console.log(result);

  })
  .catch((error)=>{
    console.log(error);
  });
}

function Login(): JSX.Element{
  return (
    <div className='login'>
      <Header />
      <main className='login-inner'>
        <h2>LOGIN</h2>
          <form onSubmit={handleSubmit} method="post">
            <input type='text' placeholder='아이디' name='id'/>
            <input type='text' placeholder='비밀번호' name='pw'/>
            <button type='submit'>로그인</button>
          </form>
          <div className='auto-login'>
            <input type='checkbox' />
            <span>자동 로그인</span>
            <Link to={"/register"}>회원가입</Link>
          </div>
      </main>
    </div>
  )
}

export default Login;