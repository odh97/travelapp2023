import React from 'react'
import '../styles/layout/Alert.scss'


type AlertPropsType = {
  text : String,
  handleAlert : Function
};

function Alert(props: AlertPropsType): JSX.Element{
  console.log(props.text);
  return (
    <div className='alert-box'>
      <div className='alert-box-inner'>
        <p>{props.text}</p>
        <button onClick={()=>{props.handleAlert()}} className='close-btn'>닫기</button>
      </div>
    </div>
  )
}

export default Alert