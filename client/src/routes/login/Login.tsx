import React, {useState, useEffect} from 'react';
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
  let [alertClick, setAlertClick] = useState(false);
  function handleAlert(){setAlertClick(false);};

  // 마운트
  // 자동 로그인 기능
  let [autoLoginBtn,setAutoLoginBtn] = useState(false);

  useEffect(() => {
    let local_auto_login = localStorage.getItem('auto_login_local_obj');
    if(local_auto_login !== null){
      let auto_login_obj:{idValue : string,pwValue : string} = JSON.parse(local_auto_login);
      setIdInput(auto_login_obj.idValue);
      setPwInput(auto_login_obj.pwValue);
      setAutoLoginBtn(!autoLoginBtn);
    }
  }, []);

  // 언마운트 (로그인 기능) (상태 변수 업데이트로 언마운트 실행시 최신 변수 적용)
  // 자동 로그인 해제
  useEffect(()=>{
    return()=>{
      if(autoLoginBtn === false){
        localStorage.removeItem("auto_login_local_obj");
      }
      console.log(autoLoginBtn);
    }
  },[autoLoginBtn]);


  // 로그인 기능
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

      if(autoLoginBtn === true){
        localStorage.setItem("auto_login_local_obj",JSON.stringify({idValue : idInput, pwValue : pwInput,}));
      }

      navigate('/member/1');

    })
    .catch((error)=>{
      console.log('Error : ', error.message);
      console.log(error.response.data.message); // 에러 응답 데이터

      // 에러 처리 로직 추가
      setAlertValue(error.response.data.message);
      setAlertClick(true);

    });
  }


  // 빠른 로그인 계정 기능
  function fastLogin(idValue:string, pwValue:string){
    setIdInput(idValue);
    setPwInput(pwValue);
  }

return (
  <div className='login'>
    {alertClick === true ? <Alert text={alertValue} handleAlert={handleAlert} /> : null}
    <Header />
    <main className='login-inner'>
      <h2>LOGIN</h2>
        <div className='formBox'>
          <input type='id' value={idInput} onChange={(e)=>{setIdInput(e.target.value)}} placeholder='아이디' name='id'/>
          <input type='password' value={pwInput} onChange={(e)=>{setPwInput(e.target.value)}} placeholder='비밀번호' name='pw'/>
          <button onClick={(e)=>{handleSubmit(e)}}>로그인</button>
        </div>
        <div className='auto-login'>
          <input type='checkbox' onChange={()=>{setAutoLoginBtn(!autoLoginBtn)}} checked={autoLoginBtn} />
          <span>자동 로그인</span>
          <Link to={"/register"}>회원가입</Link>
        </div>
        <div className='sample-id'>
          <h3>샘플 계정 리스트 <CiPlay1 /></h3>
          <div className='sample-list'>
            <ul>
              <li onClick={()=>{fastLogin("kim","5327")}}>kim 계정</li>
              <li onClick={()=>{fastLogin("park","5327")}}>park 계정</li>
              <li onClick={()=>{fastLogin("test","5327")}}>test 계정</li>
            </ul>
          </div>
        </div>
    </main>
  </div>
)
}

export default Login;