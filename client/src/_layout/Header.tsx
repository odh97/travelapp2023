import React from 'react'
import '../styles/layout/Header.scss'

// icon
import { CiUser } from "react-icons/ci";

// router
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';

// type 지정
type DBHistoryType = {
  id: null | number;
  name: null | string;
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


function Header(): JSX.Element{

// redux setting
let dispatch = useDispatch();
const storeData = useSelector((state:storeStateType) => state);
console.log(storeData.userChatArr[0]);



return (
  <header>
    {storeData.userChatArr.length === 0 ? null :
    <div className='header-inner'>
      <div className='brand-Name'><h1><Link to={"/member/1"}>travel</Link></h1></div>
      <nav>
        <div className='nav-inner'>
          {
          storeData.userChatArr[0].id === null
          ? <Link to={"/guest"}>채팅<span></span></Link>
          : <Link to={"/member/"+storeData.userChatArr[0].id}>채팅<span></span></Link>
          }
          <Link to={"/community"}>커뮤니티<span></span></Link>
          <Link to={"/updateHistory"}>업데이트 내역<span></span></Link>
          <Link to={"/developer"}>개발자<span></span></Link>
          <Link to={"/"}>item<span></span></Link>
          <Link to={"/"}>item<span></span></Link>
        </div>
      </nav>
      <div className='user'>
        <div className='user-icon'><CiUser/></div>
        {
        storeData.userChatArr[0].id === null
        ? <Link className='user-name' to={"/login"}>로그인</Link>
        : <span className='user-name'>{storeData.userChatArr[0].name}</span>
        }
      </div>
    </div>
    }
  </header>
)
}

export default Header;