import React, {useEffect, useState} from 'react';
import '../styles/layout/NotFound.scss'

// components import
import Header from './Header';
import { Link } from 'react-router-dom';
// icon
import { TbBleach } from "react-icons/tb";

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



return(
  <div className='notFound'>
  <Header />
  <main className='notFound-inner'>
    <h2>404</h2>
    <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
    <Link to={'/guest'}>메인으로 <TbBleach /></Link>
  </main>
</div>
)
}




export default NotFound;