import React, {useEffect, useState} from 'react';
import '../styles/components/login/Login.scss'

// components import
import Header from '../_layout/Header';

// redux
import { useDispatch, useSelector } from "react-redux"
import { setState, changeTitle } from "../store/store"
import axios from 'axios';




// type 지정
type DBHistoryType = {
  id: null | string;
  name : null | string;
  title: string;
  chatting_arr: {
      ko_chat_arr: string[];
      en_chat_arr: string[];
  };
  Date: Date;
};

// Redux 상태의 루트 타입 정의
interface storeStateType {
  userChatArr: DBHistoryType[];
}



function TestCP(): JSX.Element{


  // redux setting
  let dispatch = useDispatch();
  let storeState = useSelector((state:storeStateType) => state );
  let dataSetting = false;


  // 마운트
  // 대화 내용 데이터 조회
  useEffect(() => {
    let getLocalStorage = localStorage.getItem('chatRoom_local_obj');

    // 로컬 데이터 조회
    if(getLocalStorage !== null){
      let chatRoom_local_obj = JSON.parse(getLocalStorage);
      
      if(dataSetting === false){
        dispatch(setState(chatRoom_local_obj));
        dataSetting = true;
      }
    } else{
      // ajax 요청
      axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/guest')
      .then((result)=>{
        let copy:DBHistoryType = result.data.basic_chat_data;

        if(dataSetting === false){
          dispatch(setState(copy));
          dataSetting = true;
        }
      })
      .catch((error)=>{console.log(error)});
    }
  }, []);

console.log(storeState);

  return (
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