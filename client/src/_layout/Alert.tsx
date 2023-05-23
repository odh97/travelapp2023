import React, { useState } from 'react'
import '../styles/layout/Alert.scss'
import { useNavigate } from 'react-router-dom';


type AlertPropsType = {
  text : String,
  handleAlert : Function,
  check? : String,
};

function Alert(props: AlertPropsType): JSX.Element{
  // navigate
  const navigate = useNavigate();

  // 확인 기능
  let [check, setCheck] = useState(props.check);
  function successButton(){
    if(check === "register_success"){navigate("/login")}
  }

  return (
    <div className='alert-box'>
      <div className='alert-box-inner'>
        <p>{props.text}</p>
        {check ? <button onClick={()=>{successButton()}} className='close-btn'>확인</button> : null}
        {!check ? <button onClick={()=>{props.handleAlert()}} className='close-btn'>닫기</button> : null}
      </div>
    </div>
  )
}

export default Alert