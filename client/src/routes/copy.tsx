import React, {useEffect, useState} from 'react';
import '../styles/components/login/Login.scss'

// components import
import Header from '../_layout/Header';

// store
import { setState, changeTitle } from "../store/store"
// redux
import { useDispatch, useSelector } from "react-redux"
// axios
import axios from 'axios';
// router
import { redirect, useNavigate } from 'react-router-dom';


// type 지정
type DBHistoryType = {
  id: null | number;
  name : null | string;
  title: string;
  chatting_arr: {
    ko_chat_arr: string[];
    en_chat_arr: string[];
  };
  date: Date;
};

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];
}


function TestCP(): JSX.Element{
  // navigate
  const navigate = useNavigate();

// redux setting
let dispatch = useDispatch();
let storeState = useSelector((state:storeStateType) => state );


// 마운트
// 대화 내용 데이터 조회
useEffect(() => {
  // ajax 요청
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/mypage', { withCredentials: true })
  .then((result)=>{
    // 로그인 정보가 없을 경우 로그인 페이지로 이동
    if(result.data.authentication){
      navigate('/login');
    }
  })
  .catch((error)=>{console.log(error)});
}, []);

return(
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




export default TestCP;