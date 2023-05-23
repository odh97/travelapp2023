import React,{useState} from 'react';
import '../../styles/components/login/Register.scss'

// components import
import Header from '../../_layout/Header';
import Alert from '../../_layout/Alert';

// router
import { useNavigate } from 'react-router-dom';


// axios
import axios from 'axios';



function Register(): JSX.Element{
  // navigate
  const navigate = useNavigate();

  // alert 컴포넌트
  let [alertValue, setAlertValue] = useState("");
  let [alertClick, setAlertClick] = useState(false);
  let [alertCheck, setalertCheck] = useState<undefined | string>(undefined);
  function handleAlert(){setAlertClick(false);}



  // 로그인 기능
  let [idInput, setIdInput] = useState("");
  let [pwInput, setPwInput] = useState("");

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    if(!idInput === true || !pwInput === true){
      setAlertValue("아이디 및 비밀번호를 기입해 주세요");
      setAlertClick(true);
    }

    let formData = {
      id : idInput,
      pw : pwInput,
    }  
    axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/register', formData)
    .then((result)=>{
      console.log("성공");

      setAlertValue("가입이 완료됐습니다!! 로그인 해주세요!!");
      setalertCheck(result.data.join_result);
      setAlertClick(true);

    })
    .catch((error)=>{
      console.log('Error: ', error.message);
      console.log(error.response.status); // 에러 응답 데이터
      console.log(error.response.data.message); // 에러 응답 데이터

      // 에러 처리 로직 추가
      if(error.response.status === 401){
        setAlertValue(error.response.data.message);
        setAlertClick(true);
        return false;
      }
      setAlertValue("회원가입에 실패했습니다. 다시 가입해 주세요");
      setAlertClick(true);
    });
  }

  return (
    <div className='register'>
      {alertClick === true ? <Alert text={alertValue} handleAlert={handleAlert} check={alertCheck}/> : null}
      <Header />
      <main className='register-inner'>
        <h2>회원가입</h2>
          <div className='formBox'>
            <input type='id' value={idInput} onChange={(e)=>{setIdInput(e.target.value)}} placeholder='아이디' name='id'/>
            <input type='password' value={pwInput} onChange={(e)=>{setPwInput(e.target.value)}} placeholder='비밀번호' name='pw'/>
            <button onClick={(e)=>{handleSubmit(e)}}>가입하기</button>
          </div>
      </main>
    </div>
  )
}

export default Register;