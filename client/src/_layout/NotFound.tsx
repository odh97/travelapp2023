import React, {useEffect, useState} from 'react';
import '../styles/layout/NotFound.scss'

// components import
import Header from './Header';
import { Link } from 'react-router-dom';
// icon
import { TbBleach } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

// axios
import axios from 'axios';
// store
import { setState } from "./../store/store"

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


function NotFound(): JSX.Element{

// redux setting
let dispatch = useDispatch();
let storeState = useSelector((state:storeStateType) => state );
let storeDataSetting = false;
let [memberID, setMemberID] = useState<null | number>(null);



// 마운트
// 대화 내용 데이터 조회
useEffect(() => {
  // ajax 요청
  axios.get(process.env.REACT_APP_LOCAL_SERVER_URL+'/member',{ withCredentials: true })
  .then((result)=>{
    let copy:DBHistoryType[] = result.data.chat_Data_Arr;
    
    if(storeDataSetting === false){
      dispatch(setState(copy));
      storeDataSetting = true;
    }
  })
  .catch((error)=>{console.log(error)});


}, []);

// storeState 업데이트
useEffect(() => {
  if(storeState.userChatArr[0]){
    setMemberID(storeState.userChatArr[0].id);
  }
}, [storeState]);

return(
  <div className='notFound'>
  <Header />
  <main className='notFound-inner'>
    <h2>404</h2>
    <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
    {
      storeState.userChatArr[0]
      ? <Link to={'/member/'+memberID}>메인으로 <TbBleach /></Link>
      : <Link to={'/guest'}>메인으로 <TbBleach /></Link>
    }
  </main>
</div>
)
}




export default NotFound;