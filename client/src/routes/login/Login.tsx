import React, {useState } from 'react';
import '../../styles/components/login/Login.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';

// icon
import { CiPlay1 } from "react-icons/ci";

// router
import { Link, useNavigate } from 'react-router-dom';

// axios
import axios from 'axios';

function Login(): JSX.Element{
  // navigate
  const navigate = useNavigate();

  // alert 컴포넌트
  let [alertValue, setAlertValue] = useState("");
  let [AlertClick, setAlertClick] = useState(false);
  function handleAlert(){setAlertClick(false);}

  // 로그인 기능 input value
  let [idInput, setIdInput] = useState("");
  let [pwInput, setPwInput] = useState("");

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
    // Prevent the browser from reloading the page
    e.preventDefault();
  
    let formData = {
      id : idInput,
      pw : pwInput,
    }  
    axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/login', formData,{ withCredentials: true })
    .then((result)=>{
      console.log("성공");
      console.log(result);
  
      navigate('/1');

    })
    .catch((error)=>{
      console.log('Error : ', error.message);
      console.log(error.response.data.message); // 에러 응답 데이터

      // 에러 처리 로직 추가
      setAlertValue(error.response.data.message);
      setAlertClick(true);

    });
  }



return (
  <div className='login'>
    {AlertClick === true ? <Alert text={alertValue} handleAlert={handleAlert} /> : null}
    <Header />
    <main className='login-inner'>
      <h2>LOGIN</h2>
        <div className='formBox'>
          <input type='id' value={idInput} onChange={(e)=>{setIdInput(e.target.value)}} placeholder='아이디' name='id'/>
          <input type='password' value={pwInput} onChange={(e)=>{setPwInput(e.target.value)}} placeholder='비밀번호' name='pw'/>
          <button onClick={(e)=>{handleSubmit(e)}}>로그인</button>
        </div>
        <div className='auto-login'>
          <input type='checkbox' />
          <span>자동 로그인</span>
          <Link to={"/register"}>회원가입</Link>
        </div>
        <div className='sample-id'>
          <h3>샘플 계정 리스트 <CiPlay1 /></h3>
          <div className='sample-list'>
            <ul>
              <li>kim 계정</li>
              <li>park 계정</li>
              <li>test 계정</li>
            </ul>
          </div>
        </div>
    </main>
  </div>
)
}

export default Login;