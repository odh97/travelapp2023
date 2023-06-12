import React, { useState } from 'react'
import '../styles/layout/Header.scss'

// icon
import { CiUser } from "react-icons/ci";

// router
import { Link, Navigate, useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
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
// css-handle
let [hoverHidden, serHoverHidden] = useState(true);

// navigate
const navigate = useNavigate();

// redux setting
const storeData = useSelector((state:storeStateType) => state);

function logoutHandle(){
  axios.post(process.env.REACT_APP_LOCAL_SERVER_URL+'/logout', { withCredentials: true })
  .then((result)=>{
    if(result.data.message === 'success'){
      navigate('/guest');
    }
  })
  .catch((error)=>{
    console.log(error);
  });
}

return (
  <header>
    {storeData.userChatArr.length === 0 ? <DefaultHeader /> :
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
        </div>
      </nav>
      <div className='user'>
        {
        storeData.userChatArr[0].id === null
        ?
        <>
          <div className='user-icon'><CiUser/></div>
          <Link className='user-name' to={"/login"}>로그인</Link>
        </>        
        :
        <>
          <div className='user-icon'><CiUser/></div>
          <div className={hoverHidden ? 'user-name hidden' : 'user-name'}
                onMouseEnter={()=>{serHoverHidden(!hoverHidden)}}
                onMouseLeave={()=>{serHoverHidden(!hoverHidden)}}>
            <span>{storeData.userChatArr[0].name}</span>
            <div className='member-list'>
              <ul>
                <li><Link className='member-mypage' to={"/mypage"}>마이 페이지</Link></li>
                <li><button className='member-logout' onClick={logoutHandle}>로그아웃</button></li>
              </ul>
            </div>
          </div>
        </>
        }
      </div>
    </div>
    }
  </header>
)
}

function DefaultHeader(){
return(
  <header>
  <div className='header-inner'>
    <div className='brand-Name'><h1><Link to={"/member/1"}>travel</Link></h1></div>
    <nav>
      <div className='nav-inner'>
        <Link to={"/guest"}>채팅<span></span></Link>
        <Link to={"/community"}>커뮤니티<span></span></Link>
        <Link to={"/updateHistory"}>업데이트 내역<span></span></Link>
        <Link to={"/developer"}>개발자<span></span></Link>
        <Link to={"/"}>item<span></span></Link>
        <Link to={"/"}>item<span></span></Link>
      </div>
    </nav>
    <div className='user'>
      <div className='user-icon'><CiUser/></div>
      <Link className='user-name' to={"/login"}>로그인</Link>
    </div>
  </div>
</header>
)
}

export default Header;